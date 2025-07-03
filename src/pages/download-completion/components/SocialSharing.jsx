import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SocialSharing = ({ carouselTitle }) => {
  const [copied, setCopied] = useState(false);

  const shareUrl = window.location.origin;
  const shareText = `I just created an amazing Instagram carousel about "${carouselTitle}" using CarouselAI! 🎨✨ Check it out:`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const shareOptions = [
    {
      name: 'Twitter',
      icon: 'Twitter',
      color: '#1DA1F2',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: '#1877F2',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`
    },
    {
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: '#0A66C2',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`
    },
    {
      name: 'WhatsApp',
      icon: 'MessageCircle',
      color: '#25D366',
      url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`
    }
  ];

  const handleShare = (option) => {
    window.open(option.url, '_blank', 'width=600,height=400');
  };

  return (
    <div className="mb-12">
      <div className="bg-surface rounded-lg border border-border p-6 md:p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-text-primary mb-2">
            Share Your Success
          </h2>
          <p className="text-secondary-600">
            Let others know about your amazing carousel creation
          </p>
        </div>

        {/* Share Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {shareOptions.map((option) => (
            <button
              key={option.name}
              onClick={() => handleShare(option)}
              className="flex flex-col items-center justify-center p-4 border border-border rounded-lg hover:border-primary hover:bg-primary-50 transition-all duration-150 micro-scale group"
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-150"
                style={{ backgroundColor: `${option.color}20` }}
              >
                <Icon 
                  name={option.icon} 
                  size={20} 
                  color={option.color}
                />
              </div>
              <span className="text-sm font-medium text-text-primary">
                {option.name}
              </span>
            </button>
          ))}
        </div>

        {/* Copy Link */}
        <div className="border-t border-border pt-6">
          <p className="text-sm text-secondary-600 text-center mb-3">
            Or copy the link to share anywhere
          </p>
          <div className="flex items-center space-x-2 max-w-md mx-auto">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 px-3 py-2 text-sm border border-border rounded-lg bg-background text-secondary-600"
            />
            <button
              onClick={handleCopyLink}
              className={`
                px-4 py-2 rounded-lg font-medium transition-all duration-150 micro-scale
                ${copied 
                  ? 'bg-success text-white' :'bg-primary text-white hover:bg-primary-700'
                }
              `}
            >
              {copied ? (
                <Icon name="Check" size={16} />
              ) : (
                <Icon name="Copy" size={16} />
              )}
            </button>
          </div>
          {copied && (
            <p className="text-sm text-success text-center mt-2">
              Link copied to clipboard!
            </p>
          )}
        </div>

        {/* Social Proof */}
        <div className="mt-8 text-center">
          <p className="text-sm text-secondary-600 mb-4">
            Join thousands of creators who've shared their CarouselAI creations
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-secondary-600">
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={16} />
              <span>10,000+ creators</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Heart" size={16} />
              <span>50,000+ carousels</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Share2" size={16} />
              <span>1M+ shares</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialSharing;