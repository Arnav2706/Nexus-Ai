import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, TrendingUp, AlertCircle, MessageSquare } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
const liveInsights = [
  { id: 1, type: 'trend', message: 'Generative AI workshop is trending. 150+ mentions in last hour.', time: '2m ago' },
  { id: 2, type: 'alert', message: 'Room B is nearing capacity for the Design Systems talk.', time: '5m ago' },
  { id: 3, type: 'feedback', message: 'Cybersecurity keynote receiving excellent feedback (4.9/5).', time: '12m ago' },
];

const engagementData = [
  { time: '09:00', value: 20 },
  { time: '10:00', value: 45 },
  { time: '11:00', value: 85 },
  { time: '12:00', value: 60 },
  { time: '13:00', value: 95 },
  { time: '14:00', value: 120 },
];


export const InsightsPage: React.FC = () => {
  const [data, setData] = useState(engagementData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev];
        const last = newData[newData.length - 1];
        newData.push({
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          value: Math.max(10, last.value + Math.floor(Math.random() * 40 - 20))
        });
        if (newData.length > 8) newData.shift();
        return newData;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white flex items-center justify-center border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Activity className="w-6 h-6 text-black" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-headline-lg uppercase tracking-wider text-on-background">Real-Time Insight Feed</h1>
            <p className="text-primary font-bold font-label-md uppercase bg-black px-2 py-0.5 inline-block border-2 border-black">Live analytics and event intelligence</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border-3 border-black brutalist-card-shadow rounded-none p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-error"></span>
            </span>
            <span className="text-xs font-bold text-error uppercase tracking-wider font-label-md border-2 border-error px-1">Live</span>
          </div>

          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 font-headline-md uppercase text-black">
            <TrendingUp className="w-5 h-5 text-black" /> Conference Engagement
          </h2>

          <div className="h-64 -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" vertical={false} />
                <XAxis dataKey="time" stroke="#000" tick={{ fill: '#000', fontWeight: 'bold', fontSize: 12, fontFamily: 'JetBrains Mono' }} />
                <YAxis stroke="#000" tick={{ fill: '#000', fontWeight: 'bold', fontSize: 12, fontFamily: 'JetBrains Mono' }} />
                <Area type="monotone" dataKey="value" stroke="#000" strokeWidth={3} fill="#a9f131" fillOpacity={1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border-3 border-black brutalist-card-shadow rounded-none p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 font-headline-md uppercase text-black">
            <Activity className="w-5 h-5 text-black" /> Intelligence Feed
          </h2>
          <div className="space-y-4">
            {liveInsights.map(insight => (
              <div key={insight.id} className="flex items-start gap-4 p-4 border-3 border-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer">
                <div className={`p-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-white`}>
                  {insight.type === 'trend' && <TrendingUp className="w-5 h-5 text-black" />}
                  {insight.type === 'alert' && <AlertCircle className="w-5 h-5 text-black" />}
                  {insight.type === 'feedback' && <MessageSquare className="w-5 h-5 text-black" />}
                </div>
                <div>
                  <p className="text-black font-bold font-body-md leading-tight mb-1">{insight.message}</p>
                  <p className="text-xs font-bold font-label-md uppercase tracking-wider text-gray-900">{insight.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
