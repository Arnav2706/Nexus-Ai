import React from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, Zap } from 'lucide-react';
import { Avatar } from '@progress/kendo-react-layout';
import { Chart, ChartSeries, ChartSeriesItem, ChartLegend } from '@progress/kendo-react-charts';
import { ValuePredictor } from '../components/network/ValuePredictor';

const matches = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Founder at AI Startup',
    score: 92,
    reason: 'Both building AI products and interested in healthcare applications.',
    skills: ['React', 'Python', 'LLMs'],
    status: 'online'
  },
  {
    id: 2,
    name: 'David Miller',
    role: 'Staff Engineer',
    score: 85,
    reason: 'Shared interest in performance optimization and open source.',
    skills: ['Rust', 'WASM', 'Go'],
    status: 'offline'
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'Product Designer',
    score: 78,
    reason: 'Looking for technical co-founders in your exact stack.',
    skills: ['Figma', 'UI/UX', 'Framer'],
    status: 'online'
  }
];

export const NetworkPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <header className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-fuchsia-500/20 flex items-center justify-center border border-fuchsia-500/30">
          <Users className="w-6 h-6 text-fuchsia-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Networking Matchmaker</h1>
          <p className="text-gray-400">Discover valuable connections powered by AI</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match, index) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="glass-panel rounded-3xl p-6 relative overflow-hidden group"
          >
            {/* Background Glow */}
            <div className={`absolute -top-20 -right-20 w-40 h-40 blur-[80px] rounded-full mix-blend-screen transition-opacity ${match.score > 90 ? 'bg-fuchsia-500/30' : 'bg-primary/20'}`} />

            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar type="image" shape="circle" className="!w-14 !h-14 !border-2 !border-white/10">
                    <img src={`https://i.pravatar.cc/150?img=${match.id + 20}`} alt={match.name} />
                  </Avatar>
                  {match.status === 'online' && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-surface" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white group-hover:text-fuchsia-400 transition-colors">{match.name}</h3>
                  <p className="text-sm text-gray-400">{match.role}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 mb-6 bg-white/5 rounded-2xl p-4">
              <div className="w-20 h-20 -ml-2 -my-2 relative flex items-center justify-center">
                {/* Custom Donut Chart for Score using Kendo */}
                <Chart style={{ height: 100, width: 100 }} className="absolute inset-0 [&_.k-chart-surface]:!bg-transparent">
                  <ChartLegend visible={false} />
                  <ChartSeries>
                    <ChartSeriesItem
                      type="donut"
                      data={[
                        { value: match.score, color: match.score > 90 ? '#d946ef' : '#3b82f6' },
                        { value: 100 - match.score, color: 'rgba(255,255,255,0.1)' }
                      ]}
                      categoryField="kind"
                      field="value"
                      holeSize={25}
                      size={10}
                      border={{ width: 0 }}
                      labels={{ visible: false }}
                    />
                  </ChartSeries>
                </Chart>
                <span className="font-bold text-lg text-white z-10">{match.score}%</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-semibold text-white uppercase tracking-wider">AI Analysis</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{match.reason}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {match.skills.map(skill => (
                  <span key={skill} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
                    {skill}
                  </span>
                ))}
              </div>
              
              <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium flex items-center justify-center gap-2 border border-white/5">
                <Briefcase className="w-4 h-4" /> Connect Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <ValuePredictor />
    </motion.div>
  );
};
