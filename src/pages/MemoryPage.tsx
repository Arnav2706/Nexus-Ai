import React from 'react';
import { motion } from 'framer-motion';
import { Download, Award, Clock, Users, Zap } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

export const MemoryPage: React.FC = () => {
  const { addToast } = useToast();

  const exportPDFWithComponent = () => {
    window.print();
    addToast('Printing to PDF...', 'success');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white flex items-center justify-center border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Zap className="w-6 h-6 text-black" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-headline-lg uppercase tracking-wider text-black">Post-Event Memory Engine</h1>
            <p className="text-primary font-bold font-label-md uppercase bg-black px-2 py-0.5 inline-block border-2 border-black">Your personalized knowledge report</p>
          </div>
        </div>
        <button 
          onClick={exportPDFWithComponent}
          className="flex items-center gap-2 bg-white text-black border-3 border-black px-4 py-2 font-bold uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          <Download className="w-4 h-4" />
          Export to PDF
        </button>
      </header>

      <div className="bg-white border-3 border-black brutalist-card-shadow rounded-none p-8 space-y-12 min-h-[800px] text-black">
          
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black font-headline-lg uppercase tracking-widest text-black">
              Event Recap
            </h2>
            <p className="text-black font-bold font-body-md max-w-2xl mx-auto border-y-3 border-black py-4">
              You had an incredible time at Nexus AI 2026. Here is your personalized summary of the people you met, the sessions you attended, and the insights you gathered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#00ffff] border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 text-center space-y-2">
              <Clock className="w-8 h-8 text-black mx-auto mb-4" />
              <div className="text-4xl font-black font-headline-lg">12</div>
              <div className="text-black font-bold font-label-md uppercase tracking-wider">Sessions Attended</div>
            </div>
            <div className="bg-[#ff00ff] border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 text-center space-y-2">
              <Users className="w-8 h-8 text-black mx-auto mb-4" />
              <div className="text-4xl font-black font-headline-lg">8</div>
              <div className="text-black font-bold font-label-md uppercase tracking-wider">Meaningful Connections</div>
            </div>
            <div className="bg-[#a9f131] border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 text-center space-y-2">
              <Award className="w-8 h-8 text-black mx-auto mb-4" />
              <div className="text-4xl font-black font-headline-lg">3</div>
              <div className="text-black font-bold font-label-md uppercase tracking-wider">Badges Earned</div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold font-headline-lg uppercase flex items-center gap-2 border-b-3 border-black pb-4 text-black">
              Key Takeaways
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 bg-white border-3 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <span className="w-3 h-3 border-2 border-black bg-primary mt-1.5 shrink-0" />
                <p className="text-black font-bold font-body-md leading-relaxed">Generative AI models are moving towards edge computing. Consider exploring WebGPU integration for the upcoming mobile project.</p>
              </li>
              <li className="flex items-start gap-3 bg-white border-3 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <span className="w-3 h-3 border-2 border-black bg-accent mt-1.5 shrink-0" />
                <p className="text-black font-bold font-body-md leading-relaxed">Met Sarah Chen (92% Match). Follow up regarding the potential healthcare application collaboration next week.</p>
              </li>
              <li className="flex items-start gap-3 bg-white border-3 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <span className="w-3 h-3 border-2 border-black bg-error mt-1.5 shrink-0" />
                <p className="text-black font-bold font-body-md leading-relaxed">Design Systems talk highlighted the importance of primitive tokens. Need to refactor our current UI library.</p>
              </li>
            </ul>
          </div>

        </div>
    </motion.div>
  );
};
