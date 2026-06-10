import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Star } from 'lucide-react';
import { Chart, ChartSeries, ChartSeriesItem, ChartCategoryAxis, ChartCategoryAxisItem } from '@progress/kendo-react-charts';

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

export const SpeakerExplorer: React.FC = () => {
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
              <button className="px-4 py-2 rounded-lg bg-orange-500/20 text-orange-400 font-medium text-sm hover:bg-orange-500/30 transition-colors border border-orange-500/30">
                View Past Talks
              </button>
              <button className="px-4 py-2 rounded-lg glass-card text-white font-medium text-sm">
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
    </motion.div>
  );
};
