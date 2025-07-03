import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const HealthCheckStatus = ({ status, onRefresh }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getStatusConfig = () => {
    switch (status) {
      case 'healthy':
        return {
          icon: 'CheckCircle',
          color: 'text-success',
          bg: 'bg-success-100',
          label: 'All Systems Operational',
          description: 'All services are running normally'
        };
      case 'degraded':
        return {
          icon: 'AlertTriangle',
          color: 'text-warning',
          bg: 'bg-warning-100',
          label: 'Degraded Performance',
          description: 'Some services may be slower than usual'
        };
      case 'unhealthy':
        return {
          icon: 'XCircle',
          color: 'text-error',
          bg: 'bg-error-100',
          label: 'Service Disruption',
          description: 'Multiple services are experiencing issues'
        };
      case 'checking':
      default:
        return {
          icon: 'Loader',
          color: 'text-secondary-600',
          bg: 'bg-secondary-100',
          label: 'Checking Status...',
          description: 'Verifying system health'
        };
    }
  };

  const statusConfig = getStatusConfig();

  // Mock service statuses
  const services = [
    { name: 'API Gateway', status: status === 'healthy' ? 'operational' : status === 'degraded' ? 'degraded' : 'down' },
    { name: 'Content Generation', status: status === 'healthy' ? 'operational' : 'degraded' },
    { name: 'Image Processing', status: status === 'unhealthy' ? 'down' : 'operational' },
    { name: 'Download Service', status: status === 'healthy' ? 'operational' : status === 'degraded' ? 'degraded' : 'down' },
    { name: 'Database', status: 'operational' }
  ];

  const getServiceStatusColor = (serviceStatus) => {
    switch (serviceStatus) {
      case 'operational':
        return 'text-success';
      case 'degraded':
        return 'text-warning';
      case 'down':
        return 'text-error';
      default:
        return 'text-secondary-600';
    }
  };

  const getServiceStatusIcon = (serviceStatus) => {
    switch (serviceStatus) {
      case 'operational':
        return 'CheckCircle';
      case 'degraded':
        return 'AlertTriangle';
      case 'down':
        return 'XCircle';
      default:
        return 'Clock';
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-text-primary">
          System Health
        </h3>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing || status === 'checking'}
          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-secondary-100 micro-scale transition-colors duration-150 disabled:opacity-50"
          aria-label="Refresh health status"
        >
          <Icon 
            name="RefreshCw" 
            size={16} 
            className={`text-secondary-600 ${isRefreshing ? 'animate-spin' : ''}`}
          />
        </button>
      </div>

      {/* Overall Status */}
      <div className="flex items-center mb-6">
        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${statusConfig.bg} mr-3`}>
          <Icon 
            name={statusConfig.icon} 
            size={20} 
            className={`${statusConfig.color} ${status === 'checking' ? 'animate-spin' : ''}`}
          />
        </div>
        <div>
          <h4 className={`font-medium ${statusConfig.color}`}>
            {statusConfig.label}
          </h4>
          <p className="text-sm text-secondary-600">
            {statusConfig.description}
          </p>
        </div>
      </div>

      {/* Service Status List */}
      <div className="space-y-3">
        <h5 className="text-sm font-medium text-text-primary mb-3">
          Service Status
        </h5>
        
        {services.map((service, index) => (
          <div key={index} className="flex items-center justify-between py-2">
            <span className="text-sm text-secondary-600">
              {service.name}
            </span>
            <div className="flex items-center">
              <Icon 
                name={getServiceStatusIcon(service.status)} 
                size={14} 
                className={`mr-2 ${getServiceStatusColor(service.status)}`}
              />
              <span className={`text-xs font-medium capitalize ${getServiceStatusColor(service.status)}`}>
                {service.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Last Updated */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center text-xs text-secondary-600">
          <Icon name="Clock" size={12} className="mr-1" />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default HealthCheckStatus;