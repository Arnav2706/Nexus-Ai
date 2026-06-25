import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Target, TrendingUp, Star } from 'lucide-react';



export const CareerPage: React.FC = () => {
  const [opportunities, setOpportunities] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch('/api/appData?type=career_opportunities')
      .then(res => res.json())
      .then(data => setOpportunities(data))
      .catch(err => console.error('Failed to fetch career opportunities', err));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white flex items-center justify-center border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Briefcase className="w-6 h-6 text-black" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-headline-lg uppercase tracking-wider text-on-background">Career Accelerator</h1>
            <p className="text-primary font-bold font-label-md uppercase bg-black px-2 py-0.5 inline-block border-2 border-black">AI-curated opportunities</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Target, label: 'Opportunities Found', value: '24', color: 'text-black', bg: 'bg-[#00ffff]' },
          { icon: Star, label: 'Top Match Score', value: '94%', color: 'text-black', bg: 'bg-[#a9f131]' },
          { icon: TrendingUp, label: 'Trending Industries', value: 'AI/ML', color: 'text-black', bg: 'bg-[#ff00ff]' },
        ].map(({ icon: Icon, label, value, color, bg }) => (
          <motion.div key={label} whileHover={{ y: -3 }} className={`border-3 border-black p-5 flex items-center gap-4 brutalist-card-shadow ${bg}`}>
            <div className={`p-3 border-3 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
              <Icon className={`w-6 h-6 ${color}`} />
            </div>
            <div>
              <div className={`text-2xl font-bold font-headline-lg uppercase tracking-wider ${color}`}>{value}</div>
              <div className="text-black font-bold font-label-md uppercase">{label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white border-3 border-black brutalist-card-shadow p-6 rounded-none">
        <h2 className="text-xl font-bold font-headline-md uppercase text-black mb-6 flex items-center gap-2">
          <Briefcase className="w-5 h-5" />
          Recommended Opportunities
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-3 border-black bg-gray-100">
                <th className="p-3 font-bold font-label-md uppercase text-black border-r-3 border-black">Company</th>
                <th className="p-3 font-bold font-label-md uppercase text-black border-r-3 border-black">Role</th>
                <th className="p-3 font-bold font-label-md uppercase text-black border-r-3 border-black hidden md:table-cell">Type</th>
                <th className="p-3 font-bold font-label-md uppercase text-black border-r-3 border-black hidden lg:table-cell">Key Contact</th>
                <th className="p-3 font-bold font-label-md uppercase text-black border-r-3 border-black">AI Match</th>
                <th className="p-3 font-bold font-label-md uppercase text-black">Status</th>
              </tr>
            </thead>
            <tbody>
              {opportunities.map((opp) => (
                <tr key={opp.id} className="border-b-3 border-black last:border-b-0 hover:bg-gray-50 transition-colors">
                  <td className="p-3 font-bold font-body-md text-black border-r-3 border-black">{opp.company}</td>
                  <td className="p-3 font-bold font-body-md text-black border-r-3 border-black">{opp.role}</td>
                  <td className="p-3 font-bold font-body-md text-black border-r-3 border-black hidden md:table-cell">{opp.type}</td>
                  <td className="p-3 font-bold font-body-md text-black border-r-3 border-black hidden lg:table-cell">{opp.contact}</td>
                  <td className="p-3 font-bold border-r-3 border-black">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-3 bg-gray-200 border-2 border-black rounded-none overflow-hidden hidden sm:block">
                        <div className="h-full bg-primary" style={{ width: `${opp.match}%` }} />
                      </div>
                      <span className="text-black font-bold font-label-md">{opp.match}%</span>
                    </div>
                  </td>
                  <td className="p-3 font-bold">
                    <span className={`px-2 py-1 text-xs font-bold font-label-sm uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] inline-block ${
                      opp.status === 'Warm Lead' ? 'bg-[#00ffff] text-black' : 'bg-primary text-black'
                    }`}>
                      {opp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border-3 border-black brutalist-card-shadow p-6">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b-3 border-black">
            <Target className="w-5 h-5 text-black" />
            <h3 className="text-xl font-bold font-headline-md uppercase tracking-wider text-black">AI Resume Analyzer</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-gray-100 p-4 border-2 border-black border-dashed flex flex-col items-center justify-center py-8">
              <Briefcase className="w-8 h-8 text-gray-500 mb-2" />
              <p className="font-bold text-gray-900 font-body-md text-center">Drag and drop your latest resume (PDF)</p>
              <button className="mt-4 bg-black text-white px-4 py-2 font-bold uppercase text-xs border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-colors">Upload Resume</button>
            </div>
            <div className="bg-[#a9f131] p-3 border-2 border-black">
              <p className="font-bold text-sm text-black">Current Resume Score: 85/100</p>
              <p className="text-xs text-black font-body-md mt-1">Suggested improvement: Quantify impact in your latest role at TechCorp.</p>
            </div>
          </div>
        </div>

        <div className="bg-white border-3 border-black brutalist-card-shadow p-6">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b-3 border-black">
            <Star className="w-5 h-5 text-black" />
            <h3 className="text-xl font-bold font-headline-md uppercase tracking-wider text-black">Mock Interview Prep</h3>
          </div>
          <div className="space-y-4">
            <p className="text-sm font-bold text-gray-900 leading-relaxed">Practice with our conversational AI agent tuned to your target roles. Get real-time feedback on your answers, tone, and pacing.</p>
            <div className="space-y-2">
              {['System Design (Staff Engineer)', 'Behavioral (All Roles)', 'Product Sense (PM)'].map((topic, i) => (
                <div key={i} className="flex items-center justify-between p-3 border-2 border-black bg-white hover:bg-gray-100 cursor-pointer transition-colors">
                  <span className="font-bold text-black uppercase text-xs">{topic}</span>
                  <button className="bg-black text-white px-3 py-1 text-xs font-bold uppercase hover:bg-[#ff00ff] hover:text-black transition-colors border-2 border-black">Start</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
