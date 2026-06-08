import React from 'react';
import { motion } from 'framer-motion';

export const GlowingBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full mix-blend-screen" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-accent/20 blur-[150px] rounded-full mix-blend-screen" />
      
      {/* Particles/Stars effect */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"
      />
    </div>
  );
};
