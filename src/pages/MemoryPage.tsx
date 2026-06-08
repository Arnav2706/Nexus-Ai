import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Award, Clock, Users, Zap } from 'lucide-react';
import { PDFExport } from '@progress/kendo-react-pdf';

export const MemoryPage: React.FC = () => {
  const pdfExportComponent = useRef<PDFExport>(null);

  const exportPDFWithComponent = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
            <Zap className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Post-Event Memory Engine</h1>
            <p className="text-gray-400">Your personalized knowledge report</p>
          </div>
        </div>
        <button 
          onClick={exportPDFWithComponent}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-medium transition-colors shadow-[0_0_15px_rgba(99,102,241,0.4)]"
        >
          <Download className="w-4 h-4" />
          Export to PDF
        </button>
      </header>

      <PDFExport ref={pdfExportComponent} margin="2cm" fileName="NexusAI-Memory-Report.pdf" paperSize="A4">
        <div className="glass-panel rounded-3xl p-8 space-y-12 min-h-[800px] text-white">
          
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Event Recap
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              You had an incredible time at Nexus AI 2026. Here is your personalized summary of the people you met, the sessions you attended, and the insights you gathered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 text-center space-y-2">
              <Clock className="w-8 h-8 text-indigo-400 mx-auto mb-4" />
              <div className="text-3xl font-bold">12</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Sessions Attended</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 text-center space-y-2">
              <Users className="w-8 h-8 text-fuchsia-400 mx-auto mb-4" />
              <div className="text-3xl font-bold">8</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Meaningful Connections</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 text-center space-y-2">
              <Award className="w-8 h-8 text-amber-400 mx-auto mb-4" />
              <div className="text-3xl font-bold">3</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Badges Earned</div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold flex items-center gap-2 border-b border-white/10 pb-4">
              Key Takeaways
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 bg-white/5 p-4 rounded-xl">
                <span className="w-2 h-2 rounded-full bg-indigo-500 mt-2 shrink-0" />
                <p className="text-gray-200 leading-relaxed">Generative AI models are moving towards edge computing. Consider exploring WebGPU integration for the upcoming mobile project.</p>
              </li>
              <li className="flex items-start gap-3 bg-white/5 p-4 rounded-xl">
                <span className="w-2 h-2 rounded-full bg-purple-500 mt-2 shrink-0" />
                <p className="text-gray-200 leading-relaxed">Met Sarah Chen (92% Match). Follow up regarding the potential healthcare application collaboration next week.</p>
              </li>
              <li className="flex items-start gap-3 bg-white/5 p-4 rounded-xl">
                <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                <p className="text-gray-200 leading-relaxed">Design Systems talk highlighted the importance of primitive tokens. Need to refactor our current UI library.</p>
              </li>
            </ul>
          </div>

        </div>
      </PDFExport>
    </motion.div>
  );
};
