
import React, { useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Code, RefreshCw, Puzzle, BrainCircuit, Package2, Video } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <div 
      ref={ref}
      className={`feature-card transition-all duration-700 transform ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="flex flex-col items-center text-center">
        <div className="p-3 bg-hero/20 rounded-full mb-4">
          <Icon size={32} className="text-accent" />
        </div>
        <h3 className="text-xl font-heading mb-2 text-light">{title}</h3>
        <p className="text-light/80">{description}</p>
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: RefreshCw,
      title: "Build once, automate forever",
      description: "Create systems that run themselves, freeing your time and expanding your income"
    },
    {
      icon: Puzzle,
      title: "Resell working systems",
      description: "Package your automations as products and sell them to business owners repeatedly"
    },
    {
      icon: BrainCircuit,
      title: "No code needed",
      description: "Learn Make.com + Airtable without writing a single line of code"
    },
    {
      icon: Package2,
      title: "Ready-to-use templates",
      description: "Walk away with workflows, SOPs, and sellable templates you can use immediately"
    },
    {
      icon: Video,
      title: "Optional video guidance",
      description: "Visual learner? Follow along with clear, no-fluff video tutorials"
    },
    {
      icon: Code,
      title: "Sellable product, not just knowledge",
      description: "You don't just learn automation — you leave with a product you can sell tomorrow"
    }
  ];

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="features" className="section bg-gradient-to-b from-dark to-dark/90">
      <div 
        ref={ref}
        className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-heading mb-4">
          <span className="text-hero">This isn't just a guide</span> — it's a product you can sell.
        </h2>
        <p className="text-light/80 text-lg">
          Everything you need to build, automate, and sell profitable systems to business owners.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
