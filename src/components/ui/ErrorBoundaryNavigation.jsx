import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const ErrorBoundaryNavigation = ({ 
  errorType = 'general',
  onRetry,
  onGoBack,
  onStartOver,
  showProgress = false,
  currentStep = 1
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getErrorConfig = () => {
    switch (errorType) {
      case 'generation':
        return {
          title: 'Generation Failed',
          message: 'We encountered an issue generating your content. Please try again.',
          actions: [
            { 
              label: 'Try Again', 
              onClick: onRetry || (() => window.location.reload()), 
              variant: 'primary',
              icon: 'RefreshCw'
            },
            { 
              label: 'Go Back', 
              onClick: onGoBack || (() => navigate('/questionnaire-flow')), 
              variant: 'secondary',
              icon: 'ArrowLeft'
            }
          ]
        };
      
      case 'network':
        return {
          title: 'Connection Error',
          message: 'Please check your internet connection and try again.',
          actions: [
            { 
              label: 'Retry', 
              onClick: onRetry || (() => window.location.reload()), 
              variant: 'primary',
              icon: 'Wifi'
            },
            { 
              label: 'Start Over', 
              onClick: onStartOver || (() => navigate('/landing-page')), 
              variant: 'secondary',
              icon: 'Home'
            }
          ]
        };
      
      case 'validation':
        return {
          title: 'Invalid Input',
          message: 'Please check your information and try again.',
          actions: [
            { 
              label: 'Fix Issues', 
              onClick: onGoBack || (() => navigate(-1)), 
              variant: 'primary',
              icon: 'Edit'
            }
          ]
        };
      
      default:
        return {
          title: 'Something Went Wrong',
          message: 'An unexpected error occurred. Please try again.',
          actions: [
            { 
              label: 'Try Again', 
              onClick: onRetry || (() => window.location.reload()), 
              variant: 'primary',
              icon: 'RefreshCw'
            },
            { 
              label: 'Start Over', 
              onClick: onStartOver || (() => navigate('/landing-page')), 
              variant: 'secondary',
              icon: 'Home'
            }
          ]
        };
    }
  };

  const config = getErrorConfig();

  const renderButton = (action) => {
    const baseClasses = "flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-150 micro-scale";
    
    const variantClasses = {
      primary: "bg-primary text-white hover:bg-primary-700 focus:ring-2 focus:ring-primary focus:ring-offset-2 elevation-1 hover:elevation-2",
      secondary: "bg-surface text-text-primary border border-border hover:bg-secondary-100 focus:ring-2 focus:ring-primary focus:ring-offset-2"
    };

    return (
      <button
        onClick={action.onClick}
        className={`${baseClasses} ${variantClasses[action.variant]}`}
        aria-label={action.label}
      >
        {action.icon && (
          <Icon 
            name={action.icon} 
            size={20} 
            className="mr-2" 
          />
        )}
        {action.label}
      </button>
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 md:h-15">
            {/* Logo */}
            <div className="flex items-center">
              <button
                onClick={() => navigate('/landing-page')}
                className="flex items-center space-x-2 micro-scale"
                aria-label="Go to home"
              >
                <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                  <Icon name="Zap" size={20} color="white" />
                </div>
                <div className="hidden sm:block">
                  <span className="text-lg font-semibold text-text-primary">
                    CarouselAI
                  </span>
                </div>
              </button>
            </div>

            {/* Error Status */}
            <div className="flex items-center space-x-2 text-error">
              <Icon name="AlertTriangle" size={20} />
              <span className="hidden sm:inline text-sm font-medium">Error</span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Indicator (if applicable) */}
      {showProgress && (
        <div className="bg-surface border-b border-border py-4">
          <div className="max-w-2xl mx-auto px-4">
            <div className="flex items-center justify-center space-x-2 mb-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`w-3 h-3 rounded-full ${
                    step <= currentStep ? 'bg-error' : 'bg-secondary-200'
                  }`}
                />
              ))}
            </div>
            <p className="text-center text-sm text-secondary-600">
              Error at Step {currentStep} of 4
            </p>
          </div>
        </div>
      )}

      {/* Error Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full text-center">
          {/* Error Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-error-100 mb-6">
            <Icon name="AlertTriangle" size={32} color="#EF4444" />
          </div>

          {/* Error Message */}
          <h1 className="text-2xl font-semibold text-text-primary mb-4">
            {config.title}
          </h1>
          <p className="text-secondary-600 mb-8">
            {config.message}
          </p>

          {/* Actions */}
          <div className="space-y-4">
            {/* Mobile Actions */}
            <div className="md:hidden space-y-3">
              {config.actions.map((action, index) => (
                <div key={index} className="w-full">
                  {renderButton(action)}
                </div>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex justify-center space-x-4">
              {config.actions.map((action, index) => (
                <div key={index}>
                  {renderButton(action)}
                </div>
              ))}
            </div>
          </div>

          {/* Additional Help */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-secondary-600">
              Need help? Contact our{' '}
              <button 
                className="text-primary hover:text-primary-700 font-medium"
                onClick={() => window.open('mailto:support@carouselai.com')}
              >
                support team
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ErrorBoundaryNavigation;