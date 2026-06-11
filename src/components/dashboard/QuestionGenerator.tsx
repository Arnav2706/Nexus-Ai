import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react';

const questions = [
  {
    id: 1,
    question: 'How does FSDP handle optimizer state sharding differently from ZeRO-3?',
    context: 'Based on your PyTorch background',
    tag: 'Technical Deep-Dive',
    tagColor: 'text-blue-400 bg-blue-500/20 border-blue-500/30',
  },
  {
    id: 2,
    question: 'What failure modes have you encountered with ring-all-reduce at 1000+ GPU scale?',
    context: 'Aligns with your distributed systems interest',
    tag: 'Practical Experience',
    tagColor: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30',
  },
  {
    id: 3,
    question: 'Are there plans to open-source the internal training stack you mentioned?',
    context: 'Matches your open source contributions',
    tag: 'Community',
    tagColor: 'text-amber-400 bg-amber-500/20 border-amber-500/30',
  },
];

export const QuestionGenerator: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + questions.length) % questions.length);
  const next = () => setCurrent((c) => (c + 1) % questions.length);
  const q = questions[current];

  return (
    <div className="glass-panel rounded-3xl p-6 mt-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-amber-500/20 rounded-lg border border-amber-500/30">
          <Lightbulb className="w-5 h-5 text-amber-400" />
        </div>
        <h3 className="text-xl font-bold">AI Question Generator</h3>
        <span className="ml-auto text-xs text-gray-500">{current + 1} / {questions.length}</span>
      </div>

      <div className="relative overflow-hidden min-h-[160px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${q.tagColor}`}>
                {q.tag}
              </span>
              <blockquote className="text-xl font-semibold text-white leading-snug">
                "{q.question}"
              </blockquote>
              <p className="text-sm text-gray-400 italic flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                {q.context}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/10">
        <button
          onClick={prev}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-1.5 flex-1 justify-center">
          {questions.map((_, i) => (
            <motion.div
              key={i}
              animate={{ width: i === current ? 24 : 8, opacity: i === current ? 1 : 0.3 }}
              className="h-2 rounded-full bg-amber-400 cursor-pointer"
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
