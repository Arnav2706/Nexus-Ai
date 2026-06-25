import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

import * as Icons from 'lucide-react';

export const WowFeatures: React.FC = () => {
  const [wowCards, setWowCards] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch('/api/appData?type=wow_features')
      .then(res => res.json())
      .then(data => setWowCards(data))
      .catch(err => console.error('Failed to fetch wow features', err));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <header className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-white flex items-center justify-center border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Lightbulb className="w-6 h-6 text-black" />
        </div>
        <div>
          <h1 className="text-3xl font-bold font-headline-lg uppercase tracking-wider text-on-background">Special WOW Features</h1>
          <p className="text-primary font-bold font-label-md uppercase">Experimental AI capabilities that redefine what's possible</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {wowCards.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12 }}
            className={`bg-white border-3 border-black brutalist-card-shadow rounded-none p-8 relative overflow-hidden group hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all`}
          >
            <div className="flex items-center justify-between mb-6 border-b-3 border-black pb-4">
              <span className={`px-3 py-1 text-xs font-bold font-label-md uppercase tracking-wider border-2 ${card.badgeColor}`}>
                {card.badge}
              </span>
              <span className="flex items-center gap-2 text-xs font-bold font-label-md uppercase tracking-wider text-black">
                <span className="relative flex h-3 w-3 border-2 border-black bg-primary">
                </span>
                {card.status}
              </span>
            </div>

            <div className={`w-16 h-16 border-3 border-black ${card.color} flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all`}>
              {(() => {
                const Icon = Icons[card.icon as keyof typeof Icons] as any;
                return Icon ? <Icon className="w-8 h-8 text-black" /> : null;
              })()}
            </div>

            <h3 className="text-2xl font-bold font-headline-lg uppercase text-black mb-3">{card.title}</h3>
            <p className="text-base font-bold font-headline-md text-black mb-4 leading-snug bg-gray-100 p-3 border-2 border-black">{card.subtitle}</p>
            <p className="text-sm font-bold font-body-md text-gray-900 leading-relaxed">{card.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
