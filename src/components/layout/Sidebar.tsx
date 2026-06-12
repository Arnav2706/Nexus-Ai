import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Users, Activity, Settings, Cpu, MapPin, Zap, Network, Briefcase, Flame, Lightbulb, Medal } from 'lucide-react';

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
  { name: 'Settings', path: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  return (
    <motion.div 
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      className="w-64 h-screen border-r-3 border-black bg-white flex flex-col p-6 z-10 text-black overflow-y-auto"
    >
      <div className="flex items-center gap-3 mb-10 mt-2">
        <div className="w-10 h-10 border-3 border-black bg-primary flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Cpu className="text-black w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold font-headline-lg tracking-tight text-black uppercase">Nexus<span className="text-primary mix-blend-difference">AI</span></h1>
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
                  : 'text-gray-600 border-transparent hover:text-black hover:border-black hover:bg-gray-100'
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
  );
};
