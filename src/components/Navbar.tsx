
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { safeScrollToElement } from "@/lib/utils";

const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigation = (elementId: string) => {
    // Use our centralized utility with fallback path
    safeScrollToElement(elementId, navigate, elementId === 'checkout' ? '/checkout' : undefined);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-md border-b border-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <span className="text-hero font-heading text-2xl">AUTOMATION EMPIRE</span>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-light hover:text-accent hover:bg-transparent"
              onClick={() => handleNavigation('features')}
            >
              Features
            </Button>
            <Button 
              variant="ghost" 
              className="text-light hover:text-accent hover:bg-transparent"
              onClick={() => handleNavigation('who-is-it-for')}
            >
              Who It's For
            </Button>
            <Button 
              variant="ghost" 
              className="text-light hover:text-accent hover:bg-transparent"
              onClick={() => handleNavigation('what-you-get')}
            >
              What You Get
            </Button>
            <Button 
              variant="ghost" 
              className="text-light hover:text-accent hover:bg-transparent"
              onClick={() => handleNavigation('faq')}
            >
              FAQ
            </Button>
          </nav>
          <Button 
            className="bg-accent text-dark font-bold hover:bg-opacity-90 transition-all"
            onClick={() => handleNavigation('checkout')}
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
