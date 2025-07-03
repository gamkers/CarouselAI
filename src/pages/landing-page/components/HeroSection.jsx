import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const HeroSection = ({ onTryNow }) => {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-accent-100 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-accent rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-primary rounded-full"></div>
        <div className="absolute bottom-32 right-10 w-24 h-24 bg-accent rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-surface rounded-full border border-border mb-6">
              <Icon name="Sparkles" size={16} className="mr-2 text-primary" />
              <span className="text-sm font-medium text-text-primary">
                AI-Powered Content Creation
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
              Create Stunning
              <span className="text-primary block">Instagram Carousels</span>
              in Minutes
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-secondary-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Transform your ideas into professional Instagram carousels with AI-powered backgrounds, 
              perfect text overlays, and ready-to-post designs. No design skills required.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={onTryNow}
                className="flex items-center justify-center px-8 py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary focus:ring-offset-2 elevation-2 hover:elevation-3 micro-scale transition-all duration-150"
              >
                <Icon name="Sparkles" size={24} className="mr-3" />
                Try Now - It's Free
              </button>
              
              <button className="flex items-center justify-center px-8 py-4 bg-surface text-text-primary border border-border rounded-lg font-semibold text-lg hover:bg-secondary-100 focus:ring-2 focus:ring-primary focus:ring-offset-2 micro-scale transition-all duration-150">
                <Icon name="Play" size={24} className="mr-3" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center lg:justify-start space-x-8 mt-12">
              <div className="text-center">
                <div className="text-2xl font-bold text-text-primary">10K+</div>
                <div className="text-sm text-secondary-600">Carousels Created</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-text-primary">5K+</div>
                <div className="text-sm text-secondary-600">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-text-primary">4.9★</div>
                <div className="text-sm text-secondary-600">User Rating</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative bg-surface rounded-2xl p-8 elevation-3">
              {/* Mock Carousel Preview */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Instagram" size={16} color="white" />
                  </div>
                  <span className="font-medium text-text-primary">Instagram Carousel</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="aspect-square bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Icon name="Image" size={32} className="mx-auto mb-2 text-primary" />
                      <div className="text-xs font-medium text-text-primary">Slide 1</div>
                    </div>
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-accent-100 to-primary-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Icon name="Type" size={32} className="mx-auto mb-2 text-primary" />
                      <div className="text-xs font-medium text-text-primary">Slide 2</div>
                    </div>
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Icon name="BarChart3" size={32} className="mx-auto mb-2 text-primary" />
                      <div className="text-xs font-medium text-text-primary">Slide 3</div>
                    </div>
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-secondary-100 to-accent-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Icon name="MessageCircle" size={32} className="mx-auto mb-2 text-primary" />
                      <div className="text-xs font-medium text-text-primary">Slide 4</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-2">
                    <Icon name="Download" size={16} className="text-success" />
                    <span className="text-sm text-success font-medium">Ready to Download</span>
                  </div>
                  <div className="text-xs text-secondary-600">ZIP Package</div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-accent rounded-full flex items-center justify-center elevation-2">
              <Icon name="Sparkles" size={24} color="white" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-success rounded-full flex items-center justify-center elevation-2">
              <Icon name="Check" size={16} color="white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;