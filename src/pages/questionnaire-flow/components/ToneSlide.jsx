import React from 'react';
import Icon from '../../../components/AppIcon';

const ToneSlide = ({ value, onChange, error, slideDirection }) => {
  const tones = [
    {
      id: 'professional',
      label: 'Professional & Authoritative',
      icon: 'Briefcase',
      description: 'Formal, credible, expert-focused',
      examples: 'Industry insights, business strategies, expert analysis',
      keywords: ['Expert', 'Research-backed', 'Industry-leading', 'Professional']
    },
    {
      id: 'friendly',
      label: 'Friendly & Conversational',
      icon: 'MessageCircle',
      description: 'Approachable, warm, personal connection',
      examples: 'Personal tips, relatable stories, casual advice',
      keywords: ['Hey there!', 'Let\'s chat', 'Here\'s what I learned', 'You got this']
    },
    {
      id: 'inspirational',
      label: 'Inspirational & Motivational',
      icon: 'Zap',
      description: 'Uplifting, empowering, action-oriented',
      examples: 'Success stories, motivational quotes, transformation journeys',
      keywords: ['Transform', 'Achieve', 'Unlock potential', 'Dream big']
    },
    {
      id: 'educational',
      label: 'Educational & Informative',
      icon: 'BookOpen',
      description: 'Clear, structured, knowledge-focused',
      examples: 'How-to guides, tutorials, step-by-step instructions',
      keywords: ['Learn', 'Discover', 'Master', 'Step-by-step']
    },
    {
      id: 'playful',
      label: 'Playful & Creative',
      icon: 'Smile',
      description: 'Fun, engaging, creative expression',
      examples: 'Creative tips, fun facts, entertaining content',
      keywords: ['Fun fact', 'Creative twist', 'Let\'s explore', 'Surprise!']
    },
    {
      id: 'urgent',
      label: 'Urgent & Action-Driven',
      icon: 'Clock',
      description: 'Time-sensitive, compelling, immediate action',
      examples: 'Limited offers, trending topics, quick wins',
      keywords: ['Don\'t miss', 'Act now', 'Limited time', 'Quick win']
    }
  ];

  const handleToneSelect = (toneId) => {
    onChange(toneId);
  };

  return (
    <div className={`transition-all duration-300 ${slideDirection === 'forward' ? 'animate-slide-in-right' : 'animate-slide-in-left'}`}>
      <div className="mb-6">
        <p className="text-secondary-600 text-sm leading-relaxed">
          What tone best represents your brand voice? This affects the language style, messaging approach, and overall feel of your carousel.
        </p>
      </div>

      <div className="space-y-3">
        {tones.map((tone) => (
          <button
            key={tone.id}
            onClick={() => handleToneSelect(tone.id)}
            className={`
              w-full p-4 rounded-lg border-2 text-left transition-all duration-200 micro-scale
              ${value === tone.id
                ? 'border-primary bg-primary-50 ring-2 ring-primary ring-opacity-20' :'border-border bg-surface hover:border-primary-200 hover:bg-primary-50'
              }
              ${error ? 'border-error' : ''}
            `}
          >
            <div className="flex items-start space-x-4">
              <div className={`
                flex items-center justify-center w-12 h-12 rounded-lg flex-shrink-0
                ${value === tone.id ? 'bg-primary text-white' : 'bg-secondary-100 text-secondary-600'}
              `}>
                <Icon name={tone.icon} size={24} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`
                    font-semibold text-base
                    ${value === tone.id ? 'text-primary' : 'text-text-primary'}
                  `}>
                    {tone.label}
                  </h3>
                  
                  {value === tone.id && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={14} color="white" />
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-secondary-600 mb-2 leading-relaxed">
                  {tone.description}
                </p>
                
                <p className="text-xs text-secondary-500 mb-3 italic">
                  Best for: {tone.examples}
                </p>
                
                <div className="flex flex-wrap gap-1">
                  {tone.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className={`
                        px-2 py-1 rounded text-xs font-medium
                        ${value === tone.id 
                          ? 'bg-primary-100 text-primary' :'bg-secondary-100 text-secondary-600'
                        }
                      `}
                    >
                      "{keyword}"
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Tone Preview */}
      {value && (
        <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-100">
          <div className="flex items-start space-x-3">
            <Icon name="MessageSquare" size={16} color="var(--color-primary)" className="mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-primary mb-2">
                Preview: {tones.find(t => t.id === value)?.label} Tone
              </h4>
              <div className="text-xs text-primary leading-relaxed">
                <p className="mb-1">
                  <strong>Sample opening:</strong> {
                    value === 'professional' ? '"According to recent industry research..."' :
                    value === 'friendly' ? '"Hey there! Let me share something that changed my perspective..."' :
                    value === 'inspirational' ? '"Ready to transform your approach? Here\'s how..."' :
                    value === 'educational' ? '"In this guide, you\'ll learn the essential steps to..."' :
                    value === 'playful' ? '"Here\'s a fun twist on something you thought you knew..."' :
                    value === 'urgent' ? '"Don\'t let this opportunity slip away..."' : ''
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToneSlide;