import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { AICopilot } from '../components/dashboard/AICopilot';
import { SpeakerExplorer } from '../components/dashboard/SpeakerExplorer';
import { SessionIntelligenceCard } from '../components/dashboard/SessionIntelligenceCard';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Welcome to Nexus</h1>
          <p className="text-gray-400">Your personal AI copilot for the conference.</p>
        </div>
        <button className="glass-card px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-white/10">
          <Sparkles className="w-4 h-4 text-primary" />
          AI Summary
        </button>
      </header>

      <div className="mt-12">
        <AICopilot />
        <SpeakerExplorer />
        <SessionIntelligenceCard />
      </div>
    </div>
  );
};
