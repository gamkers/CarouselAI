import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import WorkflowHeader from '../../components/ui/WorkflowHeader';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import ContextualActionBar from '../../components/ui/ContextualActionBar';
import ErrorStateCard from './components/ErrorStateCard';
import HealthCheckStatus from './components/HealthCheckStatus';
import RetryMechanism from './components/RetryMechanism';

const ErrorFallbackStates = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get error details from navigation state or URL params
  const [errorState, setErrorState] = useState({
    type: 'general',
    code: 'UNKNOWN_ERROR',
    message: 'An unexpected error occurred',
    context: null,
    timestamp: new Date(),
    retryCount: 0
  });

  const [isRetrying, setIsRetrying] = useState(false);
  const [healthStatus, setHealthStatus] = useState('checking');

  // Mock error scenarios for demonstration
  const errorScenarios = [
    {
      type: 'api_connectivity',
      code: 'CONNECTION_FAILED',
      title: 'Connection Error',
      message: 'Unable to connect to our servers. Please check your internet connection.',
      icon: 'WifiOff',
      severity: 'high',
      estimatedResolution: '2-3 minutes',
      actions: ['retry', 'check_status', 'start_over']
    },
    {
      type: 'content_generation',
      code: 'GENERATION_FAILED',
      title: 'Content Generation Failed',
      message: 'We encountered an issue while generating your carousel content.',
      icon: 'AlertTriangle',
      severity: 'medium',
      estimatedResolution: '1-2 minutes',
      actions: ['retry', 'go_back', 'start_over']
    },
    {
      type: 'download_error',
      code: 'DOWNLOAD_FAILED',
      title: 'Download Failed',
      message: 'Your carousel package could not be downloaded. Please try again.',
      icon: 'Download',
      severity: 'medium',
      estimatedResolution: 'Immediate',
      actions: ['retry', 'regenerate', 'contact_support']
    },
    {
      type: 'validation_error',
      code: 'INVALID_INPUT',
      title: 'Invalid Information',
      message: 'Some of the information provided is invalid or incomplete.',
      icon: 'AlertCircle',
      severity: 'low',
      estimatedResolution: 'Immediate',
      actions: ['go_back', 'fix_issues']
    },
    {
      type: 'rate_limit',
      code: 'TOO_MANY_REQUESTS',
      title: 'Too Many Requests',
      message: 'You have exceeded the request limit. Please wait before trying again.',
      icon: 'Clock',
      severity: 'medium',
      estimatedResolution: '5-10 minutes',
      actions: ['wait', 'start_over']
    }
  ];

  useEffect(() => {
    // Initialize error state from navigation or URL params
    const urlParams = new URLSearchParams(location.search);
    const errorType = urlParams.get('type') || location.state?.errorType || 'general';
    const errorCode = urlParams.get('code') || location.state?.errorCode || 'UNKNOWN_ERROR';
    const context = location.state?.context || null;

    const scenario = errorScenarios.find(s => s.type === errorType) || errorScenarios[0];
    
    setErrorState({
      type: errorType,
      code: errorCode,
      message: scenario.message,
      context: context,
      timestamp: new Date(),
      retryCount: 0
    });

    // Perform health check
    performHealthCheck();
  }, [location]);

  const performHealthCheck = async () => {
    setHealthStatus('checking');
    
    // Simulate health check API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Mock random health status
      const statuses = ['healthy', 'degraded', 'unhealthy'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      setHealthStatus(randomStatus);
    } catch (error) {
      setHealthStatus('unhealthy');
    }
  };

  const handleRetry = async () => {
    setIsRetrying(true);
    
    try {
      // Simulate retry attempt
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock success/failure
      const success = Math.random() > 0.3; // 70% success rate
      
      if (success) {
        // Navigate back to appropriate page based on error context
        switch (errorState.type) {
          case 'content_generation': navigate('/content-generation-preview');
            break;
          case 'download_error':
            navigate('/download-completion');
            break;
          default:
            navigate('/questionnaire-flow');
        }
      } else {
        setErrorState(prev => ({
          ...prev,
          retryCount: prev.retryCount + 1
        }));
      }
    } catch (error) {
      setErrorState(prev => ({
        ...prev,
        retryCount: prev.retryCount + 1
      }));
    } finally {
      setIsRetrying(false);
    }
  };

  const handleGoBack = () => {
    switch (errorState.type) {
      case 'content_generation': navigate('/questionnaire-flow');
        break;
      case 'download_error':
        navigate('/content-generation-preview');
        break;
      default:
        navigate(-1);
    }
  };

  const handleStartOver = () => {
    navigate('/landing-page');
  };

  const getCurrentStep = () => {
    switch (errorState.type) {
      case 'content_generation':
        return 3;
      case 'download_error':
        return 4;
      default:
        return 2;
    }
  };

  const currentScenario = errorScenarios.find(s => s.type === errorState.type) || errorScenarios[0];

  const contextualActions = {
    primaryAction: {
      label: isRetrying ? 'Retrying...' : 'Try Again',
      onClick: handleRetry,
      disabled: isRetrying,
      icon: 'RefreshCw',
      loadingText: 'Retrying...'
    },
    secondaryAction: currentScenario.actions.includes('go_back') ? {
      label: 'Go Back',
      onClick: handleGoBack,
      icon: 'ArrowLeft'
    } : null,
    tertiaryAction: {
      label: 'Start Over',
      onClick: handleStartOver,
      icon: 'Home'
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <WorkflowHeader />
      
      <div className="pt-12 md:pt-15">
        <ProgressIndicator 
          currentStep={getCurrentStep()} 
          totalSteps={4}
        />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Error State Header */}
          <div className="text-center mb-8">
            <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-6 ${
              currentScenario.severity === 'high' ? 'bg-error-100' :
              currentScenario.severity === 'medium'? 'bg-warning-100' : 'bg-secondary-100'
            }`}>
              <Icon 
                name={currentScenario.icon} 
                size={32} 
                color={
                  currentScenario.severity === 'high' ? '#EF4444' :
                  currentScenario.severity === 'medium'? '#F59E0B' : '#64748B'
                }
              />
            </div>
            
            <h1 className="text-2xl md:text-3xl font-semibold text-text-primary mb-4">
              {currentScenario.title}
            </h1>
            
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              {currentScenario.message}
            </p>
          </div>

          {/* Error Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Error Information Card */}
            <ErrorStateCard 
              errorState={errorState}
              scenario={currentScenario}
            />

            {/* Health Check Status */}
            <HealthCheckStatus 
              status={healthStatus}
              onRefresh={performHealthCheck}
            />
          </div>

          {/* Retry Mechanism */}
          <RetryMechanism 
            retryCount={errorState.retryCount}
            isRetrying={isRetrying}
            estimatedResolution={currentScenario.estimatedResolution}
            onRetry={handleRetry}
          />

          {/* Breadcrumb Context */}
          {errorState.context && (
            <div className="bg-surface rounded-lg border border-border p-6 mb-8">
              <h3 className="text-lg font-medium text-text-primary mb-4">
                Error Context
              </h3>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-secondary-600">
                  <Icon name="MapPin" size={16} className="mr-2" />
                  <span>Location: {errorState.context.step || 'Unknown'}</span>
                </div>
                <div className="flex items-center text-sm text-secondary-600">
                  <Icon name="Clock" size={16} className="mr-2" />
                  <span>Time: {errorState.timestamp.toLocaleTimeString()}</span>
                </div>
                {errorState.context.userAction && (
                  <div className="flex items-center text-sm text-secondary-600">
                    <Icon name="User" size={16} className="mr-2" />
                    <span>Action: {errorState.context.userAction}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Support Information */}
          <div className="bg-surface rounded-lg border border-border p-6 text-center">
            <h3 className="text-lg font-medium text-text-primary mb-4">
              Need Additional Help?
            </h3>
            <p className="text-secondary-600 mb-6">
              If the problem persists, our support team is here to help you get back on track.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.open('mailto:support@carouselai.com')}
                className="flex items-center justify-center px-6 py-3 bg-surface text-text-primary border border-border rounded-lg font-medium hover:bg-secondary-100 focus:ring-2 focus:ring-primary focus:ring-offset-2 micro-scale transition-all duration-150"
              >
                <Icon name="Mail" size={20} className="mr-2" />
                Email Support
              </button>
              
              <button
                onClick={() => window.open('https://help.carouselai.com', '_blank')}
                className="flex items-center justify-center px-6 py-3 bg-surface text-text-primary border border-border rounded-lg font-medium hover:bg-secondary-100 focus:ring-2 focus:ring-primary focus:ring-offset-2 micro-scale transition-all duration-150"
              >
                <Icon name="HelpCircle" size={20} className="mr-2" />
                Help Center
              </button>
            </div>
          </div>
        </main>

        <ContextualActionBar 
          primaryAction={contextualActions.primaryAction}
          secondaryAction={contextualActions.secondaryAction}
          tertiaryAction={contextualActions.tertiaryAction}
          isLoading={isRetrying}
        />
      </div>
    </div>
  );
};

export default ErrorFallbackStates;