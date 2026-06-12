import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { Scheduler, TimelineView, DayView, AgendaView } from '@progress/kendo-react-scheduler';

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
    priority: 'high',
  },
  {
    id: 2,
    title: 'Future of Developer Tools Keynote',
    start: new Date(currentYear, currentMonth, currentDay, 13, 0),
    end: new Date(currentYear, currentMonth, currentDay, 14, 0),
    isAllDay: false,
    priority: 'critical',
  },
];

const CustomItem = (props: any) => {
  return (
    <div className={`h-full w-full p-2 border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-none flex flex-col ${
      props.dataItem.priority === 'critical' ? 'bg-primary' : 'bg-white'
    }`}>
      <div className="font-bold font-headline-md uppercase tracking-wider text-sm text-black mb-1">{props.dataItem.title}</div>
      <div className="flex items-center gap-1 text-xs font-bold font-label-sm text-black uppercase mt-auto">
        <Clock className="w-4 h-4" />
        {props.dataItem.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

export const SchedulePage: React.FC = () => {
  const [date, setDate] = React.useState(new Date(currentYear, currentMonth, currentDay));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 h-full flex flex-col"
    >
      <header className="flex items-center gap-4 mb-4 shrink-0">
        <div className="w-12 h-12 bg-white flex items-center justify-center border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Clock className="w-6 h-6 text-black" />
        </div>
        <div>
          <h1 className="text-3xl font-bold font-headline-lg uppercase tracking-wider text-on-background">Smart Schedule Builder</h1>
          <p className="text-primary font-bold font-label-md uppercase">AI-optimized agenda based on your goals</p>
        </div>
      </header>

      <div className="flex-1 bg-white border-3 border-black brutalist-card-shadow rounded-none p-4 overflow-hidden flex flex-col [&_.k-scheduler]:!bg-white [&_.k-scheduler]:!border-none [&_.k-scheduler-toolbar]:!bg-gray-100 [&_.k-scheduler-toolbar]:!border-2 [&_.k-scheduler-toolbar]:!border-black [&_.k-scheduler-layout]:!text-black [&_.k-scheduler-header]:!bg-gray-100 [&_.k-scheduler-header]:!text-black [&_.k-event]:!bg-transparent [&_.k-event]:!border-none [&_.k-scheduler-content]:!bg-white [&_.k-scheduler-times]:!bg-white [&_.k-scheduler-times]:!text-black [&_.k-nav-current]:!text-black">
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
