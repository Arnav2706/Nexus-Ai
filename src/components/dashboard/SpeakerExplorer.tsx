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
        <div className="w-10 h-10 bg-white border-3 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black">
          <Mic className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold font-headline-lg uppercase tracking-wider text-on-background">AI Speaker Explorer</h2>
          <p className="text-primary font-bold font-label-md uppercase">Deep dive into speaker expertise</p>
        </div>
      </div>

      <div className="bg-white border-3 border-black brutalist-card-shadow rounded-none overflow-hidden text-black">
        <div className="flex flex-col md:flex-row items-center gap-8 p-6">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-4">
              <img src="https://i.pravatar.cc/150?img=32" alt="Speaker" className="w-20 h-20 border-3 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" />
              <div>
                <h3 className="text-2xl font-bold font-headline-lg uppercase tracking-wider flex items-center gap-2">
                  {speakerData.name} <Star className="w-6 h-6 text-primary fill-primary stroke-black stroke-2" />
                </h3>
                <p className="text-black font-bold font-label-md uppercase bg-primary inline-block px-2 py-1 border-2 border-black">{speakerData.role}</p>
              </div>
            </div>
            <p className="text-black font-bold font-body-md leading-relaxed text-sm">
              An interactive analysis of the speaker's past talks, research papers, and industry influence. This session is predicted to be highly technical.
            </p>
            <div className="flex gap-3 mt-4">
              <button 
                onClick={() => setIsTalksOpen(true)}
                className="btn-outline border-black text-black hover:bg-black hover:text-white"
              >
                View Past Talks
              </button>
              <button 
                onClick={() => setIsQuestionsOpen(true)}
                className="btn-primary"
              >
                Generate Questions
              </button>
            </div>
          </div>

          <div className="w-full md:w-64 h-64">
            <Chart style={{ height: '100%', width: '100%' }} className="[&_.k-chart-surface]:!bg-transparent">
              <ChartCategoryAxis>
                <ChartCategoryAxisItem categories={speakerData.expertise.map(e => e.category)} labels={{ color: 'rgba(0,0,0,1)', font: 'bold 12px "JetBrains Mono"' }} />
              </ChartCategoryAxis>
              <ChartSeries>
                <ChartSeriesItem
                  type="radarArea"
                  data={speakerData.expertise.map(e => e.value)}
                  color="#a9f131"
                  line={{ width: 3, color: '#000' }}
                  opacity={1}
                />
              </ChartSeries>
            </Chart>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isTalksOpen}
        onClose={() => setIsTalksOpen(false)}
        title={<><PlayCircle className="w-6 h-6 text-black" /> Past Talks Archive</>}
      >
        <div className="space-y-4">
          {pastTalks.map((talk, i) => (
            <div key={i} className="p-4 bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer">
              <div>
                <h4 className="font-bold font-headline-md text-black mb-1 uppercase tracking-wider">{talk.title}</h4>
                <div className="flex items-center gap-3 text-xs font-bold font-label-sm text-black uppercase">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {talk.date}</span>
                  <span>•</span>
                  <span>{talk.event}</span>
                </div>
              </div>
              <div className="text-black font-bold font-headline-md text-sm bg-primary border-2 border-black px-3 py-1">
                {talk.views} views
              </div>
            </div>
          ))}
        </div>
      </Modal>

      <Modal
        isOpen={isQuestionsOpen}
        onClose={() => setIsQuestionsOpen(false)}
        title={<><MessageSquare className="w-6 h-6 text-black" /> AI Generated Questions</>}
      >
        <div className="space-y-4">
          <p className="text-sm font-bold font-body-md text-black mb-4">We analyzed {speakerData.name}'s recent publications and the context of this conference. Here are the top questions to ask:</p>
          {generatedQuestions.map((q, i) => (
            <div key={i} className="p-4 bg-primary border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex gap-4">
              <div className="w-8 h-8 bg-white border-2 border-black text-black flex items-center justify-center shrink-0 font-bold font-headline-md text-sm">
                {i + 1}
              </div>
              <p className="text-sm font-bold font-body-md text-black leading-relaxed flex-1">{q}</p>
              <button 
                onClick={() => handleCopy(q, i)}
                className="p-2 bg-white border-2 border-black hover:bg-black hover:text-white transition-colors h-fit text-black"
                title="Copy to clipboard"
              >
                {copiedIndex === i ? <CheckCircle2 className="w-5 h-5 text-primary" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          ))}
        </div>
      </Modal>

    </motion.div>
  );
};
