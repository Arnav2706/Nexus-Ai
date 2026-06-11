import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Cpu, ArrowRight, Sparkles, Brain, Calendar, Users, Network, BarChart3, Zap } from 'lucide-react';

const features = [
  { icon: Brain, title: 'AI Event Copilot', desc: 'Your personal AI agent that knows your goals, skills, and curates everything accordingly.', color: 'from-violet-500 to-purple-600' },
  { icon: Calendar, title: 'Smart Scheduler', desc: 'Drag-and-drop scheduling with AI conflict resolution and priority scoring.', color: 'from-blue-500 to-cyan-500' },
  { icon: Users, title: 'Networking Matchmaker', desc: 'Find the right people. 92% match scores with AI-powered compatibility analysis.', color: 'from-pink-500 to-rose-500' },
  { icon: Network, title: 'Knowledge Graph', desc: 'Explore the living map of connections between people, sessions, and ideas.', color: 'from-amber-500 to-orange-500' },
  { icon: BarChart3, title: 'Live Insight Feed', desc: 'Real-time event intelligence. Trending sessions, crowd heatmaps, and live feedback.', color: 'from-emerald-500 to-teal-500' },
  { icon: Zap, title: 'Memory Engine', desc: 'Post-event AI report. Everything you learned, everyone you met — beautifully summarized.', color: 'from-indigo-500 to-blue-600' },
];

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background overflow-x-hidden">
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-30%] left-[-15%] w-[70%] h-[70%] bg-violet-600/20 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-600/15 blur-[120px] rounded-full" />
        <div className="absolute top-[30%] right-[-20%] w-[50%] h-[50%] bg-fuchsia-600/10 blur-[100px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Nav */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 backdrop-blur-xl border-b border-white/5 bg-background/70"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)]">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Nexus<span className="text-primary">AI</span></span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400 hidden md:block">Hackathon 2026</span>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-sm font-bold shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-colors"
          >
            Launch App <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-8 backdrop-blur">
            <Sparkles className="w-4 h-4 text-accent" />
            Powered by Generative AI + Kendo UI
          </div>

          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter leading-none mb-6">
            <span className="text-white">Your AI</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-violet-400 to-accent bg-clip-text text-transparent">Conference</span>
            <br />
            <span className="text-white">Companion</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop drowning in conference information overload. Nexus AI is your personal intelligence agent —
            curating sessions, finding connections, and synthesizing knowledge in real time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(59,130,246,0.5)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-white text-lg font-bold shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all"
            >
              <Cpu className="w-5 h-5" />
              Enter Nexus AI
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl glass-card text-white text-lg font-medium border border-white/10 hover:bg-white/10 transition-all"
            >
              Watch Demo <span className="text-xl">▶</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Orbit rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[300, 500, 700].map((size, i) => (
            <motion.div
              key={size}
              className="absolute rounded-full border border-white/5"
              style={{ width: size, height: size }}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 20 + i * 10, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 text-sm"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1"
          >
            <div className="w-1 h-2 bg-white/40 rounded-full" />
          </motion.div>
          Scroll to explore
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-extrabold tracking-tight mb-4">
            15 Features. <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">One Platform.</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Every feature is designed to make your conference experience smarter, more connected, and unforgettable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass-panel rounded-3xl p-7 relative overflow-hidden group cursor-pointer"
            >
              <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${f.color} blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity`} />
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 shadow-lg`}>
                <f.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative z-10 py-32 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto glass-panel rounded-3xl p-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
          <div className="text-6xl mb-6">🚀</div>
          <h2 className="text-4xl font-extrabold mb-4">Ready to experience the future?</h2>
          <p className="text-gray-400 text-lg mb-8">Join 2,800+ attendees already using Nexus AI at this conference.</p>
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 0 50px rgba(139,92,246,0.5)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-primary to-accent text-white text-xl font-bold shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all"
          >
            <Cpu className="w-6 h-6" />
            Launch Nexus AI Now
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};
