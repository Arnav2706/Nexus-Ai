import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart, Users, Cpu, ShieldCheck } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-black font-sans overflow-x-hidden selection:bg-nexus-accent selection:text-black">
      
      {/* Brutalist Navbar */}
      <nav className="relative z-10 w-full px-4 md:px-8 py-6 flex items-center justify-between border-b-4 border-black bg-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-black flex items-center justify-center text-white font-black text-xl tracking-tighter shadow-[4px_4px_0px_0px_rgba(204,255,0,1)]">
            NX
          </div>
          <span className="font-black text-2xl uppercase tracking-tighter">Nexus<span className="text-nexus-accent drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">AI</span></span>
        </div>
        <Link 
          to="/login"
          className="hidden md:flex px-6 py-2 border-3 border-black bg-white font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
        >
          Enterprise Portal <ArrowRight size={16} />
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col justify-center px-4 md:px-16 lg:px-24 min-h-[75vh] border-b-4 border-black bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white border-4 border-black p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-5xl"
        >
          <div className="inline-block bg-nexus-accent text-black font-black uppercase tracking-widest text-xs px-3 py-1 border-2 border-black mb-6">
            B2B Enterprise SaaS
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8 text-black">
            Monetize <br />
            <span className="text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] [-webkit-text-stroke:2px_black]">Every Interaction.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-black font-medium mb-12 leading-relaxed max-w-3xl border-l-4 border-nexus-accent pl-6">
            Nexus-AI is the ultimate B2B platform for event organizers and corporate sponsors. We transform chaotic conferences into predictable revenue engines using AWS Bedrock AI and DynamoDB at Vercel scale.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <Link to="/login" className="flex-1 text-center bg-black text-white font-black uppercase py-4 md:py-5 text-lg border-3 border-black hover:bg-nexus-accent hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5">
              Login as Sponsor
            </Link>
            <Link to="/login" className="flex-1 text-center bg-white text-black font-black uppercase py-4 md:py-5 text-lg border-3 border-black hover:bg-gray-100 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5">
              Login as Organizer
            </Link>
          </div>
        </motion.div>
      </main>
      
      {/* What We Deliver Section */}
      <section className="relative z-10 px-4 md:px-16 lg:px-24 py-32 bg-black text-white border-b-4 border-black">
        <div className="flex flex-col lg:flex-row gap-16 max-w-7xl mx-auto">
          <div className="lg:w-1/3">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight">
              Enterprise <br />
              <span className="text-nexus-accent">Value Prop.</span>
            </h2>
            <p className="mt-6 text-gray-400 font-medium text-lg border-l-2 border-gray-700 pl-4">
              Stop guessing. Start measuring. We give you the AWS-powered infrastructure to score leads, measure booth ROI, and secure your event data.
            </p>
          </div>
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { 
                icon: <Cpu className="w-8 h-8 text-nexus-accent mb-4" />, 
                title: 'AI Lead Scoring', 
                desc: 'Amazon Bedrock analyzes attendee conversations in real-time, instantly routing high-value prospects to your sales team.' 
              },
              { 
                icon: <BarChart className="w-8 h-8 text-nexus-accent mb-4" />, 
                title: 'Organizer ROI', 
                desc: 'Give your sponsors hard data. Track exact booth engagement times and networking density to justify premium ticket pricing.' 
              },
              { 
                icon: <Users className="w-8 h-8 text-nexus-accent mb-4" />, 
                title: 'B2B Sponsor Portal', 
                desc: 'A dedicated, secure workspace for sponsors to export CSVs, manage their captured leads, and contact VIPs instantly.' 
              },
              { 
                icon: <ShieldCheck className="w-8 h-8 text-nexus-accent mb-4" />, 
                title: 'AWS Security', 
                desc: 'Fully secured by AWS Cognito and DynamoDB. Enterprise-grade compliance out of the box.' 
              }
            ].map((item, i) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-zinc-900 border-2 border-zinc-700 p-8 hover:border-nexus-accent transition-colors group"
              >
                {item.icon}
                <h3 className="text-xl font-black tracking-tight mb-3 uppercase group-hover:text-nexus-accent transition-colors">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="py-24 px-4 md:px-16 text-center bg-nexus-accent border-t-4 border-black">
        <h2 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tighter mb-8">Ready to Scale?</h2>
        <Link to="/login" className="inline-flex items-center gap-3 bg-black text-white font-black uppercase px-8 py-5 text-xl border-4 border-black hover:bg-white hover:text-black transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2">
          Access the Portal <ArrowRight size={24} />
        </Link>
      </footer>
    </div>
  );
};
