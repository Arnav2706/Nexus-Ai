import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { Sparkles, ArrowRight, BrainCircuit } from 'lucide-react';

const DEFAULT_RECOMMENDATIONS = [
  {
    id: 1,
    title: 'Generative AI in Production',
    type: 'Workshop',
    time: '10:00 AM - 12:00 PM',
    reason: "You're interested in Generative AI and startups.",
    tags: ['AI', 'Engineering'],
    match: 98,
  },
  {
    id: 2,
    title: 'Future of Developer Tools',
    type: 'Keynote',
    time: '1:00 PM - 2:00 PM',
    reason: "Aligns with your current project 'Nexus AI'.",
    tags: ['DevTools', 'Future'],
    match: 92,
  }
];

export const AICopilot: React.FC = () => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = React.useState(DEFAULT_RECOMMENDATIONS);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      // Simulate connection to ML backend before falling back to local recommendations
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-none bg-primary flex items-center justify-center border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <BrainCircuit className="w-6 h-6 text-black" />
        </div>
        <div>
          <h2 className="text-2xl font-bold font-headline-lg uppercase text-on-background tracking-wider">
            AI Event Copilot {isLoading && <span className="text-sm ml-2 animate-pulse">(Connecting to ML Backend...)</span>}
          </h2>
          <p className="text-primary font-bold font-body-md uppercase">Your personalized conference recommendations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {recommendations.map((rec, index) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group bg-white border-3 border-black brutalist-card-shadow p-6 relative overflow-hidden text-black transition-transform"
          >
            <div className="absolute top-4 right-4">
              <div className="w-12 h-12 rounded-none border-3 border-black bg-primary flex items-center justify-center text-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-headline-md">
                {rec.match}%
              </div>
            </div>

            <h3 className="text-xl font-bold mb-1 font-headline-md uppercase tracking-wider pr-14">
              {rec.title}
            </h3>
            <div className="text-black font-bold text-sm flex items-center gap-2 mb-4 font-label-md uppercase tracking-wider">
              <span className="bg-black text-white px-2 py-1">{rec.type}</span>
              <span>•</span>
              <span>{rec.time}</span>
            </div>

            <div className="flex items-start gap-3 bg-gray-100 p-4 rounded-none border-3 border-black mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Sparkles className="w-5 h-5 text-black shrink-0 mt-0.5" />
              <p className="text-sm text-black font-bold italic font-body-md">"{rec.reason}"</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {rec.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-white text-black border-2 border-black rounded-none font-bold font-label-sm uppercase">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t-3 border-black">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 border-2 border-black rounded-none overflow-hidden relative">
                    <img src={`https://i.pravatar.cc/150?img=${i + index * 10}`} alt="attendee" className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-8 h-8 rounded-none bg-primary border-2 border-black flex items-center justify-center text-xs font-bold text-black z-10">
                  +42
                </div>
              </div>

              <button onClick={() => navigate('/schedule')} className="flex items-center gap-2 text-black font-bold font-headline-md uppercase tracking-wider hover:text-primary hover:bg-black px-3 py-1 border-3 border-transparent hover:border-black transition-colors text-sm">
                Add to Schedule <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Copilot Chat Interface */}
      <div className="mt-8 bg-white border-3 border-black brutalist-card-shadow p-6">
        <div className="flex items-center gap-3 mb-4 pb-4 border-b-3 border-black">
          <Sparkles className="w-5 h-5 text-black" />
          <h3 className="text-xl font-bold font-headline-md uppercase tracking-wider text-black">Ask Copilot</h3>
        </div>
        
        <div className="space-y-4 mb-4">
          <div className="bg-gray-100 p-4 border-2 border-black inline-block max-w-[80%]">
            <p className="text-sm font-bold text-black font-body-md">Based on your schedule, you have a free block from 2:00 PM to 3:30 PM. Would you like me to suggest some networking opportunities or quick sessions?</p>
          </div>
        </div>

        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {["Find similar attendees", "Summarize Keynote", "Suggest next session"].map(suggestion => (
            <button key={suggestion} className="px-3 py-1.5 bg-white border-2 border-black text-xs font-bold uppercase whitespace-nowrap hover:bg-[#a9f131] transition-colors">
              {suggestion}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input type="text" placeholder="Type your request here..." className="flex-1 bg-white border-3 border-black p-3 font-bold font-body-md outline-none focus:ring-2 focus:ring-[#a9f131]" />
          <button className="bg-black text-white p-3 border-3 border-black hover:bg-[#a9f131] hover:text-black transition-colors flex items-center justify-center">
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
