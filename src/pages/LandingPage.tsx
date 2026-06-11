import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GlowingBackground } from '../components/layout/GlowingBackground';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-white font-sans overflow-x-hidden selection:bg-primary selection:text-white">
      <GlowingBackground />
      
      {/* Brutalist Navbar */}
      <nav className="relative z-10 w-full px-8 py-6 flex items-center justify-between mix-blend-difference">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white flex items-center justify-center text-black font-black text-xl tracking-tighter">
            NX
          </div>
        </div>
        <button className="px-6 py-2 border border-white/20 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors flex items-center gap-4">
          MENU <span className="w-4 h-0.5 bg-current" />
        </button>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col justify-center px-8 md:px-16 lg:px-24 min-h-[85vh] max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="label-mono mb-8 flex items-center gap-4">
            CONFERENCE INTELLIGENCE <span className="text-primary">/</span> AI COMPANION
          </p>
          
          <h1 className="heading-hero mb-8 max-w-5xl text-white">
            We Build Conferences<br />for the Future.
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl font-light mb-12 leading-relaxed">
            Nexus AI engineers production-grade attendee experiences at the frontier of artificial intelligence, real-time networking, and spatial computing.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/" className="btn-outline">
              Explore Platform &rarr;
            </Link>
            <Link to="/wow" className="btn-primary">
              <span className="text-white/70">*</span> Launch AI Twin
            </Link>
          </div>
        </motion.div>
      </main>
      
      {/* Sections Divider */}
      <div className="relative z-10 w-full h-px bg-white/10 my-24" />
      
      {/* What We Deliver Section */}
      <section className="relative z-10 px-8 md:px-16 lg:px-24 pb-32">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/4">
            <h2 className="label-mono text-gray-400">What We Deliver</h2>
          </div>
          <div className="lg:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { title: 'Neural Networking', desc: 'Predictive matchmaking algorithms that connect you with high-value prospects before you even scan the room.' },
              { title: 'Spatial Intelligence', desc: 'Real-time heatmaps and dynamic routing through complex venue topologies.' },
              { title: 'Continuous Learning', desc: 'Post-event memory engines that transform fleeting conversations into permanent knowledge graphs.' },
              { title: 'Autonomous Agents', desc: 'Personal AI twins that attend sessions on your behalf and generate executive summaries.' }
            ].map((item, i) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="h-px w-full bg-[#222] mb-6 group-hover:bg-primary transition-colors duration-500" />
                <h3 className="text-2xl font-bold tracking-tight mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
