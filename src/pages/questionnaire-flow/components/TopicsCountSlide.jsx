import React from 'react';
import Icon from '../../../components/AppIcon';

const TopicsCountSlide = ({ value, onChange, error, slideDirection }) => {
  const countOptions = [
    {
      count: 3,
      label: '3 Topics',
      description: 'Quick, focused content',
      slides: 'Title + 3 Topics + CTA = 5 slides',
      bestFor: 'Simple tips, quick wins, bite-sized content',
      timeToRead: '30-45 seconds'
    },
    {
      count: 5,
      label: '5 Topics',
      description: 'Balanced depth and engagement',
      slides: 'Title + 5 Topics + CTA = 7 slides',
      bestFor: 'How-to guides, listicles, comprehensive tips',
      timeToRead: '60-90 seconds'
    },
    {
      count: 7,
      label: '7 Topics',
      description: 'Comprehensive, detailed content',
      slides: 'Title + 7 Topics + CTA = 9 slides',
      bestFor: 'In-depth guides, detailed processes, expert insights',
      timeToRead: '90-120 seconds'
    },
    {
      count: 10,
      label: '10 Topics',
      description: 'Extensive, authoritative content',
      slides: 'Title + 10 Topics + CTA = 12 slides',
      bestFor: 'Ultimate guides, comprehensive lists, detailed tutorials',
      timeToRead: '2-3 minutes'
    }
  ];

  const handleCountSelect = (count) => {
    onChange(count);
  };

  return (
    <div className={`transition-all duration-300 ${slideDirection === 'forward' ? 'animate-slide-in-right' : 'animate-slide-in-left'}`}>
      <div className="mb-6">
        <p className="text-secondary-600 text-sm leading-relaxed">
          How many main topics should your carousel cover? This determines the depth and length of your content.
        </p>
      </div>

      <div className="space-y-4">
        {countOptions.map((option) => (
          <button
            key={option.count}
            onClick={() => handleCountSelect(option.count)}
            className={`
              w-full p-5 rounded-lg border-2 text-left transition-all duration-200 micro-scale
              ${value === option.count
                ? 'border-primary bg-primary-50 ring-2 ring-primary ring-opacity-20' :'border-border bg-surface hover:border-primary-200 hover:bg-primary-50'
              }
              ${error ? 'border-error' : ''}
            `}
          >
            <div className="flex items-start space-x-4">
              <div className={`
                flex items-center justify-center w-16 h-16 rounded-lg flex-shrink-0
                ${value === option.count ? 'bg-primary text-white' : 'bg-secondary-100 text-secondary-600'}
              `}>
                <span className="text-2xl font-bold">{option.count}</span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`
                    font-semibold text-lg
                    ${value === option.count ? 'text-primary' : 'text-text-primary'}
                  `}>
                    {option.label}
                  </h3>
                  
                  {value === option.count && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={14} color="white" />
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-secondary-600 mb-3 leading-relaxed">
                  {option.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Icon name="Layers" size={14} color="var(--color-secondary-500)" />
                    <span className="text-xs text-secondary-600">{option.slides}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={14} color="var(--color-secondary-500)" />
                    <span className="text-xs text-secondary-600">Reading time: {option.timeToRead}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Icon name="Target" size={14} color="var(--color-secondary-500)" />
                    <span className="text-xs text-secondary-600">{option.bestFor}</span>
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Custom Count Option */}
      <div className="mt-6 p-4 bg-secondary-50 rounded-lg border border-secondary-200">
        <div className="flex items-start space-x-3">
          <Icon name="Settings" size={16} color="var(--color-secondary-600)" className="mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-secondary-600 mb-1">
              Need a Different Number?
            </h4>
            <p className="text-xs text-secondary-600 leading-relaxed mb-3">
              You can customize the number of topics after generation. Start with one of these options and adjust as needed.
            </p>
            
            <div className="flex items-center space-x-4">
              <label className="text-xs font-medium text-secondary-600">Custom count:</label>
              <input
                type="number"
                min="2"
                max="15"
                value={value || ''}
                onChange={(e) => handleCountSelect(parseInt(e.target.value) || 5)}
                className="w-20 px-2 py-1 text-xs border border-secondary-300 rounded focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="5"
              />
              <span className="text-xs text-secondary-500">topics (2-15)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Strategy Tip */}
      <div className="mt-4 p-4 bg-success-100 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={16} color="var(--color-success)" className="mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-success mb-1">
              Content Strategy Tip
            </h4>
            <p className="text-xs text-success leading-relaxed">
              Instagram users typically spend 15-30 seconds per carousel slide. 
              Choose a count that matches your audience's attention span and content complexity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicsCountSlide;