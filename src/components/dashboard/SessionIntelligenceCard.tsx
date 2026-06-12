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
      className="bg-white border-3 border-black p-6 relative overflow-hidden group mt-8 brutalist-card-shadow text-black"
      whileHover={{ y: -2 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
            <Brain className="w-6 h-6 text-black" />
          </div>
          <div>
            <h3 className="text-2xl font-bold font-headline-lg uppercase tracking-wider">{sessionData.title}</h3>
            <p className="text-black font-bold font-label-md uppercase">Session Intelligence Report</p>
          </div>
        </div>
        <span className="px-3 py-1 bg-error text-black text-xs font-bold font-label-md border-2 border-black uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          {sessionData.difficulty}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6 mt-6">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-black font-bold font-headline-md uppercase tracking-wider">Practical Value</span>
            <span className="text-black font-bold font-headline-md">{sessionData.practicalValue}/100</span>
          </div>
          <ProgressBar
            value={sessionData.practicalValue}
            className="!h-4 [&_.k-selected]:!bg-primary [&_.k-progress-status]:!hidden !bg-gray-200 !border-3 !border-black !rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-black font-bold font-headline-md uppercase tracking-wider">Your Audience Fit</span>
            <span className="text-black font-bold font-headline-md">{sessionData.audienceFit}%</span>
          </div>
          <ProgressBar
            value={sessionData.audienceFit}
            className="!h-4 [&_.k-selected]:!bg-black [&_.k-progress-status]:!hidden !bg-gray-200 !border-3 !border-black !rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          />
        </div>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full py-3 flex items-center justify-center gap-2 text-black hover:text-white transition-colors bg-white hover:bg-black font-bold font-headline-md uppercase tracking-wider border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mt-8"
      >
        <span>{expanded ? 'Hide Analysis' : 'View AI Analysis'}</span>
        <motion.div animate={{ rotate: expanded ? 180 : 0 }}>
          <ChevronDown className="w-5 h-5" />
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
              <div className="bg-primary border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4">
                <h4 className="font-bold font-headline-md text-black mb-2 flex items-center gap-2 uppercase tracking-wider">
                  <TrendingUp className="w-5 h-5" /> AI Summary
                </h4>
                <p className="text-sm text-black font-body-md font-bold leading-relaxed">{sessionData.summary}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h4 className="font-bold font-headline-md text-black mb-3 uppercase tracking-wider">Key Takeaways</h4>
                  <ul className="space-y-2">
                    {sessionData.takeaways.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-black font-body-md font-bold">
                        <CheckCircle2 className="w-5 h-5 text-primary stroke-black stroke-2 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold font-headline-md text-black mb-3 uppercase tracking-wider">Prerequisites</h4>
                  <div className="flex flex-wrap gap-2">
                    {sessionData.prerequisites.map((req, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white text-black font-bold font-label-md border-2 border-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
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
