import React from 'react';
import { useNavigate } from 'react-router-dom';


import HeroSection from './components/HeroSection';
import BenefitsSection from './components/BenefitsSection';
import SocialProofSection from './components/SocialProofSection';
import Header from './components/Header';
import Footer from './components/Footer';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleTryNow = () => {
    navigate('/questionnaire-flow');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onTryNow={handleTryNow} />
      <main>
        <HeroSection onTryNow={handleTryNow} />
        <BenefitsSection />
        <SocialProofSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;