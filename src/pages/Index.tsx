
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import WhoForSection from '@/components/WhoForSection';
import WhatYouGetSection from '@/components/WhatYouGetSection';
import SocialProofSection from '@/components/SocialProofSection';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import FooterCTA from '@/components/FooterCTA';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <WhoForSection />
        <WhatYouGetSection />
        <SocialProofSection />
        <FAQSection />
        <CTASection />
        <FooterCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
