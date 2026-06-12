import React from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, Zap } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
import { Avatar } from '@progress/kendo-react-layout';
import { ValuePredictor } from '../components/network/ValuePredictor';

const matches = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Founder at AI Startup',
    score: 92,
    reason: 'Both building AI products and interested in healthcare applications.',
    skills: ['React', 'Python', 'LLMs'],
    status: 'online'
  },
  {
    id: 2,
    name: 'David Miller',
    role: 'Staff Engineer',
    score: 85,
    reason: 'Shared interest in performance optimization and open source.',
    skills: ['Rust', 'WASM', 'Go'],
    status: 'offline'
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'Product Designer',
    score: 78,
    reason: 'Looking for technical co-founders in your exact stack.',
    skills: ['Figma', 'UI/UX', 'Framer'],
    status: 'online'
  }
];

export const NetworkPage: React.FC = () => {
  const { addToast } = useToast();
  const [connected, setConnected] = React.useState<Record<number, boolean>>({});

  const handleConnect = (id: number) => {
    addToast('Sending connection request...', 'info');
    setTimeout(() => {
      setConnected(prev => ({ ...prev, [id]: true }));
      addToast('Request sent successfully!', 'success');
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <header className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-white flex items-center justify-center border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Users className="w-6 h-6 text-black" />
        </div>
        <div>
          <h1 className="text-3xl font-bold font-headline-lg uppercase tracking-wider text-on-background">AI Networking Matchmaker</h1>
          <p className="text-primary font-bold font-label-md uppercase">Discover valuable connections powered by AI</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match, index) => {
          const isConnected = connected[match.id];
          return (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border-3 border-black brutalist-card-shadow p-6 relative overflow-hidden group rounded-none text-black transition-transform"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar type="image" className="!w-14 !h-14 !border-3 !border-black !rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <img src={`https://i.pravatar.cc/150?img=${match.id + 20}`} alt={match.name} />
                  </Avatar>
                  {match.status === 'online' && (
                    <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-primary border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-xl font-headline-md uppercase text-black">{match.name}</h3>
                  <p className="text-sm font-bold font-label-sm text-black uppercase bg-primary px-2 py-1 border-2 border-black inline-block mt-1">{match.role}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 mb-6 bg-gray-100 border-3 border-black p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <div className="w-16 h-16 border-3 border-black bg-white relative flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] shrink-0 overflow-hidden group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                {/* Brutalist Fill */}
                <div 
                  className="absolute bottom-0 left-0 w-full bg-primary border-t-3 border-black transition-all duration-1000"
                  style={{ height: `${match.score}%` }}
                />
                <span className="font-bold font-headline-md text-xl text-black z-10">{match.score}%</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-black" />
                  <span className="text-xs font-bold font-label-md text-black uppercase tracking-wider">AI Analysis</span>
                </div>
                <p className="text-sm text-black font-body-md font-bold leading-relaxed">{match.reason}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {match.skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-white border-2 border-black text-xs text-black font-bold font-label-sm uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    {skill}
                  </span>
                ))}
              </div>
              
              {isConnected ? (
                <button disabled className="w-full py-3 bg-black text-white border-3 border-black text-sm font-bold font-headline-md uppercase tracking-wider flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Request Sent
                </button>
              ) : (
                <button onClick={() => handleConnect(match.id)} className="w-full py-3 bg-white hover:bg-primary border-3 border-black text-black text-sm font-bold font-headline-md uppercase tracking-wider flex items-center justify-center gap-2 brutalist-card-shadow transition-colors">
                  <Briefcase className="w-5 h-5" /> Connect Now
                </button>
              )}
            </div>
          </motion.div>
        )})}
      </div>

      <ValuePredictor />
    </motion.div>
  );
};
