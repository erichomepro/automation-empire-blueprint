
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
import EmpowermentSection from '@/components/EmpowermentSection';

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-purple-950 overflow-x-hidden">
      <Navbar />
      <main className="w-full overflow-x-hidden">
        <HeroSection />
        <FeaturesSection />
        <WhoForSection />
        <EmpowermentSection />
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
