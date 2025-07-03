import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const QuestionnaireResponseSummary = ({ responses }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const summaryItems = [
    { label: 'Niche', value: responses.niche, icon: 'Target' },
    { label: 'Topic', value: responses.topic, icon: 'MessageSquare' },
    { label: 'Goal', value: responses.goal, icon: 'TrendingUp' },
    { label: 'Age Group', value: responses.ageGroup, icon: 'Users' },
    { label: 'Skill Level', value: responses.skillLevel, icon: 'BarChart3' },
    { label: 'Tone', value: responses.tone, icon: 'Volume2' },
    { label: 'CTA Style', value: responses.ctaStyle, icon: 'MousePointer' },
    { label: 'Number of Slides', value: responses.numberOfTopics, icon: 'Layers' }
  ];

  const visibleItems = isExpanded ? summaryItems : summaryItems.slice(0, 4);

  return (
    <div className="bg-surface rounded-lg border border-border p-6 mb-8 elevation-1">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary flex items-center">
          <Icon name="FileText" size={20} className="mr-2" />
          Your Preferences
        </h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center text-sm text-primary hover:text-primary-700 font-medium micro-scale transition-colors duration-150"
        >
          {isExpanded ? 'Show Less' : 'Show All'}
          <Icon 
            name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
            size={16} 
            className="ml-1" 
          />
        </button>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden space-y-3">
        {visibleItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 bg-primary-50 rounded-lg mr-3">
                <Icon name={item.icon} size={16} color="var(--color-primary)" />
              </div>
              <span className="text-sm font-medium text-secondary-600">
                {item.label}:
              </span>
            </div>
            <span className="text-sm text-text-primary font-medium text-right max-w-32 truncate">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {visibleItems.map((item, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-background rounded-lg">
              <div className="flex items-center justify-center w-10 h-10 bg-primary-50 rounded-lg flex-shrink-0">
                <Icon name={item.icon} size={18} color="var(--color-primary)" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-secondary-600 uppercase tracking-wide">
                  {item.label}
                </p>
                <p className="text-sm text-text-primary font-medium truncate">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Badge */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-sm text-secondary-600 mr-2">Generated for:</span>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              responses.category === 'business' ?'bg-blue-100 text-blue-800' 
                : responses.category === 'lifestyle' ?'bg-green-100 text-green-800'
                : responses.category === 'education' ?'bg-purple-100 text-purple-800' :'bg-gray-100 text-gray-800'
            }`}>
              <Icon 
                name={
                  responses.category === 'business' ? 'Briefcase' :
                  responses.category === 'lifestyle' ? 'Heart' :
                  responses.category === 'education'? 'GraduationCap' : 'Tag'
                } 
                size={12} 
                className="mr-1" 
              />
              {responses.category} Category
            </span>
          </div>
          
          <div className="text-xs text-secondary-600">
            AI-Generated Content
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireResponseSummary;