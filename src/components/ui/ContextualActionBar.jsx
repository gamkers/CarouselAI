import React from 'react';
import Icon from '../AppIcon';

const ContextualActionBar = ({ 
  primaryAction,
  secondaryAction,
  tertiaryAction,
  isLoading = false,
  className = ""
}) => {
  const renderButton = (action, variant = 'primary') => {
    if (!action) return null;

    const baseClasses = "flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-150 micro-scale disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variantClasses = {
      primary: "bg-primary text-white hover:bg-primary-700 focus:ring-2 focus:ring-primary focus:ring-offset-2 elevation-1 hover:elevation-2",
      secondary: "bg-surface text-text-primary border border-border hover:bg-secondary-100 focus:ring-2 focus:ring-primary focus:ring-offset-2",
      tertiary: "text-secondary-600 hover:text-text-primary hover:bg-secondary-100 focus:ring-2 focus:ring-primary focus:ring-offset-2"
    };

    return (
      <button
        onClick={action.onClick}
        disabled={action.disabled || isLoading}
        className={`${baseClasses} ${variantClasses[variant]} ${action.className || ''}`}
        aria-label={action.label}
      >
        {isLoading && variant === 'primary' ? (
          <>
            <div className="animate-spin -ml-1 mr-3 h-5 w-5 text-white">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            {action.loadingText || 'Loading...'}
          </>
        ) : (
          <>
            {action.icon && (
              <Icon 
                name={action.icon} 
                size={20} 
                className={action.label ? "mr-2" : ""} 
              />
            )}
            {action.label}
          </>
        )}
      </button>
    );
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Mobile Bottom Sheet */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-4 z-40">
        <div className="flex flex-col space-y-3">
          {primaryAction && (
            <div className="w-full">
              {renderButton(primaryAction, 'primary')}
            </div>
          )}
          
          <div className="flex space-x-3">
            {secondaryAction && (
              <div className="flex-1">
                {renderButton(secondaryAction, 'secondary')}
              </div>
            )}
            {tertiaryAction && (
              <div className="flex-shrink-0">
                {renderButton(tertiaryAction, 'tertiary')}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Inline Actions */}
      <div className="hidden md:flex items-center justify-center space-x-4 py-6">
        {tertiaryAction && renderButton(tertiaryAction, 'tertiary')}
        {secondaryAction && renderButton(secondaryAction, 'secondary')}
        {primaryAction && renderButton(primaryAction, 'primary')}
      </div>

      {/* Mobile Spacer */}
      <div className="md:hidden h-24"></div>
    </div>
  );
};

export default ContextualActionBar;