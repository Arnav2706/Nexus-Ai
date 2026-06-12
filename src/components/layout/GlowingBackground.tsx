import React from 'react';
import { motion } from 'framer-motion';

export const GlowingBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#0a0a0a]">
      {/* Massive Lime Gradient */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '120vw',
          height: '120vw',
          background: 'radial-gradient(circle, rgba(200, 241, 53, 0.12) 0%, transparent 60%)',
          left: '-20%',
          top: '-10%',
          filter: 'blur(100px)',
          mixBlendMode: 'screen'
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Massive Cyan Gradient */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '100vw',
          height: '100vw',
          background: 'radial-gradient(circle, rgba(126, 255, 212, 0.1) 0%, transparent 60%)',
          right: '-20%',
          bottom: '-20%',
          filter: 'blur(100px)',
          mixBlendMode: 'screen'
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};
