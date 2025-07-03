import React from 'react';
import Icon from '../../../components/AppIcon';

const AgeGroupSlide = ({ value, onChange, error, slideDirection }) => {
  const ageGroups = [
    {
      id: 'gen-z',
      label: 'Gen Z (18-26)',
      icon: 'Smartphone',
      description: 'Digital natives, value authenticity and social causes',
      characteristics: ['TikTok-first', 'Visual learners', 'Short attention spans', 'Trend-conscious']
    },
    {
      id: 'millennials',
      label: 'Millennials (27-42)',
      icon: 'Coffee',
      description: 'Career-focused, value experiences over possessions',
      characteristics: ['Instagram-savvy', 'Work-life balance', 'Brand loyal', 'Tech-comfortable']
    },
    {
      id: 'gen-x',
      label: 'Gen X (43-58)',
      icon: 'Briefcase',
      description: 'Established professionals, family-oriented',
      characteristics: ['Facebook users', 'Value quality', 'Skeptical of trends', 'Time-conscious']
    },
    {
      id: 'boomers',
      label: 'Baby Boomers (59+)',
      icon: 'Users',
      description: 'Traditional values, prefer detailed information',
      characteristics: ['Email preferred', 'Trust-focused', 'Detailed content', 'Brand traditional']
    },
    {
      id: 'mixed',
      label: 'Mixed Audience',
      icon: 'Globe',
      description: 'Diverse age range with varied preferences',
      characteristics: ['Universal appeal', 'Clear messaging', 'Multiple formats', 'Broad accessibility']
    }
  ];

  const handleAgeGroupSelect = (ageGroupId) => {
    onChange(ageGroupId);
  };

  return (
    <div className={`transition-all duration-300 ${slideDirection === 'forward' ? 'animate-slide-in-right' : 'animate-slide-in-left'}`}>
      <div className="mb-6">
        <p className="text-secondary-600 text-sm leading-relaxed">
          Who is your primary target audience? Understanding their age group helps us tailor the content style, tone, and visual approach.
        </p>
      </div>

      <div className="space-y-4">
        {ageGroups.map((group) => (
          <button
            key={group.id}
            onClick={() => handleAgeGroupSelect(group.id)}
            className={`
              w-full p-4 rounded-lg border-2 text-left transition-all duration-200 micro-scale
              ${value === group.id
                ? 'border-primary bg-primary-50 ring-2 ring-primary ring-opacity-20' :'border-border bg-surface hover:border-primary-200 hover:bg-primary-50'
              }
              ${error ? 'border-error' : ''}
            `}
          >
            <div className="flex items-start space-x-4">
              <div className={`
                flex items-center justify-center w-12 h-12 rounded-lg flex-shrink-0
                ${value === group.id ? 'bg-primary text-white' : 'bg-secondary-100 text-secondary-600'}
              `}>
                <Icon name={group.icon} size={24} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`
                    font-semibold text-base
                    ${value === group.id ? 'text-primary' : 'text-text-primary'}
                  `}>
                    {group.label}
                  </h3>
                  
                  {value === group.id && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={14} color="white" />
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-secondary-600 mb-3 leading-relaxed">
                  {group.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {group.characteristics.map((characteristic, index) => (
                    <span
                      key={index}
                      className={`
                        px-2 py-1 rounded-full text-xs font-medium
                        ${value === group.id 
                          ? 'bg-primary-100 text-primary' :'bg-secondary-100 text-secondary-600'
                        }
                      `}
                    >
                      {characteristic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Audience Insights */}
      <div className="mt-6 p-4 bg-accent-100 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Users" size={16} color="var(--color-accent-600)" className="mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-accent-600 mb-1">
              Audience Targeting Tips
            </h4>
            <p className="text-xs text-accent-600 leading-relaxed">
              Each generation has unique communication preferences and content consumption habits. 
              Selecting the right age group helps us optimize visual design, language style, and content depth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgeGroupSlide;