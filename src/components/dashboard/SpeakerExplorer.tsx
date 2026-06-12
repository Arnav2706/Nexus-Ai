import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, Star, PlayCircle, MessageSquare, Copy, CheckCircle2, Calendar } from 'lucide-react';
import { Chart, ChartSeries, ChartSeriesItem, ChartCategoryAxis, ChartCategoryAxisItem } from '@progress/kendo-react-charts';
import { useToast } from '../../contexts/ToastContext';
import { Modal } from '../ui/Modal';

const speakerData = {
  name: 'Dr. Evelyn Sato',
  role: 'VP of AI Research, OpenAI',
  expertise: [
    { category: 'LLMs', value: 95 },
    { category: 'Ethics', value: 85 },
    { category: 'Scaling', value: 90 },
    { category: 'Vision', value: 75 },
    { category: 'Startups', value: 80 }
  ]
};

const pastTalks = [
  { title: "The Future of Multimodal LLMs", date: "Oct 2025", event: "AI Summit Global", views: "1.2M" },
  { title: "Scaling Laws & Ethical Boundaries", date: "Jun 2025", event: "NeurIPS", views: "850K" },
  { title: "Agentic Workflows in Production", date: "Mar 2025", event: "DevDay", views: "2.1M" }
];

const generatedQuestions = [
  "How do you see agentic AI altering the landscape of traditional software engineering over the next 2 years?",
  "Given your research on scaling laws, are we hitting a ceiling with current transformer architectures?",
  "What is your stance on the open-source vs. closed-weight models debate in terms of security?"
];

export const SpeakerExplorer: React.FC = () => {
  const { addToast } = useToast();
  const [isTalksOpen, setIsTalksOpen] = useState(false);
  const [isQuestionsOpen, setIsQuestionsOpen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    addToast('Question copied to clipboard!', 'success');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-8"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
          <Mic className="w-5 h-5 text-orange-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight">AI Speaker Explorer</h2>
          <p className="text-gray-400 text-sm">Deep dive into speaker expertise</p>
        </div>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-8 p-6">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-4">
              <img src="https://i.pravatar.cc/150?img=32" alt="Speaker" className="w-20 h-20 rounded-full border-2 border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.3)]" />
              <div>
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  {speakerData.name} <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                </h3>
                <p className="text-orange-400 font-medium">{speakerData.role}</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm">
              An interactive analysis of the speaker's past talks, research papers, and industry influence. This session is predicted to be highly technical.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setIsTalksOpen(true)}
                className="px-4 py-2 rounded-lg bg-orange-500/20 text-orange-400 font-medium text-sm hover:bg-orange-500/30 transition-colors border border-orange-500/30"
              >
                View Past Talks
              </button>
              <button 
                onClick={() => setIsQuestionsOpen(true)}
                className="px-4 py-2 rounded-lg glass-card text-white font-medium text-sm hover:bg-white/10"
              >
                Generate Questions
              </button>
            </div>
          </div>

          <div className="w-full md:w-64 h-64">
            <Chart style={{ height: '100%', width: '100%' }} className="[&_.k-chart-surface]:!bg-transparent">
              <ChartCategoryAxis>
                <ChartCategoryAxisItem categories={speakerData.expertise.map(e => e.category)} labels={{ color: 'rgba(255,255,255,0.7)' }} />
              </ChartCategoryAxis>
              <ChartSeries>
                <ChartSeriesItem
                  type="radarArea"
                  data={speakerData.expertise.map(e => e.value)}
                  color="#f97316"
                  line={{ width: 2 }}
                  opacity={0.4}
                />
              </ChartSeries>
            </Chart>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isTalksOpen}
        onClose={() => setIsTalksOpen(false)}
        title={<><PlayCircle className="w-5 h-5 text-orange-400" /> Past Talks Archive</>}
      >
        <div className="space-y-4">
          {pastTalks.map((talk, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer">
              <div>
                <h4 className="font-bold text-white mb-1">{talk.title}</h4>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {talk.date}</span>
                  <span>•</span>
                  <span>{talk.event}</span>
                </div>
              </div>
              <div className="text-orange-400 font-medium text-sm bg-orange-500/10 px-3 py-1 rounded-full">
                {talk.views} views
              </div>
            </div>
          ))}
        </div>
      </Modal>

      <Modal
        isOpen={isQuestionsOpen}
        onClose={() => setIsQuestionsOpen(false)}
        title={<><MessageSquare className="w-5 h-5 text-primary" /> AI Generated Questions</>}
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-400 mb-4">We analyzed {speakerData.name}'s recent publications and the context of this conference. Here are the top questions to ask:</p>
          {generatedQuestions.map((q, i) => (
            <div key={i} className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex gap-4">
              <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 font-bold text-sm">
                {i + 1}
              </div>
              <p className="text-sm text-gray-200 leading-relaxed flex-1">{q}</p>
              <button 
                onClick={() => handleCopy(q, i)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors h-fit text-gray-400 hover:text-white"
                title="Copy to clipboard"
              >
                {copiedIndex === i ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          ))}
        </div>
      </Modal>

    </motion.div>
  );
};
