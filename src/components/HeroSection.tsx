
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
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
    const checkout = document.getElementById('checkout');
    if (checkout) {
      checkout.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn("Checkout element not found");
      // Fallback - just scroll down 100vh
      window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative w-full min-h-[100svh] flex flex-col justify-center items-center pt-20 pb-16 px-4">
      {/* Debug rendering indicator */}
      {!isLoaded && <div style={{position: 'absolute', top: 0, right: 0, background: 'red', color: 'white', padding: '2px 5px', fontSize: '10px', zIndex: 9999}}>Loading</div>}
      
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-dark">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-hero/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div 
        className={`w-full max-w-5xl mx-auto text-center transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <h1 className="text-3xl md:text-6xl lg:text-7xl font-heading font-bold mb-4 text-light">
          Escape Freelance Burnout —<br />
          <span className="text-hero block mt-2">Get Paid on Autopilot</span>
          <span className="text-accent block mt-2">with One System.</span>
        </h1>

        <div className="my-6 md:my-8 h-12 overflow-hidden">
          <h2 className="typewriter text-xl md:text-2xl font-heading">
            Build Once. Sell Forever.
          </h2>
        </div>

        <p className="text-base md:text-xl mb-8 max-w-3xl mx-auto text-light/90 px-2">
          Discover the blueprint that built $20K+ months using Make.com + Airtable —
          <span className="font-bold block sm:inline sm:ml-2">no code, no team, no burnout. Just results.</span>
        </p>
        
        <div className="mt-6 md:mt-8">
          <Button 
            onClick={scrollToCheckout} 
            size="lg" 
            className="btn-action text-base md:text-lg px-4 py-2 md:px-8 md:py-4 w-full max-w-xs md:max-w-none md:w-auto"
          >
            🔵 Get the Automation Blueprint — $9.99
          </Button>
          
          <div className="mt-8 md:mt-16">
            <ArrowDown className="mx-auto text-light/50" size={24} />
            <p className="text-xs md:text-sm text-light/50 mt-2">Scroll to learn more</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
