import React from 'react';
import { motion } from 'framer-motion';
import { Blocks, Link as LinkIcon, Cpu, Zap, Lock } from 'lucide-react';

import * as Icons from 'lucide-react';

export const IntegrationsPage: React.FC = () => {
  const [integrations, setIntegrations] = React.useState<any[]>([]);
  const [models, setModels] = React.useState<any[]>([]);

  React.useEffect(() => {
    Promise.all([
      fetch('/api/appData?type=integrations_apps').then(r => r.json()),
      fetch('/api/appData?type=integrations_models').then(r => r.json())
    ]).then(([appsData, modelsData]) => {
      setIntegrations(appsData);
      setModels(modelsData);
    }).catch(err => console.error('Failed to fetch integrations data', err));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <header className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-white flex items-center justify-center border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Blocks className="w-6 h-6 text-black" />
        </div>
        <div>
          <h1 className="text-3xl font-bold font-headline-lg uppercase tracking-wider text-on-background">Integrations & Models</h1>
          <p className="text-primary font-bold font-label-md uppercase bg-black px-2 py-0.5 inline-block border-2 border-black mt-1">Extensible architecture</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Apps & Integrations */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b-3 border-black pb-4">
            <LinkIcon className="w-6 h-6 text-on-background" />
            <h2 className="text-2xl font-bold font-headline-lg uppercase text-on-background tracking-wider">Connected Apps</h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {integrations.map((app) => (
              <div key={app.id} className="bg-white border-3 border-black p-4 brutalist-card-shadow flex items-center gap-4">
                <div className={`w-12 h-12 ${app.color} border-2 border-black flex items-center justify-center text-white`}>
                  {(() => {
                    const Icon = Icons[app.icon as keyof typeof Icons] as any;
                    return Icon ? <Icon className="w-6 h-6" /> : null;
                  })()}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold font-headline-md text-black uppercase">{app.name}</h3>
                  <p className="text-sm font-bold text-gray-900">{app.desc}</p>
                </div>
                <div>
                  {app.status === 'Connected' ? (
                    <span className="px-3 py-1 bg-primary border-2 border-black text-black font-bold text-xs uppercase">Connected</span>
                  ) : (
                    <button className="px-3 py-1 bg-white hover:bg-black hover:text-white border-2 border-black text-black font-bold text-xs uppercase transition-colors">Connect</button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full py-4 bg-white border-3 border-black text-black font-bold uppercase hover:bg-primary brutalist-button-shadow transition-all text-sm flex justify-center items-center gap-2">
            <Blocks className="w-5 h-5" /> Browse App Directory
          </button>
        </div>

        {/* AI Models */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b-3 border-black pb-4">
            <Cpu className="w-6 h-6 text-on-background" />
            <h2 className="text-2xl font-bold font-headline-lg uppercase text-on-background tracking-wider">AI Model Selection</h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {models.map((model) => (
              <div key={model.id} className="bg-white border-3 border-black p-4 brutalist-card-shadow relative overflow-hidden">
                {model.active && (
                  <div className="absolute top-0 right-0 bg-[#a9f131] border-l-2 border-b-2 border-black px-2 py-1 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-black" fill="currentColor" />
                    <span className="text-[10px] font-bold text-black uppercase tracking-wider">Active Engine</span>
                  </div>
                )}
                
                <div className="flex items-start gap-4 mt-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold font-headline-md text-black uppercase">{model.name}</h3>
                      {model.type === 'Local' && <Lock className="w-4 h-4 text-gray-600" />}
                    </div>
                    <p className="text-sm font-bold text-gray-900 mb-3">{model.desc}</p>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 border-2 border-black bg-gray-100 uppercase">{model.type}</span>
                      {!model.active && (
                        <button className="text-xs font-bold px-3 py-0.5 border-2 border-black bg-white hover:bg-black hover:text-white uppercase transition-colors">
                          Switch to {model.id}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-primary border-3 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mt-6">
            <h4 className="font-bold text-black uppercase mb-2">Future Architecture</h4>
            <p className="text-sm text-black font-bold">Nexus AI is designed to be model-agnostic. Support for custom fine-tuned weights and local-only deployments is available for enterprise clients to ensure 100% data privacy.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
