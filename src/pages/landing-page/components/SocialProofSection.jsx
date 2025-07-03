import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SocialProofSection = () => {
  const carouselSamples = [
    {
      id: 1,
      title: "Digital Marketing Tips",
      category: "Business",
      slides: 5,
      engagement: "2.3K likes",
      preview: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop&crop=center",
      color: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      title: "Healthy Recipe Guide",
      category: "Lifestyle",
      slides: 7,
      engagement: "1.8K likes",
      preview: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=400&h=400&fit=crop&crop=center",
      color: "from-green-500 to-teal-600"
    },
    {
      id: 3,
      title: "Tech Trends 2024",
      category: "Technology",
      slides: 6,
      engagement: "3.1K likes",
      preview: "https://images.pixabay.com/photo/2018/05/08/08/44/artificial-intelligence-3382507_1280.jpg?w=400&h=400&fit=crop&crop=center",
      color: "from-orange-500 to-red-600"
    },
    {
      id: 4,
      title: "Investment Basics",
      category: "Finance",
      slides: 8,
      engagement: "2.7K likes",
      preview: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=400&fit=crop&crop=center",
      color: "from-emerald-500 to-blue-600"
    },
    {
      id: 5,
      title: "Workout Routines",
      category: "Fitness",
      slides: 4,
      engagement: "1.9K likes",
      preview: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?w=400&h=400&fit=crop&crop=center",
      color: "from-pink-500 to-rose-600"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Digital Marketer",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      content: "CarouselAI transformed my content creation process. What used to take hours now takes minutes, and the quality is incredible!"
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Small Business Owner",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      content: "As someone with zero design skills, this tool is a game-changer. My Instagram engagement has increased by 300%."
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Content Creator",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      content: "The AI-generated backgrounds are stunning, and the text overlays are perfectly positioned. Highly recommend!"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            See What's Possible
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Real carousels created by our users across different industries and niches
          </p>
        </div>

        {/* Carousel Samples - Mobile Horizontal Scroll */}
        <div className="mb-16">
          <div className="md:hidden">
            <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
              {carouselSamples.map((sample) => (
                <div key={sample.id} className="flex-shrink-0 w-64">
                  <div className="bg-surface rounded-xl p-4 elevation-1 hover:elevation-2 transition-all duration-300">
                    {/* Preview Image */}
                    <div className="relative mb-4">
                      <div className={`aspect-square rounded-lg bg-gradient-to-br ${sample.color} p-4 flex items-center justify-center overflow-hidden`}>
                        <Image 
                          src={sample.preview}
                          alt={sample.title}
                          className="w-full h-full object-cover rounded-lg opacity-80"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg"></div>
                        <div className="absolute bottom-2 right-2 bg-surface rounded-full px-2 py-1">
                          <span className="text-xs font-medium text-text-primary">{sample.slides} slides</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-primary bg-primary-100 px-2 py-1 rounded-full">
                          {sample.category}
                        </span>
                        <div className="flex items-center space-x-1 text-secondary-600">
                          <Icon name="Heart" size={12} />
                          <span className="text-xs">{sample.engagement}</span>
                        </div>
                      </div>
                      <h3 className="font-semibold text-text-primary text-sm mb-2">
                        {sample.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {carouselSamples.map((sample) => (
              <div key={sample.id} className="group cursor-pointer">
                <div className="bg-surface rounded-xl p-4 elevation-1 hover:elevation-3 transition-all duration-300 group-hover:scale-105">
                  {/* Preview Image */}
                  <div className="relative mb-4">
                    <div className={`aspect-square rounded-lg bg-gradient-to-br ${sample.color} p-4 flex items-center justify-center overflow-hidden`}>
                      <Image 
                        src={sample.preview}
                        alt={sample.title}
                        className="w-full h-full object-cover rounded-lg opacity-80"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg"></div>
                      <div className="absolute bottom-2 right-2 bg-surface rounded-full px-2 py-1">
                        <span className="text-xs font-medium text-text-primary">{sample.slides} slides</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-primary bg-primary-100 px-2 py-1 rounded-full">
                        {sample.category}
                      </span>
                      <div className="flex items-center space-x-1 text-secondary-600">
                        <Icon name="Heart" size={12} />
                        <span className="text-xs">{sample.engagement}</span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-text-primary text-sm">
                      {sample.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-surface rounded-2xl p-8 md:p-12 elevation-1">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
              What Our Users Say
            </h3>
            <div className="flex items-center justify-center space-x-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Icon key={star} name="Star" size={20} className="text-accent fill-current" />
              ))}
              <span className="ml-2 text-secondary-600">4.9/5 from 500+ reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="text-center">
                <div className="mb-4">
                  <Image 
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mx-auto object-cover"
                  />
                </div>
                <blockquote className="text-secondary-600 mb-4 italic">
                  "{testimonial.content}"
                </blockquote>
                <div>
                  <div className="font-semibold text-text-primary">{testimonial.name}</div>
                  <div className="text-sm text-secondary-600">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;