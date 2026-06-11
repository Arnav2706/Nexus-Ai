import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Calendar, Users, Activity, Settings, Cpu, MapPin, Zap, Network, Briefcase } from 'lucide-react';

const navItems = [
  { name: 'Copilot', path: '/', icon: Cpu },
  { name: 'Schedule', path: '/schedule', icon: Calendar },
  { name: 'Map', path: '/map', icon: MapPin },
  { name: 'Network', path: '/network', icon: Users },
  { name: 'Insights', path: '/insights', icon: Activity },
  { name: 'Graph', path: '/graph', icon: Network },
  { name: 'Memory', path: '/memory', icon: Zap },
  { name: 'Career', path: '/career', icon: Briefcase },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  return (
    <motion.div 
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      className="w-64 h-screen border-r border-white/10 glass-panel flex flex-col p-6 z-10"
    >
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)]">
          <Cpu className="text-white w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">Nexus<span className="text-primary">AI</span></h1>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-primary/10 text-primary border border-primary/20 shadow-[inset_0_0_12px_rgba(59,130,246,0.1)]' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/10">
        <div className="flex items-center gap-3 px-4 py-3 glass-card rounded-xl">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-primary" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Alex Jensen</p>
            <p className="text-xs text-gray-400 truncate">Pro Attendee</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
