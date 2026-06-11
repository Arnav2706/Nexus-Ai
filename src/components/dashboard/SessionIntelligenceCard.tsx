import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, ChevronDown, CheckCircle2, TrendingUp } from 'lucide-react';
import { ProgressBar } from '@progress/kendo-react-progressbars';

const sessionData = {
  title: 'LLMs at Scale: Distributed Training',
  difficulty: 'Advanced',
  practicalValue: 95,
  audienceFit: 88,
  prerequisites: ['PyTorch basics', 'Distributed Systems'],
  takeaways: [
    'FSDP reduces VRAM usage by 40%',
    'Gradient accumulation strategies',
    'Network topology impact on all-reduce',
  ],
  summary:
    'A deep dive into training massive language models across thousands of GPUs, focusing on Fully Sharded Data Parallel (FSDP) and ring-all-reduce optimizations.',
};

export const SessionIntelligenceCard: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="glass-panel rounded-3xl p-6 relative overflow-hidden group mt-8"
      whileHover={{ y: -2 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
            <Brain className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold">{sessionData.title}</h3>
            <p className="text-gray-400 text-sm">Session Intelligence Report</p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/30 uppercase tracking-wide">
          {sessionData.difficulty}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-300">Practical Value</span>
            <span className="text-white font-bold">{sessionData.practicalValue}/100</span>
          </div>
          <ProgressBar
            value={sessionData.practicalValue}
            className="!h-2 [&_.k-selected]:!bg-emerald-500 [&_.k-progress-status]:!hidden !bg-white/10"
          />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-300">Your Audience Fit</span>
            <span className="text-white font-bold">{sessionData.audienceFit}%</span>
          </div>
          <ProgressBar
            value={sessionData.audienceFit}
            className="!h-2 [&_.k-selected]:!bg-blue-500 [&_.k-progress-status]:!hidden !bg-white/10"
          />
        </div>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full py-2 flex items-center justify-center gap-2 text-gray-400 hover:text-white transition-colors bg-white/5 rounded-xl border border-white/5"
      >
        <span>{expanded ? 'Hide Analysis' : 'View AI Analysis'}</span>
        <motion.div animate={{ rotate: expanded ? 180 : 0 }}>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-6 space-y-6">
              <div className="bg-primary/10 border border-primary/20 p-4 rounded-xl">
                <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> AI Summary
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed">{sessionData.summary}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-white mb-3 text-sm">Key Takeaways</h4>
                  <ul className="space-y-2">
                    {sessionData.takeaways.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-3 text-sm">Prerequisites</h4>
                  <div className="flex flex-wrap gap-2">
                    {sessionData.prerequisites.map((req, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-white/10 text-xs text-gray-300 border border-white/5"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
