import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import WorkflowHeader from '../../components/ui/WorkflowHeader';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import ContextualActionBar from '../../components/ui/ContextualActionBar';
import Icon from '../../components/AppIcon';

import QuestionnaireResponseSummary from './components/QuestionnaireResponseSummary';
import CarouselPreviewGallery from './components/CarouselPreviewGallery';
import GenerationLoadingState from './components/GenerationLoadingState';

const API_BASE = 'http://31.97.60.127:5000';

const ContentGenerationPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Normalize keys from location.state to match expected keys (camelCase)
  function normalizeResponses(raw) {
    if (!raw) return null;
    // Accept both camelCase and snake_case from previous step
    return {
      niche: raw.niche || raw.Niche || "",
      topic: raw.topic || raw.Topic || "",
      goal: raw.goal || raw.Goal || "",
      ageGroup: raw.ageGroup || raw.age_group || raw.AgeGroup || "",
      skillLevel: raw.skillLevel || raw.skill_level || raw.SkillLevel || "",
      tone: raw.tone || raw.Tone || "",
      ctaStyle: raw.ctaStyle || raw.cta_style || raw.CTAStyle || "",
      numberOfTopics: raw.numberOfTopics || raw.num_topics || raw.NumberOfTopics || 5,
      category: raw.category || raw.Category || ""
    };
  }

  const [questionnaireResponses, setQuestionnaireResponses] = useState(() => {
    // Use normalized responses if present, otherwise fallback
    const normalized = normalizeResponses(location.state?.questionnaireResponses);
    if (
      normalized &&
      Object.values(normalized).some((v) => v !== "" && v !== undefined && v !== null)
    ) {
      return normalized;
    }
    // fallback for dev/testing
    return {
      niche: "Digital Marketing",
      topic: "Instagram Growth Strategies",
      goal: "Increase engagement and followers",
      ageGroup: "25-35",
      skillLevel: "Intermediate",
      tone: "Professional yet approachable",
      ctaStyle: "Action-oriented",
      numberOfTopics: 5,
      category: "business"
    };
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationComplete, setGenerationComplete] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [generationError, setGenerationError] = useState(null);
  const [generatedSlides, setGeneratedSlides] = useState([]);
  const [carouselFilename, setCarouselFilename] = useState(null);
  const [topics, setTopics] = useState([]);
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(null);
  const [topicsLoading, setTopicsLoading] = useState(false);
  const [topicsError, setTopicsError] = useState(null);

  // Track last used topic index for regeneration
  const [lastUsedTopicIndex, setLastUsedTopicIndex] = useState(null);

  // Helper to map backend carousel_files to generatedSlides format
  const mapApiSlides = (carouselFiles) => {
    return (carouselFiles || []).map((slide) => ({
      id: slide.slide_number,
      title: slide.title,
      content: slide.content,
      backgroundImage: `${API_BASE}/carousel-image-file/${slide.filename}`,
      textOverlay: {
        // Overlay info is not provided by backend, so leave blank or set defaults
        position: undefined,
        backgroundColor: undefined,
        textColor: undefined
      }
    }));
  };

  // Add a key to force topic refetch when preferences change
  const [topicsFetchKey, setTopicsFetchKey] = useState(0);

  // Track previous questionnaire responses to detect real changes
  const prevResponsesRef = React.useRef(questionnaireResponses);

  useEffect(() => {
    // Compare all fields to detect if user changed topic/preferences
    const prev = prevResponsesRef.current;
    const curr = questionnaireResponses;
    const changed =
      prev.niche !== curr.niche ||
      prev.topic !== curr.topic ||
      prev.goal !== curr.goal ||
      prev.ageGroup !== curr.ageGroup ||
      prev.skillLevel !== curr.skillLevel ||
      prev.tone !== curr.tone ||
      prev.ctaStyle !== curr.ctaStyle ||
      prev.numberOfTopics !== curr.numberOfTopics ||
      prev.category !== curr.category;

    if (changed) {
      setTopics([]);
      setSelectedTopicIndex(null);
      setLastUsedTopicIndex(null);
      setGeneratedSlides([]);
      setCarouselFilename(null);
      setGenerationComplete(false);
      setGenerationError(null);
      setCurrentSlideIndex(0);
      setTopicsFetchKey((k) => k + 1);
      prevResponsesRef.current = curr;
    }
    // eslint-disable-next-line
  }, [
    questionnaireResponses.niche,
    questionnaireResponses.topic,
    questionnaireResponses.goal,
    questionnaireResponses.ageGroup,
    questionnaireResponses.skillLevel,
    questionnaireResponses.tone,
    questionnaireResponses.ctaStyle,
    questionnaireResponses.numberOfTopics,
    questionnaireResponses.category
  ]);

  // Fetch topics first (only if not already loaded or key changes)
  useEffect(() => {
    const fetchTopics = async () => {
      setTopicsLoading(true);
      setTopicsError(null);
      try {
        const preferences = {
          niche: questionnaireResponses.niche,
          specific_topic: questionnaireResponses.topic,
          goal: questionnaireResponses.goal,
          age_group: questionnaireResponses.ageGroup,
          skill_level: questionnaireResponses.skillLevel,
          tone: questionnaireResponses.tone,
          cta_style: questionnaireResponses.ctaStyle,
          num_topics: questionnaireResponses.numberOfTopics
        };
        const resp = await fetch(`${API_BASE}/generate-topics`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(preferences)
        });
        const data = await resp.json();
        if (!resp.ok || !data.success) {
          throw new Error(data.error || data.message || 'Failed to generate topics');
        }
        setTopics(data.topics || []);
      } catch (error) {
        setTopicsError(error.message || 'Failed to fetch topics');
      } finally {
        setTopicsLoading(false);
      }
    };

    fetchTopics();
    // eslint-disable-next-line
  }, [topicsFetchKey]);

  // Generate carousel when a topic is selected
  useEffect(() => {
    if (
      selectedTopicIndex !== null &&
      !generationComplete &&
      !isGenerating &&
      topics[selectedTopicIndex]
    ) {
      const generateCarousel = async () => {
        setIsGenerating(true);
        setGenerationError(null);
        setGeneratedSlides([]);
        setCarouselFilename(null);

        try {
          const topic = topics[selectedTopicIndex];
          const preferences = {
            niche: questionnaireResponses.niche,
            specific_topic: questionnaireResponses.topic,
            goal: questionnaireResponses.goal,
            age_group: questionnaireResponses.ageGroup,
            skill_level: questionnaireResponses.skillLevel,
            tone: questionnaireResponses.tone,
            cta_style: questionnaireResponses.ctaStyle,
            num_topics: questionnaireResponses.numberOfTopics
          };

          const topicData = {
            hook: topic.hook,
            slide2: topic.slide2,
            slide3: topic.slide3,
            slide4: topic.slide4,
            cta: topic.cta
          };

          const payload = {
            topic_data: topicData,
            preferences,
            topic_category: questionnaireResponses.category
          };

          const resp = await fetch(`${API_BASE}/create-carousel`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });

          const data = await resp.json();
          if (!resp.ok || !data.success) {
            throw new Error(data.error || data.message || 'Failed to generate carousel');
          }

          setGeneratedSlides(mapApiSlides(data.carousel_files));
          setCarouselFilename(data.zip_filename);
          setGenerationComplete(true);
          setLastUsedTopicIndex(selectedTopicIndex);
        } catch (error) {
          setGenerationError(error.message || 'Generation failed. Please try again.');
        } finally {
          setIsGenerating(false);
        }
      };

      generateCarousel();
    }
    // eslint-disable-next-line
  }, [selectedTopicIndex, generationComplete, isGenerating, topics]);

  const handleDownloadCarousel = async () => {
    setIsDownloading(true);

    try {
      if (!carouselFilename) throw new Error('No carousel file available for download');
      const resp = await fetch(`${API_BASE}/download-carousel/${carouselFilename}`);
      if (!resp.ok) throw new Error('Download failed');
      const blob = await resp.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = carouselFilename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setGenerationError(error.message || 'Download failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  // Regenerate: pick the next topic in the list (circular)
  const handleRegenerateContent = () => {
    if (topics.length > 0) {
      let nextIndex = lastUsedTopicIndex !== null ? lastUsedTopicIndex + 1 : 0;
      if (nextIndex >= topics.length) nextIndex = 0;
      setSelectedTopicIndex(nextIndex);
      setGenerationComplete(false);
      setGenerationError(null);
      setCurrentSlideIndex(0);
    }
  };

  const handleGoBack = () => {
    navigate('/questionnaire-flow');
  };

  const handleSlideChange = (index) => {
    setCurrentSlideIndex(index);
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-background">
        <WorkflowHeader />
        <div className="pt-12 md:pt-15">
          <ProgressIndicator currentStep={3} />
          <GenerationLoadingState />
        </div>
      </div>
    );
  }

  if (generationError) {
    return (
      <div className="min-h-screen bg-background">
        <WorkflowHeader />
        <div className="pt-12 md:pt-15">
          <ProgressIndicator currentStep={3} />
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-error-100 mb-6">
                <Icon name="AlertTriangle" size={32} color="#EF4444" />
              </div>
              <h2 className="text-2xl font-semibold text-text-primary mb-4">
                Generation Failed
              </h2>
              <p className="text-secondary-600 mb-8 max-w-md mx-auto">
                {generationError}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleRegenerateContent}
                  className="flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-700 focus:ring-2 focus:ring-primary focus:ring-offset-2 elevation-1 hover:elevation-2 micro-scale transition-all duration-150"
                >
                  <Icon name="RefreshCw" size={20} className="mr-2" />
                  Try Again
                </button>
                <button
                  onClick={handleGoBack}
                  className="flex items-center justify-center px-6 py-3 bg-surface text-text-primary border border-border rounded-lg font-medium hover:bg-secondary-100 focus:ring-2 focus:ring-primary focus:ring-offset-2 micro-scale transition-all duration-150"
                >
                  <Icon name="ArrowLeft" size={20} className="mr-2" />
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Only show topic selection if not yet selected
  if (topicsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <span className="text-lg text-secondary-600">Loading topic suggestions...</span>
      </div>
    );
  }

  if (topicsError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <span className="text-lg text-error-600">{topicsError}</span>
      </div>
    );
  }

  if (topics.length > 0 && selectedTopicIndex === null) {
    return (
      <div className="min-h-screen bg-background">
        <WorkflowHeader />
        <div className="max-w-2xl mx-auto py-12 px-4">
          <h1 className="text-2xl font-semibold text-text-primary mb-4 text-center">
            Choose a Topic to Generate Your Carousel
          </h1>
          <p className="text-secondary-600 mb-8 text-center">
            Here are some AI-generated carousel topics based on your preferences. Select one to generate the images and content.
          </p>
          <div className="space-y-6">
            {topics.map((topic, idx) => (
              <div key={idx} className="bg-surface rounded-lg border border-border p-5 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-primary">{`Topic ${topic.number}`}</span>
                  <span className="text-text-primary font-medium">{topic.hook}</span>
                </div>
                <div className="text-secondary-700 text-sm">
                  <div><b>Slide 2:</b> {topic.slide2}</div>
                  <div><b>Slide 3:</b> {topic.slide3}</div>
                  <div><b>Slide 4:</b> {topic.slide4}</div>
                  <div><b>CTA:</b> {topic.cta}</div>
                </div>
                <button
                  className="mt-3 self-end px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-700 transition"
                  onClick={() => {
                    setSelectedTopicIndex(idx);
                    setLastUsedTopicIndex(idx);
                    setGeneratedSlides([]);
                    setCarouselFilename(null);
                    setGenerationComplete(false);
                    setGenerationError(null);
                    setCurrentSlideIndex(0);
                  }}
                >
                  Generate Carousel for this Topic
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <WorkflowHeader />
      <div className="pt-12 md:pt-15">
        <ProgressIndicator currentStep={3} />
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-semibold text-text-primary mb-2">
              Your Carousel is Ready!
            </h1>
            <p className="text-secondary-600 max-w-2xl mx-auto">
              Review your AI-generated Instagram carousel below. You can download it as a complete package or regenerate if you'd like different content.
            </p>
          </div>
          {/* Questionnaire Response Summary */}
          <QuestionnaireResponseSummary responses={questionnaireResponses} />
          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Carousel Preview - Main Area */}
            <div className="lg:col-span-8">
              <CarouselPreviewGallery
                slides={generatedSlides}
                currentSlideIndex={currentSlideIndex}
                onSlideChange={handleSlideChange}
              />
            </div>
            {/* Slide Information Panel */}
            <div className="lg:col-span-4">
              <div className="bg-surface rounded-lg border border-border p-6 elevation-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-text-primary">
                    Slide Details
                  </h3>
                  <span className="text-sm text-secondary-600">
                    {currentSlideIndex + 1} of {generatedSlides.length}
                  </span>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-text-primary mb-2">
                      {generatedSlides[currentSlideIndex]?.title}
                    </h4>
                    <p className="text-sm text-secondary-600 leading-relaxed">
                      {generatedSlides[currentSlideIndex]?.content}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <h5 className="text-sm font-medium text-text-primary mb-2">
                      Style Information
                    </h5>
                    <div className="space-y-2 text-sm text-secondary-600">
                      <div className="flex justify-between">
                        <span>Category:</span>
                        <span className="capitalize">{questionnaireResponses.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Text Position:</span>
                        <span className="capitalize">
                          {generatedSlides[currentSlideIndex]?.textOverlay.position}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tone:</span>
                        <span>{questionnaireResponses.tone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Quick Stats */}
              <div className="mt-6 bg-surface rounded-lg border border-border p-4 elevation-1">
                <h4 className="font-medium text-text-primary mb-3">Package Contents</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-secondary-600">Total Slides:</span>
                    <span className="font-medium text-text-primary">{generatedSlides.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-secondary-600">Format:</span>
                    <span className="font-medium text-text-primary">1080x1080 PNG</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-secondary-600">Package:</span>
                    <span className="font-medium text-text-primary">ZIP File</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Action Bar */}
        <ContextualActionBar
          primaryAction={{
            label: isDownloading ? 'Preparing Download...' : 'Download Carousel',
            onClick: handleDownloadCarousel,
            disabled: isDownloading || !carouselFilename,
            icon: isDownloading ? null : 'Download',
            loadingText: 'Preparing Download...'
          }}
          secondaryAction={{
            label: 'Regenerate Content',
            onClick: handleRegenerateContent,
            icon: 'RefreshCw'
          }}
          tertiaryAction={{
            label: 'Back to Questions',
            onClick: handleGoBack,
            icon: 'ArrowLeft'
          }}
          isLoading={isDownloading}
        />
      </div>
    </div>
  );
};

export default ContentGenerationPreview;