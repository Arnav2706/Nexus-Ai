import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody } from '@progress/kendo-react-layout';
import { Avatar } from '@progress/kendo-react-layout';
import { Chip } from '@progress/kendo-react-buttons';
import { Sparkles, ArrowRight, BrainCircuit } from 'lucide-react';

const recommendations = [
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
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30">
          <BrainCircuit className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">AI Event Copilot</h2>
          <p className="text-primary/80 font-medium">Your personalized conference recommendations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {recommendations.map((rec, index) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group glass-panel rounded-2xl p-6 relative overflow-hidden"
          >
            <div className="absolute top-4 right-4">
              <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center text-primary font-bold shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                {rec.match}%
              </div>
            </div>

            <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors pr-14">
              {rec.title}
            </h3>
            <div className="text-gray-400 text-sm flex items-center gap-2 mb-4">
              <span className="text-accent">{rec.type}</span>
              <span>•</span>
              <span>{rec.time}</span>
            </div>

            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/5 mb-4">
              <Sparkles className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <p className="text-sm text-gray-300 italic">"{rec.reason}"</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {rec.tags.map(tag => (
                <Chip key={tag} text={tag} className="!bg-white/5 !text-gray-300 !border-white/10" />
              ))}
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-white/5">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <Avatar
                    key={i}
                    type="image"
                    className="!w-8 !h-8 border-2 border-surface"
                  >
                    <img src={`https://i.pravatar.cc/150?img=${i + index * 10}`} alt="attendee" />
                  </Avatar>
                ))}
                <div className="w-8 h-8 rounded-full bg-white/10 border-2 border-surface flex items-center justify-center text-xs text-white z-10">
                  +42
                </div>
              </div>

              <button className="flex items-center gap-2 text-primary font-medium hover:text-white transition-colors text-sm">
                Add to Schedule <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
