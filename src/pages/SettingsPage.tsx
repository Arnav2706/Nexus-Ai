import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, User, Bell, Shield, ChevronRight } from 'lucide-react';
import { Switch } from '@progress/kendo-react-inputs';
import { useToast } from '../contexts/ToastContext';

const settingsSections = [
  {
    title: 'AI Preferences',
    icon: User,
    color: 'text-black',
    bg: 'bg-primary border-black',
    settings: [
      { id: 'ai-suggestions', label: 'Proactive AI Suggestions', desc: 'Get intelligent nudges throughout the event', value: true },
      { id: 'personalization', label: 'Deep Personalization', desc: 'Allow AI to learn from your behavior', value: true },
      { id: 'networking-assist', label: 'Networking Assist Mode', desc: 'Trigger prompts when nearby matches detected', value: false },
    ],
  },
  {
    title: 'Notifications',
    icon: Bell,
    color: 'text-black',
    bg: 'bg-[#ff00ff] border-black',
    settings: [
      { id: 'session-alerts', label: 'Session Countdown Alerts', desc: 'Remind me 10 min before sessions start', value: true },
      { id: 'match-alerts', label: 'New Match Notifications', desc: 'Alert when high-compatibility people are nearby', value: true },
      { id: 'trending-alerts', label: 'Trending Topic Alerts', desc: 'Notify when topics surge in popularity', value: false },
    ],
  },
  {
    title: 'Privacy',
    icon: Shield,
    color: 'text-black',
    bg: 'bg-[#00ffff] border-black',
    settings: [
      { id: 'visible-profile', label: 'Visible to Other Attendees', desc: 'Let others discover your profile', value: true },
      { id: 'data-sharing', label: 'Analytics Data Sharing', desc: 'Help improve the platform anonymously', value: false },
    ],
  },
];

export const SettingsPage: React.FC = () => {
  const { addToast } = useToast();
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(
      settingsSections.flatMap(s => s.settings.map(item => [item.id, item.value]))
    )
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 max-w-3xl mx-auto"
    >
      <header className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-white flex items-center justify-center border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Settings className="w-6 h-6 text-black" />
        </div>
        <div>
          <h1 className="text-3xl font-bold font-headline-lg uppercase tracking-wider text-on-background">Settings</h1>
          <p className="text-primary font-bold font-label-md uppercase">Personalize your Nexus AI experience</p>
        </div>
      </header>

      {settingsSections.map((section, si) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: si * 0.1 }}
          className="bg-white border-3 border-black brutalist-card-shadow rounded-none p-6 text-black"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 border-3 ${section.bg} shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
              <section.icon className={`w-6 h-6 ${section.color}`} />
            </div>
            <h2 className="text-2xl font-bold font-headline-lg uppercase tracking-wider">{section.title}</h2>
          </div>

          <div className="space-y-4">
            {section.settings.map((setting) => (
              <div
                key={setting.id}
                className={`flex items-center justify-between p-4 bg-gray-100 border-2 border-black hover:translate-x-[2px] hover:translate-y-[2px] transition-transform`}
              >
                <div>
                  <p className="font-bold font-headline-md uppercase text-sm tracking-wider">{setting.label}</p>
                  <p className="text-xs font-bold font-body-md text-gray-700 mt-1">{setting.desc}</p>
                </div>
                <div className="border-2 border-black p-1 bg-white">
                  <Switch
                    checked={toggles[setting.id]}
                    onChange={(e) => setToggles(prev => ({ ...prev, [setting.id]: e.value }))}
                    className="[&_.k-switch-track]:!bg-gray-300 [&_.k-switch-track.k-checked]:!bg-black [&_.k-switch-thumb]:!bg-white [&_.k-switch-thumb]:!border-2 [&_.k-switch-thumb]:!border-black"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Profile card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-white border-3 border-black brutalist-card-shadow rounded-none p-6 text-black"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 border-3 border-black bg-primary shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <User className="w-6 h-6 text-black" />
          </div>
          <h2 className="text-2xl font-bold font-headline-lg uppercase tracking-wider">Profile</h2>
        </div>
        <div className="flex items-center gap-5 p-4 bg-gray-100 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="w-20 h-20 border-3 border-black bg-white flex items-center justify-center text-black text-3xl font-bold font-headline-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            AJ
          </div>
          <div className="flex-1">
            <p className="text-xl font-bold font-headline-md uppercase tracking-wider">Alex Jensen</p>
            <p className="text-black font-bold font-label-md uppercase bg-primary inline-block px-2 py-1 border-2 border-black mt-2">Full-Stack Developer & AI Enthusiast</p>
            <p className="text-gray-700 text-xs font-bold font-body-md mt-2 uppercase tracking-wider">San Francisco, CA · Pro Attendee</p>
          </div>
          <button onClick={() => addToast('Feature in development', 'warning')} className="flex items-center gap-2 px-6 py-3 bg-white border-3 border-black hover:bg-black hover:text-white font-bold font-headline-md uppercase text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
            Edit <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
