import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const GenerationLoadingState = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const generationSteps = [
    {
      id: 0,
      title: "Analyzing Your Preferences",
      description: "Processing your questionnaire responses and topic selection",
      icon: "Brain",
      duration: 1000
    },
    {
      id: 1,
      title: "Generating Content",
      description: "Creating engaging copy tailored to your audience and goals",
      icon: "PenTool",
      duration: 1500
    },
    {
      id: 2,
      title: "Selecting Backgrounds",
      description: "Choosing AI-powered images that match your content theme",
      icon: "Image",
      duration: 1000
    },
    {
      id: 3,
      title: "Applying Styling",
      description: "Optimizing text overlays and visual hierarchy for engagement",
      icon: "Palette",
      duration: 500
    }
  ];

  useEffect(() => {
    const totalDuration = generationSteps.reduce((sum, step) => sum + step.duration, 0);
    let elapsed = 0;

    const stepTimers = generationSteps.map((step, index) => {
      return setTimeout(() => {
        setCurrentStep(index);
      }, elapsed += (index > 0 ? generationSteps[index - 1].duration : 0));
    });

    // Progress animation
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (totalDuration / 50));
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 50);

    return () => {
      stepTimers.forEach(timer => clearTimeout(timer));
      clearInterval(progressTimer);
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="mx-auto flex items-center justify-center h-16 w-16 bg-primary-50 rounded-full mb-6">
          <div className="animate-spin">
            <Icon name="Loader2" size={32} color="var(--color-primary)" />
          </div>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-semibold text-text-primary mb-2">
          Creating Your Carousel
        </h1>
        <p className="text-secondary-600">
          Our AI is crafting the perfect Instagram carousel for your audience
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">Progress</span>
          <span className="text-sm text-secondary-600">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-secondary-200 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Generation Steps */}
      <div className="space-y-6">
        {generationSteps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const isUpcoming = index > currentStep;

          return (
            <div
              key={step.id}
              className={`flex items-start space-x-4 p-4 rounded-lg transition-all duration-300 ${
                isActive 
                  ? 'bg-primary-50 border border-primary-100' 
                  : isCompleted
                  ? 'bg-success-100 border border-success-200' :'bg-surface border border-border'
              }`}
            >
              {/* Step Icon */}
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0 transition-all duration-300 ${
                  isActive
                    ? 'bg-primary text-white'
                    : isCompleted
                    ? 'bg-success text-white' :'bg-secondary-100 text-secondary-600'
                }`}
              >
                {isCompleted ? (
                  <Icon name="Check" size={20} />
                ) : isActive ? (
                  <div className="animate-spin">
                    <Icon name="Loader2" size={20} />
                  </div>
                ) : (
                  <Icon name={step.icon} size={20} />
                )}
              </div>

              {/* Step Content */}
              <div className="flex-1 min-w-0">
                <h3
                  className={`text-base font-medium transition-colors duration-300 ${
                    isActive
                      ? 'text-primary'
                      : isCompleted
                      ? 'text-success' :'text-text-primary'
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`text-sm mt-1 transition-colors duration-300 ${
                    isActive || isCompleted
                      ? 'text-text-primary' :'text-secondary-600'
                  }`}
                >
                  {step.description}
                </p>
              </div>

              {/* Status Indicator */}
              <div className="flex-shrink-0">
                {isActive && (
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                )}
                {isCompleted && (
                  <div className="text-success">
                    <Icon name="CheckCircle" size={20} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Estimated Time */}
      <div className="mt-8 text-center">
        <p className="text-sm text-secondary-600">
          Estimated time remaining: {Math.max(0, Math.ceil((100 - progress) / 20))} seconds
        </p>
      </div>

      {/* Fun Facts */}
      <div className="mt-8 p-4 bg-accent-100 rounded-lg border border-accent-200">
        <div className="flex items-start space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-accent rounded-full flex-shrink-0">
            <Icon name="Lightbulb" size={16} color="white" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-1">
              Did you know?
            </h4>
            <p className="text-sm text-secondary-600">
              Carousel posts get 1.4x more reach and 3.1x more engagement than single image posts on Instagram!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerationLoadingState;