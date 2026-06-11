import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, User, Bell, Eye, Palette, Globe, Shield, ChevronRight } from 'lucide-react';
import { Switch } from '@progress/kendo-react-inputs';

const settingsSections = [
  {
    title: 'AI Preferences',
    icon: User,
    color: 'text-primary',
    bg: 'bg-primary/20 border-primary/30',
    settings: [
      { id: 'ai-suggestions', label: 'Proactive AI Suggestions', desc: 'Get intelligent nudges throughout the event', value: true },
      { id: 'personalization', label: 'Deep Personalization', desc: 'Allow AI to learn from your behavior', value: true },
      { id: 'networking-assist', label: 'Networking Assist Mode', desc: 'Trigger prompts when nearby matches detected', value: false },
    ],
  },
  {
    title: 'Notifications',
    icon: Bell,
    color: 'text-amber-400',
    bg: 'bg-amber-500/20 border-amber-500/30',
    settings: [
      { id: 'session-alerts', label: 'Session Countdown Alerts', desc: 'Remind me 10 min before sessions start', value: true },
      { id: 'match-alerts', label: 'New Match Notifications', desc: 'Alert when high-compatibility people are nearby', value: true },
      { id: 'trending-alerts', label: 'Trending Topic Alerts', desc: 'Notify when topics surge in popularity', value: false },
    ],
  },
  {
    title: 'Privacy',
    icon: Shield,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/20 border-emerald-500/30',
    settings: [
      { id: 'visible-profile', label: 'Visible to Other Attendees', desc: 'Let others discover your profile', value: true },
      { id: 'data-sharing', label: 'Analytics Data Sharing', desc: 'Help improve the platform anonymously', value: false },
    ],
  },
];

export const SettingsPage: React.FC = () => {
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
        <div className="w-12 h-12 rounded-2xl bg-gray-500/20 flex items-center justify-center border border-gray-500/30">
          <Settings className="w-6 h-6 text-gray-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-gray-400">Personalize your Nexus AI experience</p>
        </div>
      </header>

      {settingsSections.map((section, si) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: si * 0.1 }}
          className="glass-panel rounded-3xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 rounded-xl border ${section.bg}`}>
              <section.icon className={`w-5 h-5 ${section.color}`} />
            </div>
            <h2 className="text-lg font-bold">{section.title}</h2>
          </div>

          <div className="space-y-1">
            {section.settings.map((setting, i) => (
              <div
                key={setting.id}
                className={`flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors ${i < section.settings.length - 1 ? 'border-b border-white/5' : ''}`}
              >
                <div>
                  <p className="font-medium text-white text-sm">{setting.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{setting.desc}</p>
                </div>
                <Switch
                  checked={toggles[setting.id]}
                  onChange={(e) => setToggles(prev => ({ ...prev, [setting.id]: e.value }))}
                  className="[&_.k-switch-track]:!bg-white/10 [&_.k-switch-track.k-checked]:!bg-primary"
                />
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
        className="glass-panel rounded-3xl p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-indigo-500/20 border border-indigo-500/30">
            <User className="w-5 h-5 text-indigo-400" />
          </div>
          <h2 className="text-lg font-bold">Profile</h2>
        </div>
        <div className="flex items-center gap-5 p-4 bg-white/5 rounded-2xl border border-white/10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-primary flex items-center justify-center text-white text-2xl font-bold">
            A
          </div>
          <div className="flex-1">
            <p className="text-xl font-bold text-white">Alex Jensen</p>
            <p className="text-primary font-medium">Full-Stack Developer & AI Enthusiast</p>
            <p className="text-gray-500 text-sm mt-1">San Francisco, CA · Pro Attendee</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 glass-card rounded-xl text-sm text-gray-300 hover:text-white border border-white/10">
            Edit <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
