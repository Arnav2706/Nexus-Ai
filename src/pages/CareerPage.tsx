import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Target, TrendingUp, Star } from 'lucide-react';
import { Grid, GridColumn, GridCellProps } from '@progress/kendo-react-grid';

const opportunities = [
  { id: 1, company: 'DeepMind', role: 'Research Scientist', match: 94, type: 'Research', contact: 'Dr. Elena Sato', status: 'Active' },
  { id: 2, company: 'Andreessen Horowitz', role: 'AI Portfolio Advisor', match: 88, type: 'Investing', contact: 'Mark Chen', status: 'Warm Lead' },
  { id: 3, company: 'Vercel', role: 'Staff Engineer', match: 82, type: 'Engineering', contact: 'Sarah Kim', status: 'Active' },
  { id: 4, company: 'Hugging Face', role: 'Developer Advocate', match: 76, type: 'DevRel', contact: 'Tom Wright', status: 'Active' },
];

const StatusCell = (props: GridCellProps) => {
  const status = props.dataItem.status;
  return (
    <td className="!border-b !border-white/5 !bg-transparent">
      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
        status === 'Warm Lead'
          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
      }`}>
        {status}
      </span>
    </td>
  );
};

const MatchCell = (props: GridCellProps) => (
  <td className="!border-b !border-white/5 !bg-transparent">
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full" style={{ width: `${props.dataItem.match}%` }} />
      </div>
      <span className="text-white text-sm font-bold">{props.dataItem.match}%</span>
    </div>
  </td>
);

export const CareerPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <header className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-teal-500/20 flex items-center justify-center border border-teal-500/30">
          <Briefcase className="w-6 h-6 text-teal-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Career Accelerator</h1>
          <p className="text-gray-400">AI-curated opportunities based on your profile</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Target, label: 'Opportunities Found', value: '24', color: 'text-teal-400', bg: 'bg-teal-500/20 border-teal-500/30' },
          { icon: Star, label: 'Top Match Score', value: '94%', color: 'text-amber-400', bg: 'bg-amber-500/20 border-amber-500/30' },
          { icon: TrendingUp, label: 'Trending Industries', value: 'AI/ML', color: 'text-primary', bg: 'bg-primary/20 border-primary/30' },
        ].map(({ icon: Icon, label, value, color, bg }) => (
          <motion.div key={label} whileHover={{ y: -3 }} className={`glass-panel rounded-2xl p-5 flex items-center gap-4 border ${bg}`}>
            <div className={`p-3 rounded-xl ${bg}`}>
              <Icon className={`w-6 h-6 ${color}`} />
            </div>
            <div>
              <div className={`text-2xl font-bold ${color}`}>{value}</div>
              <div className="text-gray-400 text-sm">{label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass-panel rounded-3xl p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-teal-400" />
          Recommended Opportunities
        </h2>
        <div className="[&_.k-grid]:!bg-transparent [&_.k-grid]:!border-none [&_.k-grid-header]:!bg-white/5 [&_.k-grid-header]:!border-white/10 [&_.k-table-th]:!text-gray-400 [&_.k-table-th]:!border-none [&_.k-table-th]:!bg-transparent [&_.k-grid-content]:!bg-transparent [&_.k-table-td]:!text-white [&_.k-table-td]:!border-white/5">
          <Grid data={opportunities}>
            <GridColumn field="company" title="Company" />
            <GridColumn field="role" title="Role" />
            <GridColumn field="type" title="Type" />
            <GridColumn field="contact" title="Key Contact" />
            <GridColumn field="match" title="AI Match" cells={{ data: MatchCell }} />
            <GridColumn field="status" title="Status" cells={{ data: StatusCell }} />
          </Grid>
        </div>
      </div>
    </motion.div>
  );
};
