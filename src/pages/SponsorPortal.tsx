import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Search, Star, Filter, UserPlus } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  company: string;
  role: string;
  score: number;
  capturedAt: string;
}

const SponsorPortal: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch('/api/leads');
        if (res.ok) {
          const data = await res.json();
          setLeads(data);
        } else {
          // Mock data if API is not deployed
          setLeads([
            { id: '1', name: 'Alice Chen', company: 'TechCorp', role: 'CTO', score: 95, capturedAt: new Date().toISOString() },
            { id: '2', name: 'Bob Smith', company: 'DataSystems', role: 'Lead Architect', score: 88, capturedAt: new Date().toISOString() },
            { id: '3', name: 'Charlie Davis', company: 'CloudNet', role: 'VP Engineering', score: 72, capturedAt: new Date().toISOString() },
          ]);
        }
      } catch (err) {
        setLeads([
          { id: '1', name: 'Alice Chen', company: 'TechCorp', role: 'CTO', score: 95, capturedAt: new Date().toISOString() },
          { id: '2', name: 'Bob Smith', company: 'DataSystems', role: 'Lead Architect', score: 88, capturedAt: new Date().toISOString() },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  return (
    <div className="p-4 md:p-8 space-y-8 pb-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-2">Sponsor Portal</h1>
          <p className="text-nexus-gray font-medium">AI-Qualified Lead Retrieval (Powered by AWS)</p>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-nexus-card border-2 border-nexus-border text-white font-bold uppercase tracking-wider hover:bg-nexus-dark transition-colors flex items-center gap-2 rounded-sm shadow-brutal">
            <UserPlus size={18} /> Add Lead
          </button>
          <button className="px-4 py-2 bg-nexus-accent border-2 border-transparent hover:border-black text-black font-bold uppercase tracking-wider hover:bg-white transition-colors flex items-center gap-2 rounded-sm shadow-brutal">
            <Download size={18} /> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-nexus-card border-2 border-nexus-border rounded-sm shadow-brutal overflow-hidden">
        <div className="p-4 border-b-2 border-nexus-border flex flex-col sm:flex-row gap-4 justify-between bg-black/20">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-nexus-gray" size={18} />
            <input 
              type="text" 
              placeholder="Search leads..." 
              className="w-full bg-nexus-dark border-2 border-nexus-border text-white px-10 py-2 rounded-sm focus:outline-none focus:border-nexus-accent"
            />
          </div>
          <button className="px-4 py-2 bg-nexus-dark border-2 border-nexus-border text-white flex items-center gap-2 hover:bg-nexus-border transition-colors rounded-sm">
            <Filter size={18} /> Filter
          </button>
        </div>

        {loading ? (
          <div className="p-12 flex justify-center items-center">
             <div className="w-8 h-8 border-4 border-nexus-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-nexus-dark text-nexus-gray uppercase text-xs tracking-wider border-b-2 border-nexus-border">
                  <th className="p-4 font-bold">Name</th>
                  <th className="p-4 font-bold">Company & Role</th>
                  <th className="p-4 font-bold">AI Match Score</th>
                  <th className="p-4 font-bold">Captured</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, idx) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={lead.id} 
                    className="border-b border-nexus-border hover:bg-nexus-dark/50 transition-colors"
                  >
                    <td className="p-4 font-bold text-white">{lead.name}</td>
                    <td className="p-4">
                      <div className="text-white font-medium">{lead.company}</div>
                      <div className="text-nexus-gray text-sm">{lead.role}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Star className={`${lead.score > 90 ? 'text-nexus-accent fill-nexus-accent' : 'text-nexus-gray'}`} size={16} />
                        <span className={`font-bold ${lead.score > 90 ? 'text-nexus-accent' : 'text-white'}`}>{lead.score}/100</span>
                      </div>
                    </td>
                    <td className="p-4 text-nexus-gray text-sm">
                      {new Date(lead.capturedAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <button className="text-sm font-bold text-nexus-accent hover:text-white uppercase tracking-wider transition-colors">
                        View Details
                      </button>
                    </td>
                  </motion.tr>
                ))}
                {leads.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-nexus-gray font-medium">No leads captured yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SponsorPortal;
