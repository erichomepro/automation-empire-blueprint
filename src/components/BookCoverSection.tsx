
import React from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";

const BookCoverSection = () => {
  return (
    <div className="flex-shrink-0 w-full max-w-[280px] md:max-w-[320px] mx-auto md:mx-0 animate-float">
      <Card className="overflow-hidden rounded-lg shadow-2xl border-purple-400/30 bg-gradient-to-br from-purple-900 to-purple-950">
        <AspectRatio ratio={3/4} className="bg-purple-900">
          <img 
            src="/lovable-uploads/5ae29f59-9f10-4cab-8396-6687d07354bc.png" 
            alt="The Automated Empire: AI Systems book cover"
            className="w-full h-full object-cover"
          />
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
