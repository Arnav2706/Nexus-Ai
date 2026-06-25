import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Search, Star, Filter, UserPlus, X, Mail, Phone, Building } from 'lucide-react';

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
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

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
                      <button 
                        onClick={() => setSelectedLead(lead)}
                        className="text-sm font-bold text-nexus-accent hover:text-white uppercase tracking-wider transition-colors"
                      >
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

      {selectedLead && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-nexus-card border-4 border-black w-full max-w-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 relative"
          >
            <button 
              onClick={() => setSelectedLead(null)}
              className="absolute top-4 right-4 text-nexus-gray hover:text-white"
            >
              <X size={24} />
            </button>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-2">{selectedLead.name}</h2>
            <div className="flex items-center gap-2 mb-6 text-nexus-gray">
              <Building size={16} /> <span className="font-medium uppercase">{selectedLead.role} @ {selectedLead.company}</span>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="bg-nexus-dark border-2 border-black p-4 flex items-center justify-between">
                <span className="text-nexus-gray uppercase font-bold text-sm">AI Match Score</span>
                <div className="flex items-center gap-2">
                  <Star className={`${selectedLead.score > 90 ? 'text-nexus-accent fill-nexus-accent' : 'text-nexus-gray'}`} size={20} />
                  <span className={`font-black text-xl ${selectedLead.score > 90 ? 'text-nexus-accent' : 'text-white'}`}>{selectedLead.score}/100</span>
                </div>
              </div>
              <div className="bg-nexus-dark border-2 border-black p-4">
                <p className="text-white text-sm">Captured on: {new Date(selectedLead.capturedAt).toLocaleString()}</p>
                <p className="text-nexus-gray text-xs mt-2 uppercase font-bold tracking-wider">AWS DynamoDB Record ID: {selectedLead.id}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 bg-nexus-accent text-black border-2 border-black font-black py-3 uppercase tracking-wider hover:bg-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1">
                <Mail className="inline-block mr-2" size={18} /> Email Pitch
              </button>
              <button className="flex-1 bg-white text-black border-2 border-black font-black py-3 uppercase tracking-wider hover:bg-nexus-gray transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1">
                <Phone className="inline-block mr-2" size={18} /> Call
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SponsorPortal;
