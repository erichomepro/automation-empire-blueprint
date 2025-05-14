
import React from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";

const BookCoverSection = () => {
  return (
    <div className="flex-shrink-0 w-full max-w-[280px] md:max-w-[320px] mx-auto md:mx-0 animate-float">
      <Card className="overflow-hidden rounded-lg shadow-2xl border-purple-400/30 bg-gradient-to-br from-purple-900 to-purple-950">
        <AspectRatio ratio={3/4} className="bg-purple-900">
          <div className="relative w-full h-full flex flex-col justify-between">
            {/* Top part of the cover */}
            <div className="p-6 text-center">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-light mb-2">THE AUTOMATED EMPIRE</h2>
              <div className="w-16 h-16 mx-auto my-4 rounded-full bg-orange-400 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-10 h-10 text-purple-900" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"></path>
                  <path d="M12 8v4l3 3"></path>
                  <circle cx="12" cy="12" r="2"></circle>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-orange-400">AI SYSTEMS</h3>
            </div>
            
            {/* Subtitle */}
            <div className="px-4 py-2 text-center">
              <p className="text-xs text-light/90">THE ULTIMATE PLAYBOOK FOR ENTREPRENEURS WHO WANT TIME, SCALE, AND SANITY</p>
            </div>
            
            {/* Author name */}
            <div className="p-4 bg-purple-800/50 text-center">
              <p className="text-light font-bold">By Eric Wick</p>
            </div>
            
            {/* Side text */}
            <div className="absolute -right-12 top-1/2 transform -translate-y-1/2 rotate-90 text-xs font-bold text-orange-400 tracking-widest">
              MAKE.COM IT ONCE SELL IT FOREVER
            </div>
          </div>
        </AspectRatio>
      </Card>
      <div className="mt-4 text-center">
        <p className="text-xs font-medium text-gray-300">
          35+ pages of step-by-step automation guides
        </p>
      </div>
    </div>
  );
};

export default BookCoverSection;
