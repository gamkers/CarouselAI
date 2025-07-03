import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TopicSlide = ({ value, onChange, error, slideDirection }) => {
  const [customInput, setCustomInput] = useState(value || '');

  const suggestedTopics = [
    "10 Morning Habits for Success",
    "Social Media Marketing Tips",
    "Healthy Meal Prep Ideas",
    "Productivity Hacks for Remote Work",
    "Investment Strategies for Beginners",
    "Home Workout Routines",
    "Time Management Techniques",
    "Building Personal Brand",
    "Stress Management Methods",
    "Digital Marketing Trends"
  ];

  const handleTopicSelect = (topic) => {
    setCustomInput(topic);
    onChange(topic);
  };

  const handleCustomInputChange = (e) => {
    const inputValue = e.target.value;
    setCustomInput(inputValue);
    onChange(inputValue);
  };

  return (
    <div className={`transition-all duration-300 ${slideDirection === 'forward' ? 'animate-slide-in-right' : 'animate-slide-in-left'}`}>
      <div className="mb-6">
        <p className="text-secondary-600 text-sm leading-relaxed">
          What specific topic would you like your carousel to cover? Be as specific as possible for better results.
        </p>
      </div>

      {/* Custom Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-text-primary mb-2">
          Your Topic
        </label>
        <div className="relative">
          <textarea
            value={customInput}
            onChange={handleCustomInputChange}
            placeholder="e.g., 5 Essential Email Marketing Strategies for Small Businesses"
            className={`
              w-full px-4 py-3 border-2 rounded-lg resize-none transition-all duration-200
              focus:ring-2 focus:ring-primary focus:ring-opacity-20 focus:border-primary
              ${error ? 'border-error' : 'border-border'}
            `}
            rows={3}
          />
          <div className="absolute bottom-3 right-3">
            <Icon name="Edit3" size={16} color="var(--color-secondary-400)" />
          </div>
        </div>
        {customInput && (
          <p className="text-xs text-secondary-600 mt-2">
            Character count: {customInput.length}/200
          </p>
        )}
      </div>

      {/* Suggested Topics */}
      <div>
        <h3 className="text-sm font-medium text-text-primary mb-3 flex items-center">
          <Icon name="Lightbulb" size={16} className="mr-2 text-accent" />
          Popular Topic Ideas
        </h3>
        
        <div className="grid grid-cols-1 gap-2">
          {suggestedTopics.map((topic, index) => (
            <button
              key={index}
              onClick={() => handleTopicSelect(topic)}
              className={`
                p-3 rounded-lg border text-left transition-all duration-200 micro-scale
                ${customInput === topic
                  ? 'border-primary bg-primary-50 text-primary' :'border-border bg-surface hover:border-primary-200 hover:bg-primary-50 text-text-primary'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{topic}</span>
                {customInput === topic && (
                  <Icon name="Check" size={16} color="var(--color-primary)" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Topic Guidelines */}
      <div className="mt-6 p-4 bg-accent-100 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} color="var(--color-accent-600)" className="mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-accent-600 mb-1">
              Tips for Better Results
            </h4>
            <ul className="text-xs text-accent-600 space-y-1">
              <li>• Be specific about your topic (e.g., "Email Marketing" vs "Marketing")</li>
              <li>• Include numbers when relevant (e.g., "5 Tips" or "10 Steps")</li>
              <li>• Consider your target audience's knowledge level</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicSlide;