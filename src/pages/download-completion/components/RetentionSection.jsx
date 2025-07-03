import React from 'react';
import Icon from '../../../components/AppIcon';

const RetentionSection = ({ 
  emailSignup, 
  setEmailSignup, 
  showEmailSuccess, 
  onEmailSignup, 
  onCreateAnother 
}) => {
  return (
    <div className="mb-12">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Create Another Carousel */}
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 mb-4">
              <Icon name="Plus" size={24} color="var(--color-primary)" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Create Another Carousel
            </h3>
            <p className="text-secondary-600 mb-4">
              Ready to create more engaging content? Start a new carousel with different topics and styles.
            </p>
            <button
              onClick={onCreateAnother}
              className="w-full flex items-center justify-center px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-700 focus:ring-2 focus:ring-primary focus:ring-offset-2 micro-scale transition-all duration-150"
            >
              <Icon name="Plus" size={18} className="mr-2" />
              Start New Carousel
            </button>
          </div>
        </div>

        {/* Email Signup */}
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-accent-100 mb-4">
              <Icon name="Mail" size={24} color="var(--color-accent)" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Get Marketing Tips
            </h3>
            <p className="text-secondary-600 mb-4">
              Subscribe to receive weekly tips, templates, and strategies to boost your social media presence.
            </p>
            
            {showEmailSuccess ? (
              <div className="p-3 bg-success-100 rounded-lg border border-success/20">
                <div className="flex items-center justify-center space-x-2 text-success">
                  <Icon name="CheckCircle" size={18} />
                  <span className="font-medium">Thanks for subscribing!</span>
                </div>
              </div>
            ) : (
              <form onSubmit={onEmailSignup} className="space-y-3">
                <input
                  type="email"
                  value={emailSignup}
                  onChange={(e) => setEmailSignup(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-150"
                  required
                />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-4 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-600 focus:ring-2 focus:ring-accent focus:ring-offset-2 micro-scale transition-all duration-150"
                >
                  <Icon name="Mail" size={18} className="mr-2" />
                  Subscribe for Tips
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Additional Features */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-background rounded-lg border border-border">
          <Icon name="Palette" size={24} color="var(--color-primary)" className="mx-auto mb-2" />
          <h4 className="font-medium text-text-primary mb-1">Custom Branding</h4>
          <p className="text-sm text-secondary-600">Add your logo and brand colors</p>
        </div>
        <div className="text-center p-4 bg-background rounded-lg border border-border">
          <Icon name="Calendar" size={24} color="var(--color-primary)" className="mx-auto mb-2" />
          <h4 className="font-medium text-text-primary mb-1">Scheduled Posts</h4>
          <p className="text-sm text-secondary-600">Plan and schedule your content</p>
        </div>
        <div className="text-center p-4 bg-background rounded-lg border border-border">
          <Icon name="BarChart3" size={24} color="var(--color-primary)" className="mx-auto mb-2" />
          <h4 className="font-medium text-text-primary mb-1">Analytics</h4>
          <p className="text-sm text-secondary-600">Track performance metrics</p>
        </div>
      </div>
    </div>
  );
};

export default RetentionSection;