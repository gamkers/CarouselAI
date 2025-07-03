import React from 'react';
import Icon from '../../../components/AppIcon';

const NicheSlide = ({ value, onChange, error, slideDirection }) => {
  const niches = [
    { id: 'fitness', label: 'Fitness & Health', icon: 'Dumbbell', description: 'Workout tips, nutrition, wellness' },
    { id: 'business', label: 'Business & Entrepreneurship', icon: 'Briefcase', description: 'Startup advice, leadership, growth' },
    { id: 'technology', label: 'Technology & Programming', icon: 'Code', description: 'Tech trends, coding, software' },
    { id: 'lifestyle', label: 'Lifestyle & Personal Development', icon: 'Heart', description: 'Self-improvement, habits, mindset' },
    { id: 'education', label: 'Education & Learning', icon: 'BookOpen', description: 'Study tips, skills, knowledge' },
    { id: 'finance', label: 'Finance & Investment', icon: 'DollarSign', description: 'Money management, investing, wealth' },
    { id: 'creative', label: 'Creative & Design', icon: 'Palette', description: 'Art, design, creativity tips' },
    { id: 'travel', label: 'Travel & Adventure', icon: 'MapPin', description: 'Destinations, tips, experiences' },
    { id: 'food', label: 'Food & Cooking', icon: 'ChefHat', description: 'Recipes, cooking tips, nutrition' },
    { id: 'parenting', label: 'Parenting & Family', icon: 'Users', description: 'Child care, family tips, relationships' }
  ];

  const handleNicheSelect = (nicheId) => {
    onChange(nicheId);
  };

  return (
    <div className={`transition-all duration-300 ${slideDirection === 'forward' ? 'animate-slide-in-right' : 'animate-slide-in-left'}`}>
      <div className="mb-6">
        <p className="text-secondary-600 text-sm leading-relaxed">
          Select the niche that best describes your content focus. This helps us tailor the carousel to your audience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {niches.map((niche) => (
          <button
            key={niche.id}
            onClick={() => handleNicheSelect(niche.id)}
            className={`
              p-4 rounded-lg border-2 text-left transition-all duration-200 micro-scale
              ${value === niche.id
                ? 'border-primary bg-primary-50 ring-2 ring-primary ring-opacity-20' :'border-border bg-surface hover:border-primary-200 hover:bg-primary-50'
              }
              ${error ? 'border-error' : ''}
            `}
          >
            <div className="flex items-start space-x-3">
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-lg
                ${value === niche.id ? 'bg-primary text-white' : 'bg-secondary-100 text-secondary-600'}
              `}>
                <Icon name={niche.icon} size={20} />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className={`
                  font-medium text-sm mb-1
                  ${value === niche.id ? 'text-primary' : 'text-text-primary'}
                `}>
                  {niche.label}
                </h3>
                <p className="text-xs text-secondary-600 leading-relaxed">
                  {niche.description}
                </p>
              </div>

              {value === niche.id && (
                <div className="flex-shrink-0">
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Check" size={12} color="white" />
                  </div>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Custom Niche Option */}
      <div className="mt-4 pt-4 border-t border-border">
        <button
          onClick={() => handleNicheSelect('custom')}
          className={`
            w-full p-4 rounded-lg border-2 text-left transition-all duration-200 micro-scale
            ${value === 'custom' ?'border-primary bg-primary-50 ring-2 ring-primary ring-opacity-20' :'border-dashed border-secondary-300 bg-surface hover:border-primary hover:bg-primary-50'
            }
          `}
        >
          <div className="flex items-center space-x-3">
            <div className={`
              flex items-center justify-center w-10 h-10 rounded-lg
              ${value === 'custom' ? 'bg-primary text-white' : 'bg-secondary-100 text-secondary-600'}
            `}>
              <Icon name="Plus" size={20} />
            </div>
            
            <div className="flex-1">
              <h3 className={`
                font-medium text-sm
                ${value === 'custom' ? 'text-primary' : 'text-text-primary'}
              `}>
                Other / Custom Niche
              </h3>
              <p className="text-xs text-secondary-600">
                Don't see your niche? We'll customize for your specific area.
              </p>
            </div>

            {value === 'custom' && (
              <div className="flex-shrink-0">
                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Check" size={12} color="white" />
                </div>
              </div>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default NicheSlide;