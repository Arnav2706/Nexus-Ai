import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Orb {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

const orbs: Orb[] = [
  { id: 1, x: 10, y: 20, size: 600, color: 'rgba(99,102,241,0.12)', duration: 18, delay: 0 },
  { id: 2, x: 70, y: 60, size: 500, color: 'rgba(59,130,246,0.10)', duration: 22, delay: 3 },
  { id: 3, x: 40, y: 80, size: 400, color: 'rgba(139,92,246,0.08)', duration: 15, delay: 6 },
];

export const GlowingBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            transform: 'translate(-50%, -50%)',
            filter: 'blur(1px)',
          }}
          animate={{
            x: [0, 40, -30, 20, 0],
            y: [0, -30, 40, -20, 0],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,10,15,0.6) 100%)',
        }}
      />
    </div>
  );
};
