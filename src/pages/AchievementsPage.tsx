import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Trophy, Award, Medal, Zap, Users, BookOpen } from 'lucide-react';
import { ProgressBar } from '@progress/kendo-react-progressbars';

const badges = [
  { id: 1, icon: Star, name: 'Early Bird', desc: 'Checked in on Day 1', earned: true, color: 'from-amber-400 to-orange-500' },
  { id: 2, icon: Users, name: 'Connector', desc: 'Met 5+ matches', earned: true, color: 'from-blue-400 to-cyan-500' },
  { id: 3, icon: BookOpen, name: 'Knowledge Seeker', desc: 'Attended 10 sessions', earned: false, color: 'from-purple-400 to-violet-500', progress: 70 },
  { id: 4, icon: Zap, name: 'Speed Networker', desc: 'Sent 20 connection requests', earned: false, color: 'from-pink-400 to-rose-500', progress: 45 },
  { id: 5, icon: Trophy, name: 'Top Contributor', desc: 'Left 15+ session reviews', earned: false, color: 'from-green-400 to-emerald-500', progress: 20 },
  { id: 6, icon: Award, name: 'VIP Access', desc: 'Attended a private workshop', earned: true, color: 'from-red-400 to-rose-600' },
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
        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
          <Trophy className="w-6 h-6 text-amber-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Achievements</h1>
          <p className="text-gray-400">Track your conference milestones and badges</p>
        </div>
      </header>

      {/* Overall progress */}
      <div className="glass-panel rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="relative w-32 h-32 shrink-0">
          <svg className="w-32 h-32 -rotate-90" viewBox="0 0 128 128">
            <circle cx="64" cy="64" r="54" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
            <motion.circle
              cx="64" cy="64" r="54" fill="none"
              stroke="url(#achieveGrad)" strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 54}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 54 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 54 * (1 - overallProgress / 100) }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id="achieveGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-extrabold text-amber-400">{earned}</span>
            <span className="text-xs text-gray-500">/ {total}</span>
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-1">Your Progress</h2>
          <p className="text-gray-400 mb-4">You've earned {earned} out of {total} available badges. Keep going!</p>
          <ProgressBar
            value={overallProgress}
            className="!h-3 [&_.k-selected]:!bg-gradient-to-r [&_.k-selected]:!from-amber-400 [&_.k-selected]:!to-orange-500 [&_.k-progress-status]:!hidden !bg-white/10 !rounded-full"
          />
          <p className="text-amber-400 font-bold mt-2">{overallProgress}% Complete</p>
        </div>
      </div>

      {/* Badges grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {badges.map((badge, i) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.07, type: 'spring', stiffness: 200 }}
            whileHover={{ y: -5 }}
            className={`glass-panel rounded-2xl p-6 relative overflow-hidden ${!badge.earned ? 'opacity-60' : ''}`}
          >
            {badge.earned && (
              <div className="absolute top-3 right-3">
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.5 }}
                >
                  ✅
                </motion.div>
              </div>
            )}
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${badge.color} flex items-center justify-center mb-4 shadow-lg`}>
              <badge.icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-bold mb-1">{badge.name}</h3>
            <p className="text-sm text-gray-400 mb-3">{badge.desc}</p>
            {!badge.earned && badge.progress !== undefined && (
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{badge.progress}%</span>
                </div>
                <ProgressBar
                  value={badge.progress}
                  className="!h-1.5 [&_.k-selected]:!bg-white/50 [&_.k-progress-status]:!hidden !bg-white/10 !rounded-full"
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
