
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { User, Star } from 'lucide-react';

const HighlightedTestimonial = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  return (
    <section className="section py-12 bg-gradient-to-b from-purple-950 to-purple-900/95">
      <div 
        ref={ref} 
        className={`max-w-4xl mx-auto transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="text-orange-400 fill-orange-400" />
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-900/80 to-purple-950 p-6 md:p-12 rounded-xl shadow-xl border border-purple-400/20">
          <div className="flex flex-col items-center text-center">
            <p className="text-xl md:text-3xl font-heading italic mb-6 text-light">
              "These systems took me from <span className="text-orange-400">side hustle</span> to <span className="text-orange-400">$20K+ months</span> with zero burnout"
            </p>
            
            <div className="flex items-center gap-4 mt-4">
              <div className="h-16 w-16 rounded-full bg-purple-700/50 flex items-center justify-center flex-shrink-0 border-2 border-orange-400">
                <User size={32} className="text-orange-400" />
              </div>
              
              <div className="text-left">
                <p className="font-heading text-xl">Eric Wick</p>
                <p className="text-light/70">CO-Founder, Cerberus Media</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighlightedTestimonial;
