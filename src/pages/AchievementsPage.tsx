import React from 'react';
import { motion } from 'framer-motion';
import { Star, Trophy, Award, Zap, Users, BookOpen } from 'lucide-react';

const badges = [
  { id: 1, icon: Star, name: 'Early Bird', desc: 'Checked in on Day 1', earned: true, color: 'bg-primary' },
  { id: 2, icon: Users, name: 'Connector', desc: 'Met 5+ matches', earned: true, color: 'bg-[#00ffff]' },
  { id: 3, icon: BookOpen, name: 'Knowledge Seeker', desc: 'Attended 10 sessions', earned: false, color: 'bg-[#a020f0]', progress: 70 },
  { id: 4, icon: Zap, name: 'Speed Networker', desc: 'Sent 20 connection requests', earned: false, color: 'bg-[#ff00ff]', progress: 45 },
  { id: 5, icon: Trophy, name: 'Top Contributor', desc: 'Left 15+ session reviews', earned: false, color: 'bg-primary', progress: 20 },
  { id: 6, icon: Award, name: 'VIP Access', desc: 'Attended a private workshop', earned: true, color: 'bg-[#ff00ff]' },
];

export const AchievementsPage: React.FC = () => {
  const earned = badges.filter(b => b.earned).length;
  const total = badges.length;
  const overallProgress = Math.round((earned / total) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <header className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-white flex items-center justify-center border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Trophy className="w-6 h-6 text-black" />
        </div>
        <div>
          <h1 className="text-3xl font-bold font-headline-lg uppercase tracking-wider text-on-background">Achievements</h1>
          <p className="text-primary font-bold font-label-md uppercase">Track your conference milestones and badges</p>
        </div>
      </header>

      {/* Overall progress */}
      <div className="bg-white border-3 border-black brutalist-card-shadow rounded-none p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="w-32 h-32 shrink-0 border-3 border-black bg-gray-100 flex flex-col items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
          <div 
            className="absolute bottom-0 left-0 w-full bg-primary border-t-3 border-black transition-all duration-1000"
            style={{ height: `${overallProgress}%` }}
          />
          <div className="relative z-10 flex flex-col items-center justify-center bg-white border-3 border-black px-4 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-3xl font-extrabold font-headline-lg text-black">{earned}</span>
            <span className="text-xs font-bold font-label-md text-black uppercase">/ {total}</span>
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold font-headline-lg uppercase tracking-wider mb-2 text-black">Your Progress</h2>
          <p className="text-black font-bold font-body-md bg-primary inline-block px-2 py-1 border-2 border-black mb-6">You've earned {earned} out of {total} available badges. Keep going!</p>
          
          <div className="w-full h-8 border-3 border-black bg-gray-100 relative mb-2 p-1">
            <div className="h-full bg-black" style={{ width: `${overallProgress}%` }} />
            <span className="absolute inset-0 flex items-center justify-center font-bold font-headline-md text-sm text-white mix-blend-difference z-10">{overallProgress}% Complete</span>
          </div>
        </div>
      </div>

      {/* Badges grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {badges.map((badge, i) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.07 }}
            className={`bg-white border-3 border-black brutalist-card-shadow rounded-none p-6 relative overflow-hidden group hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all ${!badge.earned ? 'opacity-60 grayscale' : ''}`}
          >
            {badge.earned && (
              <div className="absolute top-4 right-4 z-10 bg-white border-2 border-black w-8 h-8 flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.5 }}
                >
                  ✅
                </motion.div>
              </div>
            )}
            <div className={`w-16 h-16 border-3 border-black ${badge.color} flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform`}>
              <badge.icon className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-xl font-bold font-headline-lg uppercase text-black mb-2 tracking-wider">{badge.name}</h3>
            <p className="text-sm font-bold font-body-md text-gray-900 mb-4">{badge.desc}</p>
            
            {!badge.earned && badge.progress !== undefined && (
              <div>
                <div className="flex justify-between text-xs font-bold font-label-md uppercase text-black mb-2">
                  <span>Progress</span>
                  <span>{badge.progress}%</span>
                </div>
                <div className="w-full h-4 border-2 border-black bg-gray-100 relative p-0.5">
                  <div className={`h-full ${badge.color} border-r-2 border-black`} style={{ width: `${badge.progress}%` }} />
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
