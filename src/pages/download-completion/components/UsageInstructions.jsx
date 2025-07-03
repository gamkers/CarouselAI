import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const UsageInstructions = () => {
  const [activeTab, setActiveTab] = useState('instagram');

  const instructions = {
    instagram: {
      title: 'Upload to Instagram',
      icon: 'Instagram',
      steps: [
        {
          step: 1,
          title: 'Open Instagram App',
          description: 'Launch the Instagram app on your mobile device and tap the + button to create a new post.'
        },
        {
          step: 2,
          title: 'Select Multiple Images',
          description: 'Tap the multiple selection icon and choose all carousel images in the correct order.'
        },
        {
          step: 3,
          title: 'Add Your Caption',
          description: 'Write an engaging caption that complements your carousel content and includes relevant hashtags.'
        },
        {
          step: 4,
          title: 'Share Your Carousel',
          description: 'Review your post and tap Share to publish your professional carousel to your feed.'
        }
      ]
    },
    linkedin: {
      title: 'Share on LinkedIn',
      icon: 'Linkedin',
      steps: [
        {
          step: 1,
          title: 'Create New Post',
          description: 'Click "Start a post" on your LinkedIn homepage or company page.'
        },
        {
          step: 2,
          title: 'Upload Images',
          description: 'Click the image icon and upload your carousel slides one by one or as a document.'
        },
        {
          step: 3,
          title: 'Write Professional Copy',
          description: 'Craft a professional caption that adds value and encourages engagement from your network.'
        },
        {
          step: 4,
          title: 'Publish & Engage',
          description: 'Post your content and actively engage with comments to maximize reach and visibility.'
        }
      ]
    },
    facebook: {
      title: 'Post on Facebook',
      icon: 'Facebook',
      steps: [
        {
          step: 1,
          title: 'Create Facebook Post',
          description: 'Go to your Facebook page or profile and click "What\'s on your mind?" to start a new post.'
        },
        {
          step: 2,
          title: 'Add Photo Album',
          description: 'Select "Photo/Video" and choose to create an album with your carousel images.'
        },
        {
          step: 3,
          title: 'Arrange & Caption',
          description: 'Arrange images in order and add descriptions to each slide for better engagement.'
        },
        {
          step: 4,
          title: 'Share with Audience',
          description: 'Choose your audience settings and publish your carousel to reach your followers.'
        }
      ]
    }
  };

  const tabs = [
    { id: 'instagram', label: 'Instagram', icon: 'Instagram' },
    { id: 'linkedin', label: 'LinkedIn', icon: 'Linkedin' },
    { id: 'facebook', label: 'Facebook', icon: 'Facebook' }
  ];

  return (
    <div className="mb-12">
      <div className="bg-surface rounded-lg border border-border p-6 md:p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-text-primary mb-2">
            How to Use Your Carousel
          </h2>
          <p className="text-secondary-600">
            Quick guide to maximize your carousel's impact
          </p>
        </div>

        {/* Platform Tabs */}
        <div className="flex flex-wrap justify-center mb-6 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center space-x-2 px-4 py-3 font-medium transition-colors duration-150 border-b-2
                ${activeTab === tab.id
                  ? 'text-primary border-primary' :'text-secondary-600 border-transparent hover:text-text-primary hover:border-secondary-200'
                }
              `}
            >
              <Icon name={tab.icon} size={18} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Instructions Content */}
        <div className="space-y-6">
          {instructions[activeTab].steps.map((instruction) => (
            <div key={instruction.step} className="flex space-x-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full text-sm font-medium">
                  {instruction.step}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-text-primary mb-1">
                  {instruction.title}
                </h3>
                <p className="text-secondary-600 text-sm">
                  {instruction.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pro Tips */}
        <div className="mt-8 p-4 bg-primary-50 rounded-lg border border-primary/20">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-primary mb-2">Pro Tips for Maximum Engagement</h3>
              <ul className="text-sm text-primary space-y-1">
                <li>• Post during your audience's most active hours</li>
                <li>• Use relevant hashtags to increase discoverability</li>
                <li>• Encourage interaction with questions or calls-to-action</li>
                <li>• Cross-promote on multiple platforms for wider reach</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageInstructions;