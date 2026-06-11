import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Handshake } from 'lucide-react';
import { ArcGauge } from '@progress/kendo-react-gauges';

export const ValuePredictor: React.FC = () => {
  return (
    <div className="glass-panel rounded-3xl p-6 mt-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-indigo-500/20 rounded-lg border border-indigo-500/30">
          <Target className="w-5 h-5 text-indigo-400" />
        </div>
        <h3 className="text-xl font-bold">Meeting Value Predictor</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex flex-col items-center justify-center">
          <div className="relative w-32 h-24 mb-2">
            <ArcGauge
              value={85}
              colors={[{ to: 100, color: '#6366f1' }]}
              className="absolute inset-0 [&_.k-arcgauge-label]:!text-white [&_.k-arcgauge-label]:!font-bold [&_.k-arcgauge-label]:!text-xl"
            />
          </div>
          <div className="text-sm font-medium text-gray-300">Collaboration Potential</div>
        </div>
        
        <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex flex-col items-center justify-center">
          <div className="relative w-32 h-24 mb-2">
            <ArcGauge
              value={92}
              colors={[{ to: 100, color: '#f59e0b' }]}
              className="absolute inset-0 [&_.k-arcgauge-label]:!text-white [&_.k-arcgauge-label]:!font-bold [&_.k-arcgauge-label]:!text-xl"
            />
          </div>
          <div className="text-sm font-medium text-gray-300">Hiring Opportunity</div>
        </div>

        <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex flex-col items-center justify-center">
          <div className="relative w-32 h-24 mb-2">
            <ArcGauge
              value={78}
              colors={[{ to: 100, color: '#10b981' }]}
              className="absolute inset-0 [&_.k-arcgauge-label]:!text-white [&_.k-arcgauge-label]:!font-bold [&_.k-arcgauge-label]:!text-xl"
            />
          </div>
          <div className="text-sm font-medium text-gray-300">Research Relevance</div>
        </div>
      </div>
    </div>
  );
};
