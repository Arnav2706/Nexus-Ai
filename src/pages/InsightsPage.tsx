import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, TrendingUp, AlertCircle, MessageSquare } from 'lucide-react';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { Chart, ChartSeries, ChartSeriesItem, ChartCategoryAxis, ChartCategoryAxisItem, ChartValueAxis, ChartValueAxisItem } from '@progress/kendo-react-charts';

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

const CustomCell = (props: any) => {
  const { dataItem } = props;
  const getIcon = () => {
    switch(dataItem.type) {
      case 'trend': return <TrendingUp className="w-5 h-5 text-primary" />;
      case 'alert': return <AlertCircle className="w-5 h-5 text-amber-500" />;
      case 'feedback': return <MessageSquare className="w-5 h-5 text-accent" />;
      default: return <Activity className="w-5 h-5 text-white" />;
    }
  };

  return (
    <td {...props} className="!border-b !border-white/5 !bg-transparent !py-4">
      <div className="flex items-center gap-4">
        <div className="p-2 rounded-lg bg-white/5">
          {getIcon()}
        </div>
        <div>
          <p className="text-white font-medium">{dataItem.message}</p>
          <p className="text-xs text-gray-400 mt-1">{dataItem.time}</p>
        </div>
      </div>
    </td>
  );
};

export const InsightsPage: React.FC = () => {
  const [data, setData] = useState(engagementData);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev];
        const last = newData[newData.length - 1];
        newData.push({
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          value: last.value + Math.floor(Math.random() * 40 - 20)
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
      <header className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
          <Activity className="w-6 h-6 text-emerald-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Real-Time Insight Feed</h1>
          <p className="text-gray-400">Live analytics and event intelligence</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Live</span>
          </div>
          
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" /> Conference Engagement
          </h2>
          
          <div className="h-64 -ml-4">
            <Chart style={{ height: '100%' }} className="[&_.k-chart-surface]:!bg-transparent">
              <ChartCategoryAxis>
                <ChartCategoryAxisItem categories={data.map(d => d.time)} labels={{ color: 'rgba(255,255,255,0.5)' }} majorGridLines={{ visible: false }} />
              </ChartCategoryAxis>
              <ChartValueAxis>
                <ChartValueAxisItem labels={{ color: 'rgba(255,255,255,0.5)' }} majorGridLines={{ color: 'rgba(255,255,255,0.05)' }} />
              </ChartValueAxis>
              <ChartSeries>
                <ChartSeriesItem 
                  type="area" 
                  data={data.map(d => d.value)} 
                  color="#3b82f6" 
                  line={{ style: "smooth" }}
                  opacity={0.3}
                />
              </ChartSeries>
            </Chart>
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-accent" /> Intelligence Feed
          </h2>
          
          <div className="[&_.k-grid]:!bg-transparent [&_.k-grid]:!border-none [&_.k-grid-header]:!hidden [&_.k-grid-content]:!overflow-hidden">
            <Grid data={liveInsights}>
              <GridColumn field="message" cell={CustomCell} />
            </Grid>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
