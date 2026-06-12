import React from 'react';
import { Target } from 'lucide-react';
import { ArcGauge } from '@progress/kendo-react-gauges';

export const ValuePredictor: React.FC = () => {
  return (
    <div className="bg-white border-3 border-black p-6 mt-8 rounded-none brutalist-card-shadow text-black">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <Target className="w-6 h-6 text-black" />
        </div>
        <h3 className="text-2xl font-bold font-headline-lg uppercase tracking-wider">Meeting Value Predictor</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-100 rounded-none p-6 border-3 border-black flex flex-col items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
          <div className="w-full h-8 border-3 border-black bg-white relative mb-4 p-1">
            <div className="h-full bg-primary" style={{ width: '85%' }} />
            <span className="absolute inset-0 flex items-center justify-center font-bold font-headline-md text-sm text-black mix-blend-difference z-10 text-white">85%</span>
          </div>
          <div className="text-sm font-bold font-label-md text-black uppercase tracking-wider text-center">Collaboration Potential</div>
        </div>

        <div className="bg-gray-100 rounded-none p-6 border-3 border-black flex flex-col items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
          <div className="w-full h-8 border-3 border-black bg-white relative mb-4 p-1">
            <div className="h-full bg-primary" style={{ width: '92%' }} />
            <span className="absolute inset-0 flex items-center justify-center font-bold font-headline-md text-sm text-black mix-blend-difference z-10 text-white">92%</span>
          </div>
          <div className="text-sm font-bold font-label-md text-black uppercase tracking-wider text-center">Hiring Opportunity</div>
        </div>

        <div className="bg-gray-100 rounded-none p-6 border-3 border-black flex flex-col items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
          <div className="w-full h-8 border-3 border-black bg-white relative mb-4 p-1">
            <div className="h-full bg-primary" style={{ width: '78%' }} />
            <span className="absolute inset-0 flex items-center justify-center font-bold font-headline-md text-sm text-black mix-blend-difference z-10 text-white">78%</span>
          </div>
          <div className="text-sm font-bold font-label-md text-black uppercase tracking-wider text-center">Research Relevance</div>
        </div>
      </div>
    </div>
  );
};
