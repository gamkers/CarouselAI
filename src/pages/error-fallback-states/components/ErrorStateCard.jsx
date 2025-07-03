import React from 'react';
import Icon from '../../../components/AppIcon';

const ErrorStateCard = ({ errorState, scenario }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      default:
        return 'text-secondary-600';
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-error-100';
      case 'medium':
        return 'bg-warning-100';
      default:
        return 'bg-secondary-100';
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-text-primary">
          Error Details
        </h3>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityBg(scenario.severity)} ${getSeverityColor(scenario.severity)}`}>
          {scenario.severity.toUpperCase()}
        </div>
      </div>

      <div className="space-y-4">
        {/* Error Code */}
        <div className="flex items-center justify-between py-2 border-b border-border">
          <span className="text-sm text-secondary-600">Error Code</span>
          <span className="text-sm font-mono text-text-primary bg-secondary-100 px-2 py-1 rounded">
            {errorState.code}
          </span>
        </div>

        {/* Error Type */}
        <div className="flex items-center justify-between py-2 border-b border-border">
          <span className="text-sm text-secondary-600">Type</span>
          <span className="text-sm text-text-primary capitalize">
            {errorState.type.replace('_', ' ')}
          </span>
        </div>

        {/* Timestamp */}
        <div className="flex items-center justify-between py-2 border-b border-border">
          <span className="text-sm text-secondary-600">Occurred At</span>
          <span className="text-sm text-text-primary">
            {errorState.timestamp.toLocaleString()}
          </span>
        </div>

        {/* Retry Count */}
        {errorState.retryCount > 0 && (
          <div className="flex items-center justify-between py-2 border-b border-border">
            <span className="text-sm text-secondary-600">Retry Attempts</span>
            <span className="text-sm text-text-primary">
              {errorState.retryCount}
            </span>
          </div>
        )}

        {/* Estimated Resolution */}
        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-secondary-600">Est. Resolution</span>
          <div className="flex items-center">
            <Icon name="Clock" size={14} className="mr-1 text-secondary-400" />
            <span className="text-sm text-text-primary">
              {scenario.estimatedResolution}
            </span>
          </div>
        </div>
      </div>

      {/* Technical Details (Expandable) */}
      <details className="mt-4">
        <summary className="cursor-pointer text-sm font-medium text-text-primary">Technical Details</summary>
        <pre className="mt-2 p-3 bg-secondary-50 rounded text-xs overflow-auto">
          {JSON.stringify(errorState.details, null, 2)}
        </pre>
      </details>
    </div>
  );
};

export default ErrorStateCard;