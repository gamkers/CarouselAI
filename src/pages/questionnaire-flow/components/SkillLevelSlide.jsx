import React from 'react';
import Icon from '../../../components/AppIcon';

const SkillLevelSlide = ({ value, onChange, error, slideDirection }) => {
  const skillLevels = [
    {
      id: 'beginner',
      label: 'Beginner',
      icon: 'BookOpen',
      description: 'New to the topic, needs foundational knowledge',
      approach: 'Simple explanations, step-by-step guidance, basic terminology',
      contentStyle: 'More text, clear instructions, avoid jargon'
    },
    {
      id: 'intermediate',
      label: 'Intermediate',
      icon: 'TrendingUp',
      description: 'Has some experience, looking to improve skills',
      approach: 'Practical tips, actionable strategies, moderate complexity',
      contentStyle: 'Balanced text and visuals, specific examples'
    },
    {
      id: 'advanced',
      label: 'Advanced',
      icon: 'Award',
      description: 'Experienced, seeking advanced insights and trends',
      approach: 'Industry insights, advanced techniques, latest trends',
      contentStyle: 'Concise content, data-driven, expert perspectives'
    },
    {
      id: 'mixed',
      label: 'Mixed Levels',
      icon: 'Users',
      description: 'Audience with varying levels of expertise',
      approach: 'Layered content, something for everyone, progressive difficulty',
      contentStyle: 'Clear structure, optional deep-dives, accessible language'
    }
  ];

  const handleSkillLevelSelect = (skillLevelId) => {
    onChange(skillLevelId);
  };

  return (
    <div className={`transition-all duration-300 ${slideDirection === 'forward' ? 'animate-slide-in-right' : 'animate-slide-in-left'}`}>
      <div className="mb-6">
        <p className="text-secondary-600 text-sm leading-relaxed">
          What's your audience's skill level regarding your topic? This determines the complexity and depth of content we'll create.
        </p>
      </div>

      <div className="space-y-4">
        {skillLevels.map((level) => (
          <button
            key={level.id}
            onClick={() => handleSkillLevelSelect(level.id)}
            className={`
              w-full p-5 rounded-lg border-2 text-left transition-all duration-200 micro-scale
              ${value === level.id
                ? 'border-primary bg-primary-50 ring-2 ring-primary ring-opacity-20' :'border-border bg-surface hover:border-primary-200 hover:bg-primary-50'
              }
              ${error ? 'border-error' : ''}
            `}
          >
            <div className="flex items-start space-x-4">
              <div className={`
                flex items-center justify-center w-12 h-12 rounded-lg flex-shrink-0
                ${value === level.id ? 'bg-primary text-white' : 'bg-secondary-100 text-secondary-600'}
              `}>
                <Icon name={level.icon} size={24} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`
                    font-semibold text-lg
                    ${value === level.id ? 'text-primary' : 'text-text-primary'}
                  `}>
                    {level.label}
                  </h3>
                  
                  {value === level.id && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={14} color="white" />
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-secondary-600 mb-3 leading-relaxed">
                  {level.description}
                </p>
                
                <div className="space-y-2">
                  <div>
                    <span className="text-xs font-medium text-text-primary">Approach: </span>
                    <span className="text-xs text-secondary-600">{level.approach}</span>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-text-primary">Content Style: </span>
                    <span className="text-xs text-secondary-600">{level.contentStyle}</span>
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Skill Level Impact */}
      <div className="mt-6 p-4 bg-success-100 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Target" size={16} color="var(--color-success)" className="mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-success mb-1">
              Content Optimization
            </h4>
            <p className="text-xs text-success leading-relaxed">
              Matching content complexity to audience skill level ensures better engagement and comprehension. 
              We'll adjust terminology, examples, and depth accordingly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillLevelSlide;