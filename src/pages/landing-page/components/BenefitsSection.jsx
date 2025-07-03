import React from 'react';
import Icon from '../../../components/AppIcon';

const BenefitsSection = () => {
  const benefits = [
    {
      id: 1,
      icon: "Zap",
      title: "Lightning Fast",
      description: "Create professional carousels in under 5 minutes. Our AI handles the heavy lifting while you focus on your message.",
      color: "text-accent"
    },
    {
      id: 2,
      icon: "Sparkles",
      title: "Professional Quality",
      description: "AI-generated backgrounds, perfect typography, and cohesive design ensure your content looks professionally crafted.",
      color: "text-primary"
    },
    {
      id: 3,
      icon: "MousePointer",
      title: "Zero Design Skills",
      description: "Simply answer a few questions and let our AI create stunning visuals. No Photoshop or design experience needed.",
      color: "text-success"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Why Choose CarouselAI?
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Transform your Instagram presence with AI-powered carousel creation that delivers results
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="text-center group">
              {/* Icon Container */}
              <div className="relative mx-auto w-20 h-20 mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl group-hover:scale-110 transition-transform duration-300"></div>
                <div className="relative flex items-center justify-center w-full h-full">
                  <Icon 
                    name={benefit.icon} 
                    size={32} 
                    className={benefit.color}
                  />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-text-primary mb-4">
                {benefit.title}
              </h3>
              <p className="text-secondary-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="mt-16 pt-16 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <Icon name="Download" size={24} className="mx-auto mb-3 text-primary" />
              <div className="text-sm font-medium text-text-primary mb-1">ZIP Download</div>
              <div className="text-xs text-secondary-600">Complete package ready</div>
            </div>
            <div className="text-center">
              <Icon name="Palette" size={24} className="mx-auto mb-3 text-primary" />
              <div className="text-sm font-medium text-text-primary mb-1">Custom Styling</div>
              <div className="text-xs text-secondary-600">Category-based themes</div>
            </div>
            <div className="text-center">
              <Icon name="Smartphone" size={24} className="mx-auto mb-3 text-primary" />
              <div className="text-sm font-medium text-text-primary mb-1">Mobile Ready</div>
              <div className="text-xs text-secondary-600">Perfect for all devices</div>
            </div>
            <div className="text-center">
              <Icon name="RefreshCw" size={24} className="mx-auto mb-3 text-primary" />
              <div className="text-sm font-medium text-text-primary mb-1">Regenerate</div>
              <div className="text-xs text-secondary-600">Not happy? Try again</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;