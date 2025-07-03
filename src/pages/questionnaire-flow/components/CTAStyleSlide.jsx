import React from 'react';
import Icon from '../../../components/AppIcon';

const CTAStyleSlide = ({ value, onChange, error, slideDirection }) => {
  const ctaStyles = [
    {
      id: 'direct',
      label: 'Direct & Action-Oriented',
      icon: 'ArrowRight',
      description: 'Clear, immediate call-to-action',
      examples: ['"Buy Now"', '"Sign Up Today"', '"Get Started"', '"Download Free"'],
      bestFor: 'Sales, conversions, immediate action'
    },
    {
      id: 'soft',
      label: 'Soft & Inviting',
      icon: 'Heart',
      description: 'Gentle encouragement, relationship-building',
      examples: ['"Learn More"', '"Explore Options"', '"Join Our Community"', '"Discover How"'],
      bestFor: 'Brand awareness, community building, nurturing'
    },
    {
      id: 'question',
      label: 'Question-Based',
      icon: 'HelpCircle',
      description: 'Engage curiosity, encourage interaction',
      examples: ['"Ready to Transform?"', '"What\'s Your Next Step?"', '"Want to Learn More?"', '"Curious About Results?"'],
      bestFor: 'Engagement, discussion, thought leadership'
    },
    {
      id: 'value',
      label: 'Value-Focused',
      icon: 'Gift',
      description: 'Emphasize benefits and outcomes',
      examples: ['"Get Your Free Guide"', '"Unlock Exclusive Tips"', '"Access Premium Content"', '"Claim Your Bonus"'],
      bestFor: 'Lead generation, value proposition, incentives'
    },
    {
      id: 'social',
      label: 'Social & Sharing',
      icon: 'Share2',
      description: 'Encourage sharing and social interaction',
      examples: ['"Share Your Thoughts"', '"Tag a Friend"', '"Save for Later"', '"Share This Post"'],
      bestFor: 'Viral content, community engagement, reach expansion'
    },
    {
      id: 'educational',
      label: 'Educational & Informative',
      icon: 'BookOpen',
      description: 'Focus on learning and knowledge',
      examples: ['"Read Full Article"', '"Watch Tutorial"', '"Download Guide"', '"Access Resources"'],
      bestFor: 'Content marketing, education, authority building'
    }
  ];

  const handleCTAStyleSelect = (ctaStyleId) => {
    onChange(ctaStyleId);
  };

  return (
    <div className={`transition-all duration-300 ${slideDirection === 'forward' ? 'animate-slide-in-right' : 'animate-slide-in-left'}`}>
      <div className="mb-6">
        <p className="text-secondary-600 text-sm leading-relaxed">
          How would you like to encourage your audience to take action? The CTA style affects the final slide and overall messaging approach.
        </p>
      </div>

      <div className="space-y-3">
        {ctaStyles.map((style) => (
          <button
            key={style.id}
            onClick={() => handleCTAStyleSelect(style.id)}
            className={`
              w-full p-4 rounded-lg border-2 text-left transition-all duration-200 micro-scale
              ${value === style.id
                ? 'border-primary bg-primary-50 ring-2 ring-primary ring-opacity-20' :'border-border bg-surface hover:border-primary-200 hover:bg-primary-50'
              }
              ${error ? 'border-error' : ''}
            `}
          >
            <div className="flex items-start space-x-4">
              <div className={`
                flex items-center justify-center w-12 h-12 rounded-lg flex-shrink-0
                ${value === style.id ? 'bg-primary text-white' : 'bg-secondary-100 text-secondary-600'}
              `}>
                <Icon name={style.icon} size={24} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`
                    font-semibold text-base
                    ${value === style.id ? 'text-primary' : 'text-text-primary'}
                  `}>
                    {style.label}
                  </h3>
                  
                  {value === style.id && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={14} color="white" />
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-secondary-600 mb-3 leading-relaxed">
                  {style.description}
                </p>
                
                <div className="mb-2">
                  <span className="text-xs font-medium text-text-primary">Examples: </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {style.examples.map((example, index) => (
                      <span
                        key={index}
                        className={`
                          px-2 py-1 rounded text-xs font-medium
                          ${value === style.id 
                            ? 'bg-primary-100 text-primary' :'bg-secondary-100 text-secondary-600'
                          }
                        `}
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
                
                <p className="text-xs text-secondary-500 italic">
                  Best for: {style.bestFor}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* CTA Strategy Tips */}
      <div className="mt-6 p-4 bg-accent-100 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Target" size={16} color="var(--color-accent-600)" className="mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-accent-600 mb-1">
              CTA Strategy Tips
            </h4>
            <ul className="text-xs text-accent-600 space-y-1">
              <li>• Match your CTA style to your content goal and audience expectations</li>
              <li>• Direct CTAs work best for sales-focused content</li>
              <li>• Soft CTAs are ideal for building relationships and trust</li>
              <li>• Question-based CTAs increase engagement and comments</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTAStyleSlide;