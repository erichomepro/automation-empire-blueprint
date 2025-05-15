
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown, BookOpen } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { navigateToSection } from "@/lib/navigation";
import BookCoverSection from "@/components/BookCoverSection";
import TrustBar from "@/components/TrustBar";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  
  // Debug loading on mobile
  console.log("HeroSection rendering");
  
  useEffect(() => {
    console.log("HeroSection mounted");
    // Mark component as visible with a small delay
    const timer = setTimeout(() => {
      setIsVisible(true);
      console.log("HeroSection visibility set to true");
    }, 100);
    
    // Mark as fully loaded
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
      console.log("HeroSection marked as fully loaded");
    }, 500);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(loadTimer);
    };
  }, []);

  const scrollToCheckout = () => {
    console.log("Scroll to checkout clicked");
    // Use our centralized navigation utility with checkout fallback
    navigateToSection('checkout', navigate, '/checkout');
  };

  return (
    <section className="relative w-full min-h-[100svh] flex flex-col justify-center items-center pt-20 pb-16 px-4">
      {/* Debug rendering indicator */}
      {!isLoaded && <div style={{position: 'absolute', top: 0, right: 0, background: 'red', color: 'white', padding: '2px 5px', fontSize: '10px', zIndex: 9999}}>Loading</div>}
      
      {/* Background elements - updated to match purple branding */}
      <div className="absolute inset-0 -z-10 bg-purple-950">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-700/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-400/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div 
        className={`w-full max-w-5xl mx-auto text-center transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <h2 className="text-lg md:text-xl font-bold mb-2 text-orange-500">EBOOK DOWNLOAD • 35+ PAGES OF ACTIONABLE CONTENT</h2>
        
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 text-light">
          {/* New headline test variant */}
          <span className="text-purple-300 block">THE BLUEPRINTS BEHIND</span>
          <span className="text-orange-500 block mt-2">$20K MONTHS</span>
          <span className="text-sm md:text-lg text-light block mt-2">AUTOMATE YOUR BUSINESS WITHOUT CODE — NO TEAM, NO BURNOUT, JUST RESULTS</span>
        </h1>

        <div className="my-6 md:my-8 h-12 overflow-hidden">
          <h2 className="typewriter text-xl md:text-2xl font-heading">
            BUILD ONCE. SELL IT FOREVER.
          </h2>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 my-8">
          <BookCoverSection />
          
          <div className="flex-1">
            <p className="text-base md:text-xl mb-8 max-w-3xl mx-auto text-light/90 px-2">
              Discover the blueprints that built $20K+ months using Make.com + Airtable —
              <span className="font-bold block sm:inline sm:ml-2">no code, no team, no burnout. Just results.</span>
            </p>
            
            <div className="mt-6 md:mt-8">
              <Button 
                onClick={scrollToCheckout} 
                size="lg" 
                className="btn-action text-base md:text-lg px-4 py-2 md:px-8 md:py-4 w-full max-w-xs md:max-w-none md:w-auto"
              >
                <BookOpen className="mr-2" size={20} />
                Get the Automation Blueprints — $9.99
              </Button>
              
              {/* Added benefit bullet under CTA button */}
              <p className="text-light/80 mt-3 text-sm md:text-base">
                🔁 Build once, automate forever. No code needed.
              </p>
            </div>
            
            {/* Added trust bar */}
            <div className="mt-6">
              <TrustBar />
            </div>
          </div>
        </div>
        
        <div className="mt-8 md:mt-16">
          <ArrowDown className="mx-auto text-light/50" size={24} />
          <p className="text-xs md:text-sm text-light/50 mt-2">Scroll to learn more</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
