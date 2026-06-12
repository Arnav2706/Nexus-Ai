import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react';

const questions = [
  {
    id: 1,
    question: 'How does FSDP handle optimizer state sharding differently from ZeRO-3?',
    context: 'Based on your PyTorch background',
    tag: 'Technical Deep-Dive',
    tagColor: 'text-black bg-primary border-black',
  },
  {
    id: 2,
    question: 'What failure modes have you encountered with ring-all-reduce at 1000+ GPU scale?',
    context: 'Aligns with your distributed systems interest',
    tag: 'Practical Experience',
    tagColor: 'text-black bg-white border-black',
  },
  {
    id: 3,
    question: 'Are there plans to open-source the internal training stack you mentioned?',
    context: 'Matches your open source contributions',
    tag: 'Community',
    tagColor: 'text-white bg-black border-black',
  },
];

export const QuestionGenerator: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + questions.length) % questions.length);
  const next = () => setCurrent((c) => (c + 1) % questions.length);
  const q = questions[current];

  return (
    <div className="bg-white border-3 border-black p-6 mt-8 brutalist-card-shadow text-black rounded-none">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black">
          <Lightbulb className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold font-headline-lg uppercase tracking-wider">AI Question Generator</h3>
        <span className="ml-auto text-sm font-bold font-label-md bg-black text-white px-2 py-1">{current + 1} / {questions.length}</span>
      </div>

      <div className="relative overflow-hidden min-h-[180px]">
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
              <span className={`px-3 py-1 text-xs font-bold font-label-md border-2 uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] inline-block ${q.tagColor}`}>
                {q.tag}
              </span>
              <blockquote className="text-xl font-bold font-headline-md text-black leading-snug">
                "{q.question}"
              </blockquote>
              <p className="text-sm text-black font-bold font-body-md italic flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary stroke-black stroke-2" />
                {q.context}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-3 mt-6 pt-4 border-t-3 border-black">
        <button
          onClick={prev}
          className="p-2 bg-white hover:bg-black hover:text-white transition-colors border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-2 flex-1 justify-center">
          {questions.map((_, i) => (
            <motion.div
              key={i}
              animate={{ width: i === current ? 32 : 12, backgroundColor: i === current ? '#000' : '#ccc' }}
              className="h-3 border-2 border-black cursor-pointer rounded-none"
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="p-2 bg-white hover:bg-black hover:text-white transition-colors border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
