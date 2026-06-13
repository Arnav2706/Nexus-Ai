import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, CalendarPlus, Wand2, Download, Share2 } from 'lucide-react';
import { Scheduler, TimelineView, DayView, AgendaView } from '@progress/kendo-react-scheduler';
import { useToast } from '../contexts/ToastContext';

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const currentDay = new Date().getDate();

const initialData = [
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
      props.dataItem.priority === 'critical' ? 'bg-primary' : 'bg-[#00ffff]'
    }`}>
      <div className="font-bold font-headline-md uppercase tracking-wider text-sm text-black mb-1 leading-tight line-clamp-2">{props.dataItem.title}</div>
      <div className="flex items-center gap-1 text-xs font-bold font-label-sm text-black uppercase mt-auto bg-white border-2 border-black px-1 w-max">
        <Clock className="w-3 h-3" />
        {props.dataItem.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

export const SchedulePage: React.FC = () => {
  const { addToast } = useToast();
  const [date, setDate] = useState(new Date(currentYear, currentMonth, currentDay));
  const [data, setData] = useState(initialData);

  const handleAIOptimize = () => {
    addToast('AI is optimizing your schedule for maximum networking...', 'success');
    setTimeout(() => {
      setData([...data, {
        id: 3,
        title: 'Networking Power Hour',
        start: new Date(currentYear, currentMonth, currentDay, 15, 0),
        end: new Date(currentYear, currentMonth, currentDay, 16, 0),
        isAllDay: false,
        priority: 'high',
      }]);
      addToast('Schedule optimized! Added Networking Power Hour.', 'success');
    }, 1500);
  };

  const handleSync = () => addToast('Synced with Google Calendar successfully!', 'success');
  const handleExport = () => addToast('Schedule exported as PDF.', 'success');
  const handleShare = () => addToast('Share link copied to clipboard.', 'success');

  const handleDataChange = (e: any) => {
    if (e.created && e.created.length) setData([...data, ...e.created]);
    if (e.updated && e.updated.length) {
      setData(data.map(item => e.updated.find((u: any) => u.id === item.id) || item));
    }
    if (e.deleted && e.deleted.length) {
      setData(data.filter(item => !e.deleted.find((d: any) => d.id === item.id)));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 h-full flex flex-col"
    >
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white flex items-center justify-center border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Clock className="w-6 h-6 text-black" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-headline-lg uppercase tracking-wider text-black">Smart Schedule</h1>
            <p className="text-primary font-bold font-label-md uppercase bg-black text-primary px-2 py-0.5 inline-block border-2 border-black">AI-optimized agenda</p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={handleAIOptimize} className="flex items-center gap-2 bg-primary text-black border-3 border-black px-4 py-2 font-bold uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
            <Wand2 className="w-4 h-4" /> Auto-Optimize
          </button>
          <button onClick={handleSync} className="flex items-center gap-2 bg-white text-black border-3 border-black px-4 py-2 font-bold uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
            <CalendarPlus className="w-4 h-4" /> Sync
          </button>
          <button onClick={handleExport} className="flex items-center gap-2 bg-white text-black border-3 border-black px-4 py-2 font-bold uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hidden sm:flex">
            <Download className="w-4 h-4" /> Export
          </button>
          <button onClick={handleShare} className="flex items-center gap-2 bg-white text-black border-3 border-black px-4 py-2 font-bold uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hidden sm:flex">
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        {/* Main Calendar Grid */}
        <div className="flex-1 bg-white border-3 border-black brutalist-card-shadow rounded-none p-4 overflow-hidden flex flex-col [&_.k-scheduler]:!bg-white [&_.k-scheduler]:!border-none [&_.k-scheduler-toolbar]:!bg-gray-100 [&_.k-scheduler-toolbar]:!border-3 [&_.k-scheduler-toolbar]:!border-black [&_.k-scheduler-layout]:!text-black [&_.k-scheduler-header]:!bg-gray-100 [&_.k-scheduler-header]:!text-black [&_.k-event]:!bg-transparent [&_.k-event]:!border-none [&_.k-scheduler-content]:!bg-white [&_.k-scheduler-times]:!bg-white [&_.k-scheduler-times]:!text-black [&_.k-nav-current]:!text-black [&_.k-scheduler-table_td]:!border-black/20">
          <Scheduler
            data={data}
            date={date}
            onDateChange={(e) => setDate(e.value)}
            onDataChange={handleDataChange}
            item={CustomItem}
            editable={{
              add: true,
              remove: true,
              drag: true,
              resize: true,
              edit: true
            }}
            style={{ height: '100%', width: '100%' }}
          >
            <DayView startTime="08:00" endTime="18:00" />
            <TimelineView startTime="08:00" endTime="18:00" />
            <AgendaView />
          </Scheduler>
        </div>
        
        {/* AI Copilot Side Panel */}
        <div className="w-full lg:w-80 bg-[#ff00ff] border-3 border-black brutalist-card-shadow rounded-none p-6 flex flex-col shrink-0">
          <div className="flex items-center gap-3 mb-6 bg-white border-3 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Wand2 className="w-6 h-6 text-black" />
            <h2 className="text-xl font-bold font-headline-lg uppercase text-black">AI Copilot</h2>
          </div>
          
          <div className="space-y-4 flex-1 overflow-y-auto pr-2">
            <div className="bg-white border-3 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer" onClick={() => addToast('Added to schedule', 'success')}>
              <p className="text-xs font-bold font-label-md text-black uppercase bg-primary inline-block px-1 border-2 border-black mb-2">Recommendation</p>
              <h3 className="font-bold font-headline-md text-black uppercase mb-1">Tech Founders Meetup</h3>
              <p className="text-xs font-bold text-gray-700">14:00 - 15:00 • Hall A</p>
              <p className="text-xs text-black mt-2 font-bold">Matches 3 of your target investors.</p>
            </div>
            
            <div className="bg-white border-3 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer" onClick={() => addToast('Added to schedule', 'success')}>
              <p className="text-xs font-bold font-label-md text-black uppercase bg-[#00ffff] inline-block px-1 border-2 border-black mb-2">High Value</p>
              <h3 className="font-bold font-headline-md text-black uppercase mb-1">LLM Architecture Deep Dive</h3>
              <p className="text-xs font-bold text-gray-700">16:00 - 17:30 • Room 302</p>
              <p className="text-xs text-black mt-2 font-bold">Based on your interest in Generative AI.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
