import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/AppIcon';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/landing-page');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Icon */}
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-secondary-100 mb-8">
          <Icon name="FileQuestion" size={40} color="var(--color-secondary)" />
        </div>

        {/* Error Message */}
        <h1 className="text-6xl font-bold text-text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-text-primary mb-4">
          Page Not Found
        </h2>
        <p className="text-secondary-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="space-y-4">
          {/* Mobile Actions */}
          <div className="md:hidden space-y-3">
            <button
              onClick={handleGoHome}
              className="w-full flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-700 focus:ring-2 focus:ring-primary focus:ring-offset-2 elevation-1 hover:elevation-2 micro-scale transition-all duration-150"
            >
              <Icon name="Home" size={20} className="mr-2" />
              Go to Home
            </button>
            <button
              onClick={handleGoBack}
              className="w-full flex items-center justify-center px-6 py-3 bg-surface text-text-primary border border-border rounded-lg font-medium hover:bg-secondary-100 focus:ring-2 focus:ring-primary focus:ring-offset-2 micro-scale transition-all duration-150"
            >
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Go Back
            </button>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex justify-center space-x-4">
            <button
              onClick={handleGoBack}
              className="flex items-center justify-center px-6 py-3 bg-surface text-text-primary border border-border rounded-lg font-medium hover:bg-secondary-100 focus:ring-2 focus:ring-primary focus:ring-offset-2 micro-scale transition-all duration-150"
            >
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Go Back
            </button>
            <button
              onClick={handleGoHome}
              className="flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-700 focus:ring-2 focus:ring-primary focus:ring-offset-2 elevation-1 hover:elevation-2 micro-scale transition-all duration-150"
            >
              <Icon name="Home" size={20} className="mr-2" />
              Go to Home
            </button>
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
    </div>
  );
};

export default NotFound;