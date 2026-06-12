import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, CheckCircle2 } from 'lucide-react';
import { AICopilot } from '../components/dashboard/AICopilot';
import { SpeakerExplorer } from '../components/dashboard/SpeakerExplorer';
import { SessionIntelligenceCard } from '../components/dashboard/SessionIntelligenceCard';
import { QuestionGenerator } from '../components/dashboard/QuestionGenerator';
import { useToast } from '../contexts/ToastContext';
import { Modal } from '../components/ui/Modal';

export const Dashboard: React.FC = () => {
  const { addToast } = useToast();
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAISummary = () => {
    setIsSummaryOpen(true);
    setIsGenerating(true);
    // Simulate AI generation time
    setTimeout(() => {
      setIsGenerating(false);
      addToast('AI Summary generated successfully!', 'success');
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Welcome to Nexus</h1>
          <p className="text-gray-400">Your personal AI copilot for the conference.</p>
        </div>
        <motion.button
          onClick={handleAISummary}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="glass-card px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-white/10"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          AI Summary
        </motion.button>
      </header>

      <Modal 
        isOpen={isSummaryOpen} 
        onClose={() => setIsSummaryOpen(false)}
        title={<><Brain className="w-6 h-6 text-primary" /> Personalized AI Event Summary</>}
      >
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
            <p className="text-gray-400 animate-pulse">Analyzing your schedule, interactions, and interests...</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
              <h3 className="font-bold text-primary mb-2">Executive Overview</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Based on your deep interest in <strong>Generative AI</strong> and <strong>System Architecture</strong>, you've had a highly productive conference. You attended 4 keynote sessions and connected with 3 principal engineers. Your alignment with the emerging "WASM + AI" trend is very strong.
              </p>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Key Takeaways
              </h3>
              <ul className="space-y-2 text-sm text-gray-300 ml-6 list-disc">
                <li><strong>Dr. Evelyn Sato</strong> revealed that their new scaling laws will require a fundamental shift in how we approach edge computing.</li>
                <li>Your conversation with <strong>Alex Chen</strong> highlighted a mutual interest in Rust-based inference engines. Consider following up!</li>
                <li>The "Design Systems Panel" confirmed that adopting headless components is the industry standard for 2026.</li>
              </ul>
            </div>
            
            <button 
              onClick={() => setIsSummaryOpen(false)}
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors font-medium text-sm mt-4"
            >
              Close Summary
            </button>
          </div>
        )}
      </Modal>

      <div className="mt-12">
        <AICopilot />
        <SpeakerExplorer />
        <SessionIntelligenceCard />
        <QuestionGenerator />
      </div>
    </div>
  );
};
