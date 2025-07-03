import React from 'react';
import Icon from '../../../components/AppIcon';

const GoalSlide = ({ value, onChange, error, slideDirection }) => {
  const goals = [
    {
      id: 'educate',
      label: 'Educate & Inform',
      icon: 'BookOpen',
      description: 'Share knowledge, tips, and educational content',
      examples: 'How-to guides, tutorials, industry insights'
    },
    {
      id: 'inspire',
      label: 'Inspire & Motivate',
      icon: 'Zap',
      description: 'Motivate audience to take action or change mindset',
      examples: 'Success stories, motivational quotes, transformation journeys'
    },
    {
      id: 'promote',
      label: 'Promote Product/Service',
      icon: 'Megaphone',
      description: 'Showcase offerings and drive sales or conversions',
      examples: 'Product features, testimonials, special offers'
    },
    {
      id: 'engage',
      label: 'Build Community & Engagement',
      icon: 'Users',
      description: 'Foster interaction and build stronger relationships',
      examples: 'Behind-the-scenes, polls, user-generated content'
    },
    {
      id: 'awareness',
      label: 'Increase Brand Awareness',
      icon: 'Eye',
      description: 'Build recognition and establish thought leadership',
      examples: 'Company values, team introductions, industry positioning'
    },
    {
      id: 'entertain',
      label: 'Entertain & Delight',
      icon: 'Smile',
      description: 'Create enjoyable content that brings joy',
      examples: 'Funny memes, interesting facts, trending topics'
    }
  ];

  const handleGoalSelect = (goalId) => {
    onChange(goalId);
  };

  return (
    <div className={`transition-all duration-300 ${slideDirection === 'forward' ? 'animate-slide-in-right' : 'animate-slide-in-left'}`}>
      <div className="mb-6">
        <p className="text-secondary-600 text-sm leading-relaxed">
          What's the primary goal of your carousel? This helps us structure the content and choose the right messaging approach.
        </p>
      </div>

      <div className="space-y-3">
        {goals.map((goal) => (
          <button
            key={goal.id}
            onClick={() => handleGoalSelect(goal.id)}
            className={`
              w-full p-4 rounded-lg border-2 text-left transition-all duration-200 micro-scale
              ${value === goal.id
                ? 'border-primary bg-primary-50 ring-2 ring-primary ring-opacity-20' :'border-border bg-surface hover:border-primary-200 hover:bg-primary-50'
              }
              ${error ? 'border-error' : ''}
            `}
          >
            <div className="flex items-start space-x-4">
              <div className={`
                flex items-center justify-center w-12 h-12 rounded-lg flex-shrink-0
                ${value === goal.id ? 'bg-primary text-white' : 'bg-secondary-100 text-secondary-600'}
              `}>
                <Icon name={goal.icon} size={24} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`
                    font-semibold text-base
                    ${value === goal.id ? 'text-primary' : 'text-text-primary'}
                  `}>
                    {goal.label}
                  </h3>
                  
                  {value === goal.id && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={14} color="white" />
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-secondary-600 mb-2 leading-relaxed">
                  {goal.description}
                </p>
                
                <p className="text-xs text-secondary-500 italic">
                  Examples: {goal.examples}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Goal Impact Info */}
      <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-100">
        <div className="flex items-start space-x-3">
          <Icon name="Target" size={16} color="var(--color-primary)" className="mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-primary mb-1">
              Why This Matters
            </h4>
            <p className="text-xs text-primary leading-relaxed">
              Your goal determines the content structure, visual style, and call-to-action approach. 
              Choose the one that best aligns with your current marketing objectives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalSlide;