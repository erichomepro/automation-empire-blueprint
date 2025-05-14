
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Clock, ShoppingBag, Puzzle, BarChart } from 'lucide-react';

const WhoForSection = () => {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: itemsRef, inView: itemsInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: benefitsRef, inView: benefitsInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="who-is-it-for" className="section bg-dark">
      <div className="max-w-6xl mx-auto">
        <div 
          ref={sectionRef}
          className={`text-center mb-16 transition-all duration-700 ${
            sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-heading mb-4">
            <span className="text-hero">This Book Is For You If...</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div 
            ref={itemsRef}
            className={`transition-all duration-700 delay-100 ${
              itemsInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="bg-hero/20 p-3 rounded-full">
                  <Clock size={24} className="text-hero" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">You're tired of trading time for money</h3>
                  <p className="text-light/80">Break free from the hourly rate trap and start building assets that generate income while you sleep.</p>
                </div>
              </li>
              
              <li className="flex items-start gap-4">
                <div className="bg-hero/20 p-3 rounded-full">
                  <ShoppingBag size={24} className="text-hero" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">You want to sell real products, not pitch hourly work</h3>
                  <p className="text-light/80">Transform your services into productized offerings that clients can purchase on demand.</p>
                </div>
              </li>
              
              <li className="flex items-start gap-4">
                <div className="bg-hero/20 p-3 rounded-full">
                  <Puzzle size={24} className="text-hero" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">You've dabbled in automation but don't know how to package it</h3>
                  <p className="text-light/80">Learn the exact framework for turning your technical skills into high-value client offerings.</p>
                </div>
              </li>
              
              <li className="flex items-start gap-4">
                <div className="bg-hero/20 p-3 rounded-full">
                  <BarChart size={24} className="text-hero" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">You want to help business owners AND scale your own income</h3>
                  <p className="text-light/80">Create win-win scenarios where clients get powerful systems and you get recurring revenue.</p>
                </div>
              </li>
            </ul>
          </div>

          <div 
            ref={benefitsRef}
            className={`bg-gradient-to-br from-muted to-dark p-8 rounded-xl shadow-xl transition-all duration-700 delay-200 ${
              benefitsInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <h3 className="text-2xl font-heading mb-6 text-accent">What You'll Walk Away With:</h3>
            
            <ul className="checkmark-list space-y-4">
              <li>
                <span className="font-semibold text-light">Resellable Airtable + Make templates</span> that clients will happily pay for
              </li>
              <li>
                <span className="font-semibold text-light">Working automation workflows</span> you can implement immediately
              </li>
              <li>
                <span className="font-semibold text-light">SOPs that close clients faster</span> and streamline your delivery
              </li>
              <li>
                <span className="font-semibold text-light">A ready-to-launch offer</span>, even if you're not technical
              </li>
            </ul>
            
            <div className="mt-8 p-4 bg-hero/10 rounded-lg border border-hero/30">
              <p className="text-light/90 italic">
                "You don't just learn automation — you get a product ready to sell by tomorrow."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoForSection;
