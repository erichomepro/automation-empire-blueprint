import React from 'react';
import { useInView } from 'react-intersection-observer';
import { FileText, CheckSquare, LayoutGrid, Settings, Users, FileCheck, Award, Star } from 'lucide-react';

const BookContentSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const systems = [
    {
      icon: FileText,
      title: "Lead Capture Engine",
      description: "Collect and organize leads 24/7 with Google Forms + Sheets",
      color: "from-purple-500 to-purple-700"
    },
    {
      icon: Users,
      title: "Luxury Client Onboarding",
      description: "Welcome new clients automatically with AI-generated emails",
      color: "from-orange-400 to-orange-600"
    },
    {
      icon: Settings,
      title: "Fulfillment Tracker",
      description: "Assign tasks, track progress, and notify your team — hands-free",
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: Star,
      title: "Testimonial Collector",
      description: "Ask, remind, and store social proof without lifting a finger",
      color: "from-green-400 to-green-600"
    },
    {
      icon: FileCheck,
      title: "Proof-to-Sales Content Machine",
      description: "Turn reviews into case studies, email copy, social content",
      color: "from-red-400 to-red-600"
    },
    {
      icon: Award,
      title: "Productization Blueprint",
      description: "Sell your system as a DFY service or recurring offer",
      color: "from-purple-400 to-purple-600"
    },
    {
      icon: LayoutGrid,
      title: "Full Business Automation Map",
      description: "Scale into marketing, finance, admin, and internal ops",
      color: "from-teal-400 to-teal-600"
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
            <span className="text-orange-400">What You'll Build</span> Inside This Book
          </h2>
          <p className="text-light/80 max-w-2xl mx-auto">
            150+ pages of actionable content, templates and step-by-step guides to build your automated business
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {systems.map((system, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-br from-purple-800/30 to-purple-950 p-6 rounded-xl border border-purple-400/20 shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${system.color} flex items-center justify-center mb-4 shadow-lg`}>
                <system.icon size={24} className="text-white" />
              </div>
              
              <div className="flex items-center mb-4">
                <div className={`h-5 w-5 mr-2 bg-purple-800 rounded-sm flex items-center justify-center`}>
                  <span className="text-xs text-white font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-heading text-orange-400">
                  {system.title}
                </h3>
              </div>
              
              <p className="text-light/70">
                {system.description}
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
        
        {/* Book preview pages */}
        <div className="mt-16">
          <h3 className="text-2xl md:text-3xl font-heading mb-8 text-center">
            <span className="text-orange-400">Preview</span> Book Pages
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Book Page 1 */}
            <div className="rounded-lg overflow-hidden border-2 border-purple-500/30 shadow-xl bg-gradient-to-br from-purple-800/50 to-purple-950/90">
              <img 
                src="/lovable-uploads/de4acb7d-a832-4753-9f70-d4e49ad7d5ce.png"
                alt="Real Scenarios page - Automation examples for different business types"
                className="w-full h-auto hover:scale-102 transition-transform"
              />
              <div className="p-4 bg-purple-900/50">
                <h4 className="text-xl font-heading text-orange-400">Real Scenarios For Your Business</h4>
                <p className="text-light/70 text-sm mt-1">
                  See exactly how these automations work for marketing, coaching, and SaaS businesses
                </p>
              </div>
            </div>
            
            {/* Book Page 2 */}
            <div className="rounded-lg overflow-hidden border-2 border-purple-500/30 shadow-xl bg-gradient-to-br from-purple-800/50 to-purple-950/90">
              <img 
                src="/lovable-uploads/a089f995-50b4-4e9c-884e-e4ab8b120b0b.png"
                alt="Technical setup page - Make.com automation flow example"
                className="w-full h-auto hover:scale-102 transition-transform"
              />
              <div className="p-4 bg-purple-900/50">
                <h4 className="text-xl font-heading text-orange-400">Complete Technical Setup</h4>
                <p className="text-light/70 text-sm mt-1">
                  Step-by-step guides to avoid common pitfalls and set up bulletproof systems
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-light/90 inline-block bg-purple-800/30 px-4 py-2 rounded-md border border-purple-400/20">
              <span className="font-bold text-orange-400">And much more</span> — including templates, troubleshooting guides, and advanced tactics!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookContentSection;
