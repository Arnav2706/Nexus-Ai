import React from 'react';
import { motion } from 'framer-motion';
import { Flame, TrendingUp, MessageSquare, Users, Heart, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const trendingTopics = [
  { topic: 'Generative AI', mentions: 340, delta: '+22%', hot: true },
  { topic: 'LLM Fine-tuning', mentions: 210, delta: '+18%', hot: true },
  { topic: 'Developer Experience', mentions: 132, delta: '+14%', hot: false },
];

const engagementScores = [72, 84, 95, 88, 91, 78, 96];
const categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const engagementData = categories.map((cat, i) => ({ name: cat, value: engagementScores[i] }));

export const PulseDashboard: React.FC = () => {
  const overallHealth = 91;

  const [isExpanded, setIsExpanded] = React.useState(false);

  const extendedTopics = [
    ...trendingTopics,
    { topic: 'Agentic Workflows', mentions: 110, delta: '+25%', hot: true },
    { topic: 'RAG Architecture', mentions: 95, delta: '+5%', hot: false },
    { topic: 'AI Safety', mentions: 88, delta: '+12%', hot: false },
  ];

  const topicsToShow = isExpanded ? extendedTopics : trendingTopics;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <header className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-white flex items-center justify-center border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Flame className="w-6 h-6 text-black" />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold font-headline-lg uppercase tracking-wider text-on-background">Event Pulse Dashboard</h1>
          <p className="text-primary font-bold font-label-md uppercase">Real-time conference health & engagement metrics</p>
        </div>
        {/* Health Score widget */}
        <div className="flex items-center gap-3 bg-white px-5 py-3 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black rounded-none">
          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 -rotate-90">
              <circle cx="32" cy="32" r="28" fill="none" stroke="#e5e7eb" strokeWidth="6" />
              <circle
                cx="32" cy="32" r="28" fill="none"
                stroke="#000" strokeWidth="6"
                strokeDasharray={`${2 * Math.PI * 28 * overallHealth / 100} ${2 * Math.PI * 28}`}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-lg font-bold font-headline-md">{overallHealth}</span>
          </div>
          <div>
            <div className="text-sm font-bold font-label-md uppercase tracking-wider">Health Score</div>
            <div className="text-xs font-bold bg-primary text-black border-2 border-black px-1 uppercase inline-block mt-1">Excellent 🔥</div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border-3 border-black brutalist-card-shadow rounded-none p-6 text-black">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-bold font-headline-lg uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-black" /> Trending Topics
            </h2>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm font-bold font-label-md uppercase tracking-wider text-black bg-white hover:bg-black hover:text-white border-2 border-black px-3 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors flex items-center gap-1"
            >
              {isExpanded ? 'Show less' : 'See all'} <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
            </button>
          </div>
          <div className="space-y-3">
            {topicsToShow.map((t, i) => (
              <motion.div
                key={t.topic}
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto' }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 p-3 bg-gray-100 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                {t.hot ? <Flame className="w-5 h-5 text-black shrink-0 fill-primary" /> : <div className="w-5 h-5" />}
                <span className="font-bold font-headline-md uppercase text-black flex-1">{t.topic}</span>
                <div className="flex-1 h-4 bg-white border-2 border-black rounded-none overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(t.mentions / 340) * 100}%` }}
                    transition={{ duration: 1, delay: i * 0.05 }}
                    className="h-full bg-black"
                  />
                </div>
                <span className="text-black font-bold font-headline-md text-sm w-10 text-right">{t.mentions}</span>
                <span className="text-black font-bold font-label-md bg-primary border-2 border-black px-1 text-sm w-14 text-center">{t.delta}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 -ml-4 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.1)" />
                <XAxis dataKey="name" stroke="#000" tick={{ fill: '#000', fontWeight: 'bold', fontSize: 12, fontFamily: 'JetBrains Mono' }} />
                <YAxis stroke="#000" tick={{ fill: '#000', fontWeight: 'bold', fontSize: 12, fontFamily: 'JetBrains Mono' }} domain={[50, 100]} />
                <Bar dataKey="value" fill="#000" barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { icon: Users, label: 'Active Attendees', value: '2,847', color: 'bg-[#a9f131]', trend: '+12 online' },
            { icon: MessageSquare, label: 'Conversations', value: '342', color: 'bg-[#00ffff]', trend: 'Peak hour' },
            { icon: Heart, label: 'Avg Session Rating', value: '4.8/5', color: 'bg-[#ff00ff]', trend: 'Top 10% ever' },
          ].map(({ icon: Icon, label, value, color, trend }) => (
            <motion.div key={label} whileHover={{ scale: 1.02 }} className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none p-5 text-black">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${color}`}>
                  <Icon className="w-5 h-5 text-black" />
                </div>
                <span className="text-sm font-bold font-label-md uppercase text-black">{label}</span>
              </div>
              <div className="text-4xl font-bold font-headline-lg uppercase tracking-wider text-black">{value}</div>
              <div className="text-xs font-bold font-label-sm uppercase bg-gray-100 border-2 border-black inline-block px-2 py-1 mt-2 text-black">{trend}</div>
            </motion.div>
          ))}
        </div>
          <div className="bg-white border-3 border-black brutalist-card-shadow rounded-none p-5 text-black">
            <h3 className="font-bold font-headline-md uppercase tracking-wider mb-4 border-b-2 border-black pb-2">AI Sentiment Analysis</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-bold uppercase mb-1">
                  <span>Positive</span>
                  <span>78%</span>
                </div>
                <div className="h-2 w-full bg-gray-200 border-2 border-black relative">
                  <div className="absolute top-0 left-0 h-full bg-[#a9f131]" style={{ width: '78%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold uppercase mb-1">
                  <span>Neutral</span>
                  <span>15%</span>
                </div>
                <div className="h-2 w-full bg-gray-200 border-2 border-black relative">
                  <div className="absolute top-0 left-0 h-full bg-[#00ffff]" style={{ width: '15%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold uppercase mb-1">
                  <span>Critical</span>
                  <span>7%</span>
                </div>
                <div className="h-2 w-full bg-gray-200 border-2 border-black relative">
                  <div className="absolute top-0 left-0 h-full bg-[#ff00ff]" style={{ width: '7%' }} />
                </div>
              </div>
            </div>
            <p className="text-xs font-bold text-gray-900 mt-4 italic font-body-md">"Attendees are highly praising the seamless registration and networking features."</p>
          </div>
        </div>
    </motion.div>
  );
};
