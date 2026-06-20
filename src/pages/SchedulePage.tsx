import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, CalendarPlus, Wand2, Download, Share2 } from 'lucide-react';
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

export const SchedulePage: React.FC = () => {
  const { addToast } = useToast();
  const [data, setData] = useState(initialData);

  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/events');
        if (res.ok) {
          const apiData = await res.json();
          if (apiData.length > 0) {
            // Map string dates back to Date objects
            setData(apiData.map((e: any) => ({
              ...e,
              start: new Date(e.start),
              end: new Date(e.end)
            })));
          }
        }
      } catch (err) {
        console.error("Failed to fetch events from DynamoDB, using mock data");
      }
    };
    fetchEvents();
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const handleAIOptimize = async () => {
    addToast('AI is optimizing your schedule for maximum networking...', 'success');
    setIsLoading(true);
    // Simulate API call for future ML backend integration
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
      setIsLoading(false);
    }, 1500);
  };

  const handleSync = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Nexus AI//EN
${data.map(event => `BEGIN:VEVENT
SUMMARY:${event.title}
DTSTART:${event.start.toISOString().replace(/[-:]|\.\d{3}/g, '')}
DTEND:${event.end.toISOString().replace(/[-:]|\.\d{3}/g, '')}
END:VEVENT`).join('\n')}
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'nexus-schedule.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Schedule downloaded as .ics file for Google Calendar/Outlook!', 'success');
  };

  const handleExport = () => {
    window.print();
    addToast('Printing to PDF...', 'success');
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast('Share link copied to clipboard.', 'success');
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
            <h1 className="text-3xl font-bold font-headline-lg uppercase tracking-wider text-on-background">Smart Schedule</h1>
            <p className="text-primary font-bold font-label-md uppercase bg-black text-primary px-2 py-0.5 inline-block border-2 border-black">AI-optimized agenda</p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={handleAIOptimize} disabled={isLoading} className="flex items-center gap-2 bg-primary text-black border-3 border-black px-4 py-2 font-bold uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50">
            <Wand2 className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} /> {isLoading ? 'Optimizing...' : 'Auto-Optimize'}
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
        {/* Main Calendar Grid -> Custom Timeline */}
        <div className="flex-1 bg-white border-3 border-black brutalist-card-shadow rounded-none p-6 overflow-y-auto flex flex-col relative">
          <h2 className="text-2xl font-bold font-headline-lg uppercase mb-8 text-black border-b-3 border-black pb-4">Today's Agenda</h2>
          
          <div className="relative pl-8 md:pl-0">
            {/* Vertical Line */}
            <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-1.5 bg-black -translate-x-1/2" />
            
            <div className="space-y-8">
              {data.sort((a, b) => a.start.getTime() - b.start.getTime()).map((event, i) => (
                <div key={event.id} className="relative flex flex-col md:flex-row md:items-center justify-between md:even:flex-row-reverse group">
                  
                  {/* Timeline Node */}
                  <div className="absolute left-[-2rem] md:left-1/2 w-8 h-8 rounded-none border-3 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center font-bold text-black z-10 md:-translate-x-1/2 mt-4 md:mt-0">
                    {i + 1}
                  </div>
                  
                  {/* Event Card */}
                  <div className={`w-full md:w-[calc(50%-3rem)] p-5 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all ${event.priority === 'critical' ? 'bg-primary' : event.priority === 'high' ? 'bg-[#00ffff]' : 'bg-white'}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-5 h-5 text-black" />
                      <span className="text-sm font-bold font-label-md uppercase text-black bg-white px-2 py-1 border-2 border-black">
                        {event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <h3 className="font-bold font-headline-md text-black uppercase tracking-wider text-xl leading-tight mb-2">{event.title}</h3>
                  </div>
                  
                  <div className="hidden md:block w-[calc(50%-3rem)]" />
                </div>
              ))}
            </div>
          </div>
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
              <p className="text-xs font-bold text-gray-900">14:00 - 15:00 • Hall A</p>
              <p className="text-xs text-black mt-2 font-bold">Matches 3 of your target investors.</p>
            </div>
            
            <div className="bg-white border-3 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer" onClick={() => addToast('Added to schedule', 'success')}>
              <p className="text-xs font-bold font-label-md text-black uppercase bg-[#00ffff] inline-block px-1 border-2 border-black mb-2">High Value</p>
              <h3 className="font-bold font-headline-md text-black uppercase mb-1">LLM Architecture Deep Dive</h3>
              <p className="text-xs font-bold text-gray-900">16:00 - 17:30 • Room 302</p>
              <p className="text-xs text-black mt-2 font-bold">Based on your interest in Generative AI.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
