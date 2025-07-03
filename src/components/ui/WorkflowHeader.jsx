import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const WorkflowHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    navigate('/landing-page');
  };

  const handleBackClick = () => {
    if (location.pathname === '/questionnaire-flow') {
      navigate('/landing-page');
    } else if (location.pathname === '/content-generation-preview') {
      navigate('/questionnaire-flow');
    }
  };

  const showBackButton = ['/questionnaire-flow', '/content-generation-preview'].includes(location.pathname);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 md:h-15">
          {/* Back Button - Mobile/Tablet */}
          {showBackButton && (
            <button
              onClick={handleBackClick}
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-secondary-100 micro-scale md:hidden"
              aria-label="Go back"
            >
              <Icon name="ArrowLeft" size={20} color="currentColor" />
            </button>
          )}

          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={handleLogoClick}
              className="flex items-center space-x-2 micro-scale"
              aria-label="Go to home"
            >
              {/* Logo Icon */}
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Icon name="Zap" size={20} color="white" />
              </div>
              
              {/* Logo Text - Hidden on small screens */}
              <div className="hidden sm:block">
                <span className="text-lg font-semibold text-text-primary">
                  CarouselAI
                </span>
              </div>
            </button>
          </div>

          {/* Back Button - Desktop */}
          <div className="hidden md:flex items-center">
            {showBackButton && (
              <button
                onClick={handleBackClick}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-secondary-600 hover:text-text-primary hover:bg-secondary-100 rounded-lg micro-scale transition-colors duration-150"
              >
                <Icon name="ArrowLeft" size={16} color="currentColor" />
                <span>Back</span>
              </button>
            )}
          </div>

          {/* Spacer for mobile when no back button */}
          {!showBackButton && <div className="w-8 md:hidden"></div>}
        </div>
      </div>
    </header>
  );
};

export default WorkflowHeader;