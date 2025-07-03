import React from 'react';
import Icon from '../../../components/AppIcon';

const Header = ({ onTryNow }) => {
  return (
    <header className="bg-surface border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              {/* Logo Icon */}
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-xl">
                <Icon name="Zap" size={24} color="white" />
              </div>
              
              {/* Logo Text */}
              <div className="flex flex-col">
                <span className="text-xl font-bold text-text-primary">
                  CarouselAI
                </span>
                <span className="text-xs text-secondary-600 hidden sm:block">
                  Instagram Carousel Creator
                </span>
              </div>
            </div>
          </div>

          {/* Try Now Button */}
          <button
            onClick={onTryNow}
            className="flex items-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-700 focus:ring-2 focus:ring-primary focus:ring-offset-2 elevation-1 hover:elevation-2 micro-scale transition-all duration-150"
          >
            <Icon name="Sparkles" size={20} className="mr-2" />
            <span className="hidden sm:inline">Try Now</span>
            <span className="sm:hidden">Try</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;