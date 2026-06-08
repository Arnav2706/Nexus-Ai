import React, { useState } from 'react';
import { Scheduler, TimelineView, DayView, AgendaView } from '@progress/kendo-react-scheduler';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const currentDay = new Date().getDate();

const sampleData = [
  {
    id: 1,
    title: 'Generative AI in Production',
    start: new Date(currentYear, currentMonth, currentDay, 10, 0),
    end: new Date(currentYear, currentMonth, currentDay, 12, 0),
    isAllDay: false,
    roomId: 1,
    priority: 'high'
  },
  {
    id: 2,
    title: 'Future of Developer Tools Keynote',
    start: new Date(currentYear, currentMonth, currentDay, 13, 0),
    end: new Date(currentYear, currentMonth, currentDay, 14, 0),
    isAllDay: false,
    roomId: 2,
    priority: 'critical'
  }
];

const CustomItem = (props: any) => {
  return (
    <div className={`h-full w-full p-2 rounded-lg border border-white/20 backdrop-blur-md shadow-lg transition-all
      ${props.dataItem.priority === 'critical' ? 'bg-accent/40 border-accent/50' : 'bg-primary/40 border-primary/50'}`}
    >
      <div className="font-bold text-sm text-white mb-1">{props.dataItem.title}</div>
      <div className="flex items-center gap-1 text-xs text-white/80">
        <Clock className="w-3 h-3" />
        {props.dataItem.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

export const SchedulePage: React.FC = () => {
  const [date, setDate] = useState(new Date(currentYear, currentMonth, currentDay));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 h-full flex flex-col"
    >
      <header className="flex items-center gap-4 mb-4 shrink-0">
        <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center border border-accent/30">
          <CalendarIcon className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Smart Schedule Builder</h1>
          <p className="text-gray-400">AI-optimized agenda based on your goals</p>
        </div>
      </header>

      <div className="flex-1 glass-panel rounded-2xl p-4 overflow-hidden flex flex-col [&_.k-scheduler]:!bg-transparent [&_.k-scheduler]:!border-none [&_.k-scheduler-toolbar]:!bg-white/5 [&_.k-scheduler-toolbar]:!border-white/10 [&_.k-scheduler-layout]:!text-white [&_.k-scheduler-header]:!bg-white/5 [&_.k-scheduler-header]:!text-white [&_.k-event]:!bg-transparent [&_.k-event]:!border-none [&_.k-scheduler-content]:!bg-transparent [&_.k-scheduler-times]:!bg-transparent [&_.k-scheduler-times]:!text-gray-400 [&_.k-nav-current]:!text-white">
        <Scheduler
          data={sampleData}
          date={date}
          onDateChange={(e) => setDate(e.value)}
          item={CustomItem}
          editable={true}
          style={{ height: '100%', width: '100%' }}
        >
          <DayView startTime="08:00" endTime="18:00" />
          <TimelineView startTime="08:00" endTime="18:00" />
          <AgendaView />
        </Scheduler>
      </div>
    </motion.div>
  );
};
