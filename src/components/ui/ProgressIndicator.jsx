import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ProgressIndicator = ({ currentStep, totalSteps = 4, onStepClick }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const steps = [
    {
      id: 1,
      label: 'Start',
      path: '/landing-page',
      isAccessible: true
    },
    {
      id: 2,
      label: 'Questions',
      path: '/questionnaire-flow',
      isAccessible: currentStep >= 2
    },
    {
      id: 3,
      label: 'Preview',
      path: '/content-generation-preview',
      isAccessible: currentStep >= 3
    },
    {
      id: 4,
      label: 'Complete',
      path: '/download-completion',
      isAccessible: currentStep >= 4
    }
  ];

  const handleStepClick = (step) => {
    if (step.isAccessible && step.id < currentStep) {
      if (onStepClick) {
        onStepClick(step.id);
      } else {
        navigate(step.path);
      }
    }
  };

  const getStepStatus = (step) => {
    if (step.id < currentStep) return 'completed';
    if (step.id === currentStep) return 'current';
    return 'upcoming';
  };

  // Don't show on landing page or error pages
  if (location.pathname === '/landing-page' || location.pathname === '/error-fallback-states') {
    return null;
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6">
      {/* Desktop Progress Bar */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const status = getStepStatus(step);
            const isClickable = step.isAccessible && step.id < currentStep;
            
            return (
              <div key={step.id} className="flex items-center flex-1">
                {/* Step Circle */}
                <button
                  onClick={() => handleStepClick(step)}
                  disabled={!isClickable}
                  className={`
                    relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
                    ${status === 'completed' 
                      ? 'bg-primary border-primary text-white' 
                      : status === 'current' ?'bg-surface border-primary text-primary' :'bg-surface border-secondary-200 text-secondary-400'
                    }
                    ${isClickable ? 'hover:scale-105 cursor-pointer micro-scale' : 'cursor-default'}
                  `}
                  aria-label={`Step ${step.id}: ${step.label}`}
                >
                  {status === 'completed' ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </button>

                {/* Step Label */}
                <div className="ml-3 min-w-0 flex-1">
                  <p className={`text-sm font-medium ${
                    status === 'current' ? 'text-primary' : 
                    status === 'completed' ? 'text-text-primary' : 'text-secondary-400'
                  }`}>
                    {step.label}
                  </p>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-4">
                    <div className={`h-0.5 transition-colors duration-300 ${
                      step.id < currentStep ? 'bg-primary' : 'bg-secondary-200'
                    }`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Progress Dots */}
      <div className="md:hidden">
        <div className="flex items-center justify-center space-x-2 mb-4">
          {steps.map((step) => {
            const status = getStepStatus(step);
            const isClickable = step.isAccessible && step.id < currentStep;
            
            return (
              <button
                key={step.id}
                onClick={() => handleStepClick(step)}
                disabled={!isClickable}
                className={`
                  w-3 h-3 rounded-full transition-all duration-300
                  ${status === 'completed' || status === 'current'
                    ? 'bg-primary' :'bg-secondary-200'
                  }
                  ${status === 'current' ? 'scale-125' : ''}
                  ${isClickable ? 'cursor-pointer' : 'cursor-default'}
                `}
                aria-label={`Step ${step.id}: ${step.label}`}
              />
            );
          })}
        </div>

        {/* Current Step Label */}
        <div className="text-center">
          <p className="text-sm text-secondary-600">
            Step {currentStep} of {totalSteps}
          </p>
          <p className="text-base font-medium text-text-primary">
            {steps.find(step => step.id === currentStep)?.label}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="w-full bg-secondary-200 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;