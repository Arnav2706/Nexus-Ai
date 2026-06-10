import React from 'react';
import { motion } from 'framer-motion';
import { Ghost, Shuffle, Lightbulb, Rocket, FlaskConical } from 'lucide-react';

const wowCards = [
  {
    id: 1,
    icon: Ghost,
    title: 'AI Twin',
    subtitle: 'Missing a session? Your digital twin attends for you.',
    description: 'Your AI clone attends sessions you can\'t make it to — generating notes, summaries, and actionable follow-ups.',
    color: 'from-indigo-500 to-violet-600',
    glow: 'shadow-[0_0_40px_rgba(99,102,241,0.3)]',
    badge: 'Experimental',
    badgeColor: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    status: 'LIVE',
  },
  {
    id: 2,
    icon: Shuffle,
    title: 'Serendipity Engine',
    subtitle: 'Discover the unexpected connection you never knew you needed.',
    description: 'Hidden opportunities surface through our probabilistic graph traversal — find the speaker you never planned to meet.',
    color: 'from-fuchsia-500 to-pink-600',
    glow: 'shadow-[0_0_40px_rgba(217,70,239,0.3)]',
    badge: 'AI Powered',
    badgeColor: 'bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30',
    status: 'LIVE',
  },
  {
    id: 3,
    icon: Rocket,
    title: 'Startup Finder',
    subtitle: 'Connect founders with investors through AI matchmaking.',
    description: 'Founders get matched with investors based on stage, sector, and thesis alignment. Deals happen here.',
    color: 'from-amber-500 to-orange-600',
    glow: 'shadow-[0_0_40px_rgba(245,158,11,0.3)]',
    badge: 'Beta',
    badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    status: 'BETA',
  },
  {
    id: 4,
    icon: FlaskConical,
    title: 'Research Matchmaker',
    subtitle: 'Find researchers working on exactly your problem.',
    description: 'Semantic embeddings cluster researchers by topic. Discover colleagues working on the same challenges.',
    color: 'from-emerald-500 to-teal-600',
    glow: 'shadow-[0_0_40px_rgba(16,185,129,0.3)]',
    badge: 'New',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    status: 'NEW',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.3 } }
};

export const WowFeatures: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <header className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-fuchsia-500/20 flex items-center justify-center border border-fuchsia-500/30">
          <Lightbulb className="w-6 h-6 text-fuchsia-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Special WOW Features</h1>
          <p className="text-gray-400">Experimental AI capabilities that redefine what's possible</p>
        </div>
      </header>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {wowCards.map((card) => (
          <motion.div
            key={card.id}
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            className={`glass-panel rounded-3xl p-8 relative overflow-hidden group cursor-pointer ${card.glow} hover:shadow-none transition-all duration-500`}
          >
            {/* Background gradient blob */}
            <div className={`absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-br ${card.color} blur-[80px] opacity-20 group-hover:opacity-35 transition-opacity duration-500`} />

            {/* Status badge */}
            <div className="flex items-center justify-between mb-6">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${card.badgeColor}`}>
                {card.badge}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                {card.status}
              </span>
            </div>

            {/* Icon */}
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <card.icon className="w-7 h-7 text-white" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-white transition-colors">
              {card.title}
            </h3>
            <p className="text-base font-medium text-gray-300 mb-4 leading-snug">
              {card.subtitle}
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              {card.description}
            </p>

            {/* Hover arrow */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="absolute bottom-8 right-8 text-white/40 group-hover:text-white/80 transition-colors"
            >
              →
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};
