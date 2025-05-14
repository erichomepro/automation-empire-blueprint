
import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useNavigate } from 'react-router-dom';
import { navigateToSection } from "@/lib/navigation";

const EmpowermentSection = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigateToSection('checkout', navigate, '/checkout');
  };
  
  return (
    <section id="empowerment" className="py-16 md:py-24 bg-gradient-to-b from-dark to-dark/95 text-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-light">
            <span className="text-accent">You</span> Are in Control
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-light/80">
            Turn your skills into predictable monthly income without trading more time for money.
            The automation blueprint gives you back control of your business and life.
          </p>
        </div>
        
        {/* Success Stories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-br from-muted to-dark p-6 rounded-xl shadow-lg">
            <div className="mb-4 text-accent text-xl font-bold">28 Days</div>
            <h3 className="text-xl font-bold mb-2">From Overwhelmed to Automated</h3>
            <p className="text-light/80 mb-4">
              "I was working 60+ hour weeks until I implemented this system. Within a month, I had my first 
              $5K in passive income and cut my work hours in half."
            </p>
            <div className="text-sm text-light/60">- Alex, Web Designer</div>
          </div>
          
          <div className="bg-gradient-to-br from-muted to-dark p-6 rounded-xl shadow-lg">
            <div className="mb-4 text-accent text-xl font-bold">3 Months</div>
            <h3 className="text-xl font-bold mb-2">Full Client Roster + Passive Income</h3>
            <p className="text-light/80 mb-4">
              "I was struggling to fill my calendar. After implementing this system, I not only filled my 
              client spots but added $3,750 in monthly recurring revenue."
            </p>
            <div className="text-sm text-light/60">- Jamie, Business Coach</div>
          </div>
          
          <div className="bg-gradient-to-br from-muted to-dark p-6 rounded-xl shadow-lg">
            <div className="mb-4 text-accent text-xl font-bold">2 Weeks</div>
            <h3 className="text-xl font-bold mb-2">From Idea to First Sale</h3>
            <p className="text-light/80 mb-4">
              "I had an idea but was stuck in paralysis. With this blueprint, I launched in 14 days and made 
              my first $1,200 without a single sales call."
            </p>
            <div className="text-sm text-light/60">- Morgan, Social Media Expert</div>
          </div>
        </div>
        
        {/* First 30 Days Plan */}
        <div className="bg-muted/20 p-8 rounded-xl mb-16">
          <h3 className="text-2xl font-bold mb-6 text-center">Your First 30 Days Action Plan</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <div className="flex items-start gap-3">
              <div className="text-accent mt-1"><CheckCircle size={20} /></div>
              <div>
                <h4 className="font-bold mb-1">Days 1-7: Set Up Your System</h4>
                <p className="text-light/80">Follow the step-by-step setup guide to connect Make.com with Airtable and build your core automation.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="text-accent mt-1"><CheckCircle size={20} /></div>
              <div>
                <h4 className="font-bold mb-1">Days 8-14: Create Your Minimum Viable Offer</h4>
                <p className="text-light/80">Use the 3-part template to package your expertise into a sellable digital product or service.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="text-accent mt-1"><CheckCircle size={20} /></div>
              <div>
                <h4 className="font-bold mb-1">Days 15-21: Implement Sales Automation</h4>
                <p className="text-light/80">Set up the automated client journey that turns visitors into paying customers without manual work.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="text-accent mt-1"><CheckCircle size={20} /></div>
              <div>
                <h4 className="font-bold mb-1">Days 22-30: Scale Your System</h4>
                <p className="text-light/80">Use the traffic generation templates to bring in your first (or next) wave of automated customers.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Control Messaging */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold mb-4">Take Back Control of Your Business</h3>
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-between mb-4 relative">
              <div className="text-light/50 text-center w-1/3">Trading Time for Money</div>
              <div className="h-0.5 flex-grow bg-muted mx-2"></div>
              <div className="text-accent font-bold text-center w-1/3">Automated Income</div>
              
              <div className="absolute top-7 left-1/2 transform -translate-x-1/2">
                <ArrowRight className="text-accent" size={24} />
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="text-center">
          <Button 
            onClick={handleGetStarted}
            size="lg" 
            className="btn-action text-base md:text-lg px-8 py-4"
          >
            Get Your Automation Blueprint Now
          </Button>
          <p className="mt-4 text-light/70 text-sm">
            One-time payment of $9.99 — Immediate access to all materials
          </p>
        </div>
      </div>
    </section>
  );
};

export default EmpowermentSection;
