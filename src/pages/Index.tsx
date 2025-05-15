
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
import HighlightedTestimonial from '@/components/HighlightedTestimonial';
import BookContentSection from '@/components/BookContentSection';
import StickyCTABar from '@/components/StickyCTABar';

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-purple-950 overflow-x-hidden">
      <Navbar />
      <main className="w-full overflow-x-hidden">
        <HeroSection />
        <HighlightedTestimonial />
        <FeaturesSection />
        <WhoForSection />
        <BookContentSection />
        <WhatYouGetSection />
        <EmpowermentSection />
        <SocialProofSection />
        <FAQSection />
        <CTASection />
        <FooterCTA />
      </main>
      <Footer />
      <StickyCTABar />
    </div>
  );
};

export default Index;
