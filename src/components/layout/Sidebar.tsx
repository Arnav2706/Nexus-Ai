import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Activity, Settings, Cpu, MapPin, Zap, Network, Briefcase, Flame, Lightbulb, Medal, Blocks, X } from 'lucide-react';

const navItems = [
  { name: 'Copilot', path: '/', icon: Cpu },
  { name: 'Schedule', path: '/schedule', icon: Calendar },
  { name: 'Map', path: '/map', icon: MapPin },
  { name: 'Network', path: '/network', icon: Users },
  { name: 'Insights', path: '/insights', icon: Activity },
  { name: 'Graph', path: '/graph', icon: Network },
  { name: 'Memory', path: '/memory', icon: Zap },
  { name: 'Career', path: '/career', icon: Briefcase },
  { name: 'Pulse', path: '/pulse', icon: Flame },
  { name: 'WOW', path: '/wow', icon: Lightbulb },
  { name: 'Achievements', path: '/achievements', icon: Medal },
  { name: 'Integrations', path: '/integrations', icon: Blocks },
  { name: 'Settings', path: '/settings', icon: Settings },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <motion.div 
        className={`fixed inset-y-0 left-0 w-64 border-r-3 border-black bg-white flex flex-col p-6 z-50 text-black overflow-y-auto transform transition-transform duration-300 md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between mb-10 mt-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border-3 border-black bg-primary flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Cpu className="text-black w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold font-headline-lg tracking-tight text-black uppercase">Nexus<span className="text-primary mix-blend-difference">AI</span></h1>
          </div>
          <button onClick={onClose} className="md:hidden p-2 -mr-2 text-black hover:text-primary transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

      <nav className="flex-1 space-y-3">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 font-bold font-headline-md transition-all duration-200 border-3 ${
                isActive 
                  ? 'bg-primary text-black border-black brutalist-card-shadow' 
                  : 'text-black border-transparent hover:text-black hover:border-black hover:bg-primary'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="uppercase tracking-wider">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-8 pt-6 border-t-3 border-black">
        <div className="flex items-center gap-3 px-4 py-3 bg-white border-3 border-black brutalist-card-shadow">
          <div className="w-8 h-8 bg-primary border-2 border-black" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold font-headline-md text-black uppercase truncate tracking-wider">Alex Jensen</p>
            <p className="text-xs font-bold font-label-md text-gray-500 uppercase truncate">Pro Attendee</p>
          </div>
        </div>
      </div>
      </motion.div>
    </>
  );
};
