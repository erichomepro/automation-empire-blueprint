
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { FileText, CheckSquare, LayoutGrid, Settings, Users } from 'lucide-react';

const BookContentSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const chapters = [
    {
      icon: FileText,
      title: "The Automated Empire Framework",
      description: "Transform your business model into a scalable system",
      color: "from-purple-500 to-purple-700"
    },
    {
      icon: CheckSquare,
      title: "Setup Your Make.com Backbone",
      description: "The exact account settings that maximize efficiency",
      color: "from-orange-400 to-orange-600"
    },
    {
      icon: LayoutGrid,
      title: "Airtable Database Design",
      description: "Structure your data for effortless scaling",
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: Settings,
      title: "Automation Scenarios",
      description: "Copy-paste templates for instant integration",
      color: "from-green-400 to-green-600"
    },
    {
      icon: Users,
      title: "Client Onboarding Systems",
      description: "Create seamless experiences without extra work",
      color: "from-red-400 to-red-600"
    }
  ];

  return (
    <section className="section py-16 bg-gradient-to-b from-purple-950 to-purple-900">
      <div 
        ref={ref} 
        className={`transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading mb-4">
            <span className="text-orange-400">What's Inside</span> The Book
          </h2>
          <p className="text-light/80 max-w-2xl mx-auto">
            35+ pages of actionable content, templates and step-by-step guides to build your automated business
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {chapters.map((chapter, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-br from-purple-800/30 to-purple-950 p-6 rounded-xl border border-purple-400/20 shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${chapter.color} flex items-center justify-center mb-4 shadow-lg`}>
                <chapter.icon size={24} className="text-white" />
              </div>
              
              <div className="flex items-center mb-4">
                <div className={`h-5 w-5 mr-2 bg-purple-800 rounded-sm flex items-center justify-center`}>
                  <span className="text-xs text-white font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-heading text-orange-400">
                  {chapter.title}
                </h3>
              </div>
              
              <p className="text-light/70">
                {chapter.description}
              </p>
              
              <div className="mt-4 relative overflow-hidden h-32 bg-purple-900/50 rounded border border-purple-400/20 flex items-center justify-center">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-400/10 to-purple-400/5 rounded-bl-3xl"></div>
                <div className="text-xs text-light/50 italic px-4 text-center">
                  "I'll show you exactly how to build this step-by-step using proven templates"
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookContentSection;
