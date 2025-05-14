
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { navigateToSection } from "@/lib/navigation";

const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigation = (elementId: string) => {
    // Always use sanitized paths for navigation
    const fallbackPath = elementId === 'checkout' ? '/checkout' : undefined;
    
    // Log navigation attempt for debugging
    console.log(`Navbar navigation: elementId=${elementId}, fallbackPath=${fallbackPath}`);
    
    // Use our centralized navigation utility
    navigateToSection(elementId, navigate, fallbackPath);
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
