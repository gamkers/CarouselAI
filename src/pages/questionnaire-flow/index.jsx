import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkflowHeader from '../../components/ui/WorkflowHeader';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import ContextualActionBar from '../../components/ui/ContextualActionBar';
import NicheSlide from './components/NicheSlide';
import TopicSlide from './components/TopicSlide';
import GoalSlide from './components/GoalSlide';
import AgeGroupSlide from './components/AgeGroupSlide';
import SkillLevelSlide from './components/SkillLevelSlide';
import ToneSlide from './components/ToneSlide';
import CTAStyleSlide from './components/CTAStyleSlide';
import TopicsCountSlide from './components/TopicsCountSlide';
import Icon from '../../components/AppIcon';

const QuestionnaireFlow = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    niche: '',
    topic: '',
    goal: '',
    ageGroup: '',
    skillLevel: '',
    tone: '',
    ctaStyle: '',
    topicsCount: 5
  });
  const [errors, setErrors] = useState({});
  const [slideDirection, setSlideDirection] = useState('forward');

  const slides = [
    { component: NicheSlide, key: 'niche', title: 'Choose Your Niche' },
    { component: TopicSlide, key: 'topic', title: 'Specific Topic' },
    { component: GoalSlide, key: 'goal', title: 'Content Goal' },
    { component: AgeGroupSlide, key: 'ageGroup', title: 'Target Age Group' },
    { component: SkillLevelSlide, key: 'skillLevel', title: 'Skill Level' },
    { component: ToneSlide, key: 'tone', title: 'Content Tone' },
    { component: CTAStyleSlide, key: 'ctaStyle', title: 'Call-to-Action Style' },
    { component: TopicsCountSlide, key: 'topicsCount', title: 'Number of Topics' }
  ];

  const totalSlides = slides.length;

  const validateCurrentSlide = () => {
    const currentSlideKey = slides[currentSlide].key;
    const value = formData[currentSlideKey];
    
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      setErrors({ [currentSlideKey]: 'This field is required' });
      return false;
    }
    
    setErrors({});
    return true;
  };

  const handleNext = async () => {
    if (!validateCurrentSlide()) {
      return;
    }

    if (currentSlide < totalSlides - 1) {
      setSlideDirection('forward');
      setCurrentSlide(prev => prev + 1);
    } else {
      // Final slide - generate content
      setIsLoading(true);
      try {
        // Prepare normalized payload for preview page
        const normalizedFormData = {
          niche: formData.niche,
          topic: formData.topic,
          goal: formData.goal,
          ageGroup: formData.ageGroup,
          skillLevel: formData.skillLevel,
          tone: formData.tone,
          ctaStyle: formData.ctaStyle,
          numberOfTopics: formData.topicsCount,
          category: formData.niche // or use a category mapping if available
        };
        navigate('/content-generation-preview', { state: { questionnaireResponses: normalizedFormData } });
      } catch (error) {
        console.error('Error generating content:', error);
        navigate('/error-fallback-states', { 
          state: { 
            errorType: 'generation',
            previousPath: '/questionnaire-flow'
          }
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setSlideDirection('backward');
      setCurrentSlide(prev => prev - 1);
      setErrors({});
    } else {
      navigate('/landing-page');
    }
  };

  const handleInputChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
    
    // Clear error when user starts typing
    if (errors[key]) {
      setErrors(prev => ({
        ...prev,
        [key]: ''
      }));
    }
  };

  const getCurrentSlideComponent = () => {
    const SlideComponent = slides[currentSlide].component;
    const slideKey = slides[currentSlide].key;
    
    return (
      <SlideComponent
        value={formData[slideKey]}
        onChange={(value) => handleInputChange(slideKey, value)}
        error={errors[slideKey]}
        slideDirection={slideDirection}
      />
    );
  };

  const getActionBarConfig = () => {
    const isLastSlide = currentSlide === totalSlides - 1;
    
    return {
      primaryAction: {
        label: isLastSlide ? 'Generate Content' : 'Next',
        onClick: handleNext,
        disabled: isLoading,
        icon: isLastSlide ? 'Sparkles' : 'ArrowRight',
        loadingText: 'Generating...'
      },
      secondaryAction: {
        label: currentSlide === 0 ? 'Back to Home' : 'Back',
        onClick: handleBack,
        disabled: isLoading,
        icon: 'ArrowLeft'
      }
    };
  };

  // Auto-save form data to localStorage
  useEffect(() => {
    localStorage.setItem('questionnaireFormData', JSON.stringify(formData));
  }, [formData]);

  // Load saved form data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('questionnaireFormData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <WorkflowHeader />
      
      {/* Progress Indicator */}
      <div className="pt-12 md:pt-15">
        <ProgressIndicator 
          currentStep={2} 
          totalSteps={4}
        />
      </div>

      {/* Questionnaire Progress */}
      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="bg-surface rounded-lg p-4 mb-6 elevation-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-secondary-600">
              Question {currentSlide + 1} of {totalSlides}
            </span>
            <span className="text-sm font-medium text-primary">
              {Math.round(((currentSlide + 1) / totalSlides) * 100)}%
            </span>
          </div>
          <div className="w-full bg-secondary-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 pb-32 md:pb-8">
        <div className="max-w-2xl mx-auto px-4">
          {/* Slide Container */}
          <div className="bg-surface rounded-xl elevation-2 overflow-hidden">
            {/* Slide Header */}
            <div className="bg-primary-50 px-6 py-4 border-b border-primary-100">
              <h1 className="text-xl font-semibold text-text-primary">
                {slides[currentSlide].title}
              </h1>
              <p className="text-sm text-secondary-600 mt-1">
                Help us understand your content needs
              </p>
            </div>

            {/* Slide Content */}
            <div className="p-6">
              {getCurrentSlideComponent()}
            </div>
          </div>

          {/* Error Display */}
          {Object.keys(errors).length > 0 && (
            <div className="mt-4 p-4 bg-error-100 border border-error rounded-lg">
              <div className="flex items-center">
                <Icon name="AlertCircle" size={20} color="#EF4444" className="mr-2" />
                <p className="text-sm text-error font-medium">
                  Please complete this field to continue
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Action Bar */}
      <ContextualActionBar
        {...getActionBarConfig()}
        isLoading={isLoading}
      />
    </div>
  );
};

export default QuestionnaireFlow;