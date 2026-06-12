import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { ShaderBackground } from './ShaderBackground';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingAssistant } from '../chat/FloatingAssistant';
import { NotificationPanel } from './NotificationPanel';
import { Search, AlertTriangle } from 'lucide-react';
import { CustomCursor } from '../ui/CustomCursor';

export const AppLayout: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Aggressively remove Kendo UI watermarks that overlap components
    const removeWatermark = () => {
      const watermarks = document.querySelectorAll('.k-watermark, div[title="License Validation"]');
      watermarks.forEach(el => el.remove());
      
      // Some charts use SVG text for watermarks
      const svgTexts = document.querySelectorAll('svg text');
      svgTexts.forEach(text => {
        const content = text.textContent?.toLowerCase() || '';
        if (content.includes('invalid') || content.includes('license')) {
          text.remove();
        }
      });
    };
    
    // Run initially and whenever the DOM changes
    removeWatermark();
    const observer = new MutationObserver(removeWatermark);
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex h-screen bg-background text-on-background overflow-hidden font-body-md selection:bg-primary selection:text-on-primary">
      <CustomCursor />
      <ShaderBackground />
      <Sidebar />
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        {/* Beta Banner */}
        <div className="bg-primary text-black font-bold font-label-md uppercase tracking-widest text-center py-2 border-b-3 border-black flex items-center justify-center gap-2 shrink-0">
          <AlertTriangle className="w-4 h-4" />
          <span>Nexus AI is currently in Beta. More features coming soon.</span>
        </div>
        {/* Top Bar */}
        <header className="shrink-0 flex items-center justify-between px-8 py-4 border-b-3 border-black bg-surface">
          <div className="flex items-center gap-3 flex-1 max-w-sm">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
              <input
                type="text"
                placeholder="Search sessions, people, topics..."
                className="w-full pl-9 pr-4 py-2 bg-transparent border-b-2 border-white text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-all rounded-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <NotificationPanel />
            <div className="flex items-center gap-2 px-3 py-2 bg-white border-3 border-black brutalist-card-shadow text-black">
              <div className="w-7 h-7 rounded-none bg-primary border-2 border-black" />
              <span className="text-sm font-bold font-headline-md uppercase tracking-wider">Alex Jensen</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="h-full max-w-7xl mx-auto"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <FloatingAssistant />
    </div>
  );
};
