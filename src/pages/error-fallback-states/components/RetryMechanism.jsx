import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const RetryMechanism = ({ 
  retryCount, 
  isRetrying, 
  estimatedResolution, 
  onRetry 
}) => {
  const [countdown, setCountdown] = useState(0);
  const [autoRetryEnabled, setAutoRetryEnabled] = useState(false);

  useEffect(() => {
    let interval;
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            if (autoRetryEnabled) {
              onRetry();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [countdown, autoRetryEnabled, onRetry]);

  const handleAutoRetry = () => {
    setAutoRetryEnabled(true);
    setCountdown(30); // 30 second countdown
  };

  const getRetryStrategy = () => {
    if (retryCount === 0) {
      return {
        title: 'First Attempt',
        description: 'Try the operation again immediately',
        waitTime: 0
      };
    } else if (retryCount < 3) {
      return {
        title: 'Exponential Backoff',
        description: `Wait ${Math.pow(2, retryCount)} seconds before retrying`,
        waitTime: Math.pow(2, retryCount)
      };
    } else {
      return {
        title: 'Extended Wait',
        description: 'Multiple failures detected. Consider waiting longer or starting over.',
        waitTime: 60
      };
    }
  };

  const strategy = getRetryStrategy();

  return (
    <div className="bg-surface rounded-lg border border-border p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-text-primary">
          Retry Strategy
        </h3>
        {retryCount > 0 && (
          <div className="flex items-center text-sm text-secondary-600">
            <Icon name="RotateCcw" size={16} className="mr-1" />
            <span>{retryCount} attempt{retryCount !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>

      {/* Current Strategy */}
      <div className="bg-secondary-50 rounded-lg p-4 mb-4">
        <div className="flex items-center mb-2">
          <Icon name="Target" size={16} className="mr-2 text-secondary-600" />
          <span className="font-medium text-text-primary">
            {strategy.title}
          </span>
        </div>
        <p className="text-sm text-secondary-600 ml-6">
          {strategy.description}
        </p>
      </div>

      {/* Retry Progress */}
      {isRetrying && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary">
              Retrying...
            </span>
            <span className="text-sm text-secondary-600">
              {Math.floor(Math.random() * 100)}%
            </span>
          </div>
          <div className="w-full bg-secondary-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300 animate-pulse"
              style={{ width: `${Math.floor(Math.random() * 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Auto Retry Option */}
      {retryCount > 0 && !isRetrying && (
        <div className="border border-border rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-text-primary mb-1">
                Auto Retry
              </h4>
              <p className="text-sm text-secondary-600">
                Automatically retry after {strategy.waitTime} seconds
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {countdown > 0 && (
                <div className="flex items-center text-sm text-secondary-600">
                  <Icon name="Timer" size={16} className="mr-1" />
                  <span>{countdown}s</span>
                </div>
              )}
              <button
                onClick={handleAutoRetry}
                disabled={countdown > 0}
                className="flex items-center px-3 py-2 text-sm font-medium text-primary hover:text-primary-700 hover:bg-primary-50 rounded-lg micro-scale transition-colors duration-150 disabled:opacity-50"
              >
                <Icon name="Play" size={16} className="mr-1" />
                {countdown > 0 ? 'Scheduled' : 'Enable'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resolution Time Estimate */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center text-secondary-600">
          <Icon name="Clock" size={16} className="mr-2" />
          <span>Estimated resolution: {estimatedResolution}</span>
        </div>
        
        {retryCount >= 3 && (
          <div className="flex items-center text-warning">
            <Icon name="AlertTriangle" size={16} className="mr-1" />
            <span className="font-medium">Consider alternative action</span>
          </div>
        )}
      </div>

      {/* Retry Tips */}
      {retryCount > 1 && (
        <div className="mt-4 p-3 bg-primary-50 rounded-lg">
          <div className="flex items-start">
            <Icon name="Lightbulb" size={16} className="mr-2 text-primary mt-0.5" />
            <div>
              <h5 className="text-sm font-medium text-primary mb-1">
                Troubleshooting Tips
              </h5>
              <ul className="text-xs text-primary space-y-1">
                <li>• Check your internet connection</li>
                <li>• Try refreshing the page</li>
                <li>• Clear your browser cache</li>
                <li>• Contact support if the issue persists</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RetryMechanism;