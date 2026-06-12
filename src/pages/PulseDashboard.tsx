import React from 'react';
import { motion } from 'framer-motion';
import { Flame, TrendingUp, MessageSquare, Users, Heart, Zap, ChevronRight } from 'lucide-react';
import { Chart, ChartSeries, ChartSeriesItem, ChartCategoryAxis, ChartCategoryAxisItem, ChartValueAxis, ChartValueAxisItem } from '@progress/kendo-react-charts';
import { useToast } from '../contexts/ToastContext';

const trendingTopics = [
  { topic: 'Generative AI', mentions: 340, delta: '+22%', hot: true },
  { topic: 'LLM Fine-tuning', mentions: 210, delta: '+18%', hot: true },
  { topic: 'WebAssembly', mentions: 145, delta: '+9%', hot: false },
  { topic: 'Developer Experience', mentions: 132, delta: '+14%', hot: false },
];

const engagementScores = [72, 84, 95, 88, 91, 78, 96];
const categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const PulseDashboard: React.FC = () => {
  const { addToast } = useToast();
  const overallHealth = 91;

  const [isExpanded, setIsExpanded] = React.useState(false);

  const extendedTopics = [
    ...trendingTopics,
    { topic: 'Agentic Workflows', mentions: 110, delta: '+25%', hot: true },
    { topic: 'RAG Architecture', mentions: 95, delta: '+5%', hot: false },
    { topic: 'AI Safety', mentions: 88, delta: '+12%', hot: false },
  ];

  const topicsToShow = isExpanded ? extendedTopics : trendingTopics;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <header className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center border border-red-500/30">
          <Flame className="w-6 h-6 text-red-400" />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Event Pulse Dashboard</h1>
          <p className="text-gray-400">Real-time conference health & engagement metrics</p>
        </div>
        {/* Health Score widget */}
        <div className="flex items-center gap-3 glass-card px-5 py-3 rounded-2xl border border-white/10">
          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 -rotate-90">
              <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
              <circle
                cx="32" cy="32" r="28" fill="none"
                stroke="#ef4444" strokeWidth="4"
                strokeDasharray={`${2 * Math.PI * 28 * overallHealth / 100} ${2 * Math.PI * 28}`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white">{overallHealth}</span>
          </div>
          <div>
            <div className="text-sm font-bold text-white">Health Score</div>
            <div className="text-xs text-emerald-400">Excellent 🔥</div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" /> Trending Topics
            </h2>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm font-medium text-primary hover:text-white transition-colors flex items-center gap-1"
            >
              {isExpanded ? 'Show less' : 'See all'} <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
            </button>
          </div>
          <div className="space-y-3">
            {topicsToShow.map((t, i) => (
              <motion.div
                key={t.topic}
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto' }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                {t.hot ? <Flame className="w-4 h-4 text-orange-400 shrink-0" /> : <div className="w-4 h-4" />}
                <span className="font-medium flex-1 text-white">{t.topic}</span>
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(t.mentions / 340) * 100}%` }}
                    transition={{ duration: 1, delay: i * 0.05 }}
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                  />
                </div>
                <span className="text-gray-400 text-sm w-10 text-right">{t.mentions}</span>
                <span className="text-emerald-400 text-sm font-bold w-14 text-right">{t.delta}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 -ml-4 h-48">
            <Chart style={{ height: '100%' }} className="[&_.k-chart-surface]:!bg-transparent">
              <ChartCategoryAxis>
                <ChartCategoryAxisItem categories={categories} labels={{ color: 'rgba(255,255,255,0.4)' }} majorGridLines={{ visible: false }} />
              </ChartCategoryAxis>
              <ChartValueAxis>
                <ChartValueAxisItem labels={{ color: 'rgba(255,255,255,0.4)' }} majorGridLines={{ color: 'rgba(255,255,255,0.05)' }} min={50} />
              </ChartValueAxis>
              <ChartSeries>
                <ChartSeriesItem type="column" data={engagementScores} color="#6366f1" opacity={0.8} gap={1} spacing={0.25} border={{ width: 0 }} />
              </ChartSeries>
            </Chart>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { icon: Users, label: 'Active Attendees', value: '2,847', color: 'text-cyan-400', trend: '+12 online' },
            { icon: MessageSquare, label: 'Conversations', value: '342', color: 'text-fuchsia-400', trend: 'Peak hour' },
            { icon: Heart, label: 'Avg Session Rating', value: '4.8/5', color: 'text-rose-400', trend: 'Top 10% ever' },
          ].map(({ icon: Icon, label, value, color, trend }) => (
            <motion.div key={label} whileHover={{ scale: 1.02 }} className="glass-panel rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <Icon className={`w-5 h-5 ${color}`} />
                <span className="text-sm text-gray-400">{label}</span>
              </div>
              <div className={`text-3xl font-bold ${color}`}>{value}</div>
              <div className="text-xs text-gray-500 mt-1">{trend}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
