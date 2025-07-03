import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkflowHeader from '../../components/ui/WorkflowHeader';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import ContextualActionBar from '../../components/ui/ContextualActionBar';
import Icon from '../../components/AppIcon';

import PreviewGallery from './components/PreviewGallery';
import DownloadSection from './components/DownloadSection';
import UsageInstructions from './components/UsageInstructions';
import RetentionSection from './components/RetentionSection';
import SocialSharing from './components/SocialSharing';

const DownloadCompletion = () => {
  const navigate = useNavigate();
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [emailSignup, setEmailSignup] = useState('');
  const [showEmailSuccess, setShowEmailSuccess] = useState(false);

  // Mock carousel data
  const carouselData = {
    id: 'carousel_001',
    title: 'Digital Marketing Fundamentals',
    slideCount: 8,
    fileSize: '12.4 MB',
    category: 'Marketing',
    slides: [
      {
        id: 1,
        title: 'What is Digital Marketing?',
        preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop',
        content: `Digital marketing encompasses all marketing efforts that use electronic devices or the internet. It's the modern way to reach customers where they spend their time online.`
      },
      {
        id: 2,
        title: 'Key Digital Channels',preview: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop',
        content: `Social Media Marketing
Search Engine Optimization (SEO)
Pay-Per-Click Advertising (PPC)
Email Marketing
Content Marketing`
      },
      {
        id: 3,
        title: 'Benefits of Digital Marketing',preview: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop',
        content: `Cost-effective compared to traditional marketing
Measurable results and analytics
Global reach and targeting
Real-time customer interaction`
      },
      {
        id: 4,
        title: 'Target Audience Research',preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        content: `Understanding your audience is crucial for successful digital marketing campaigns. Research demographics, interests, and online behavior patterns.`
      },
      {
        id: 5,
        title: 'Content Strategy',preview: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop',
        content: `Create valuable, relevant content that resonates with your audience. Focus on solving problems and providing insights.`
      },
      {
        id: 6,
        title: 'Social Media Best Practices',preview: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=400&fit=crop',
        content: `Post consistently
Engage with your audience
Use relevant hashtags
Share visual content
Monitor analytics`
      },
      {
        id: 7,
        title: 'Measuring Success',preview: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop',
        content: `Track key metrics like engagement rate, click-through rate, conversion rate, and return on investment (ROI).`
      },
      {
        id: 8,
        title: 'Get Started Today!',preview: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=400&fit=crop',
        content: `Ready to transform your marketing? Start with one channel, create quality content, and gradually expand your digital presence.`
      }
    ]
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadProgress(0);

    // Simulate download progress
    const progressInterval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsDownloading(false);
          setDownloadComplete(true);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Simulate actual download
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '#'; // In real app, this would be the actual ZIP file URL
      link.download = `${carouselData.title.replace(/\s+/g, '_')}_Carousel.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 2000);
  };

  const handleCreateAnother = () => {
    navigate('/landing-page');
  };

  const handleEmailSignup = (e) => {
    e.preventDefault();
    if (emailSignup.trim()) {
      setShowEmailSuccess(true);
      setEmailSignup('');
      setTimeout(() => setShowEmailSuccess(false), 3000);
    }
  };

  const handleGoBack = () => {
    navigate('/content-generation-preview');
  };

  const primaryAction = {
    label: downloadComplete ? 'Download Complete' : isDownloading ? 'Downloading...' : 'Download ZIP Package',
    onClick: handleDownload,
    disabled: isDownloading || downloadComplete,
    icon: downloadComplete ? 'CheckCircle' : isDownloading ? 'Download' : 'Download',
    loadingText: 'Downloading...'
  };

  const secondaryAction = {
    label: 'Create Another',
    onClick: handleCreateAnother,
    icon: 'Plus'
  };

  const tertiaryAction = {
    label: 'Back to Preview',
    onClick: handleGoBack,
    icon: 'ArrowLeft'
  };

  return (
    <div className="min-h-screen bg-background">
      <WorkflowHeader />
      
      <div className="pt-12 md:pt-15">
        <ProgressIndicator currentStep={4} />
        
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-success-100 mb-6">
              <Icon name="CheckCircle" size={32} color="var(--color-success)" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Your Carousel is Ready!
            </h1>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Your professional Instagram carousel has been generated successfully. Download the complete package and start engaging your audience.
            </p>
          </div>

          {/* Preview Gallery */}
          <PreviewGallery slides={carouselData.slides} title={carouselData.title} />

          {/* Download Section */}
          <DownloadSection 
            carouselData={carouselData}
            downloadProgress={downloadProgress}
            isDownloading={isDownloading}
            downloadComplete={downloadComplete}
            onDownload={handleDownload}
          />

          {/* Usage Instructions */}
          <UsageInstructions />

          {/* Retention Section */}
          <RetentionSection 
            emailSignup={emailSignup}
            setEmailSignup={setEmailSignup}
            showEmailSuccess={showEmailSuccess}
            onEmailSignup={handleEmailSignup}
            onCreateAnother={handleCreateAnother}
          />

          {/* Social Sharing */}
          <SocialSharing carouselTitle={carouselData.title} />

          {/* Support Footer */}
          <div className="mt-12 pt-8 border-t border-border text-center">
            <p className="text-sm text-secondary-600 mb-4">
              Need help with your carousel?
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <button 
                className="text-primary hover:text-primary-700 font-medium"
                onClick={() => window.open('mailto:support@carouselai.com')}
              >
                Contact Support
              </button>
              <span className="text-secondary-400">•</span>
              <button 
                className="text-primary hover:text-primary-700 font-medium"
                onClick={() => navigate('/faq')}
              >
                FAQ
              </button>
              <span className="text-secondary-400">•</span>
              <button 
                className="text-primary hover:text-primary-700 font-medium"
                onClick={() => navigate('/tutorials')}
              >
                Tutorials
              </button>
            </div>
          </div>
        </main>

        <ContextualActionBar
          primaryAction={primaryAction}
          secondaryAction={secondaryAction}
          tertiaryAction={tertiaryAction}
          isLoading={isDownloading}
        />
      </div>
    </div>
  );
};

export default DownloadCompletion;