import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';



export const MapPage: React.FC = () => {
  const [hotspots, setHotspots] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch('/api/appData?type=map_hotspots')
      .then(res => res.json())
      .then(data => setHotspots(data))
      .catch(err => console.error('Failed to fetch map hotspots', err));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 h-full flex flex-col"
    >
      <header className="flex items-center gap-4 mb-4 shrink-0">
        <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
          <MapPin className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Live Event Heatmap</h1>
          <p className="text-gray-400">Real-time venue occupancy and hotspots</p>
        </div>
      </header>

      <div className="flex-1 glass-panel rounded-3xl p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[600px]">
        <div className="relative w-full max-w-4xl aspect-video border-2 border-white/10 rounded-2xl bg-surface/50 overflow-hidden backdrop-blur-xl">
          {/* Scanner animation */}
          <motion.div
            animate={{ x: ['0%', '100%', '0%'] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-primary/20 to-transparent skew-x-12"
          />

          {/* Hotspots */}
          {hotspots.map((spot, index) => (
            <motion.div
              key={spot.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.2, type: 'spring' }}
              className="absolute group"
              style={{ left: spot.x, top: spot.y }}
            >
              <motion.div
                animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                className={`absolute inset-0 rounded-full ${
                  spot.intensity === 'high' ? 'bg-red-500' :
                  spot.intensity === 'medium' ? 'bg-amber-500' : 'bg-green-500'
                }`}
              />
              <div className={`relative w-6 h-6 rounded-full flex items-center justify-center z-10 ${
                spot.intensity === 'high' ? 'bg-red-500' :
                spot.intensity === 'medium' ? 'bg-amber-500' : 'bg-green-500'
              }`}>
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
              <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-surface border border-white/10 px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <p className="text-white font-bold text-sm">{spot.name}</p>
                <p className="text-xs text-gray-400">{spot.label}</p>
              </div>
            </motion.div>
          ))}

          {/* User location */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute left-[300px] top-[200px]"
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.6)]">
              <Navigation className="w-4 h-4 text-white" />
            </div>
            <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-primary/20 text-primary border border-primary/30 px-2 py-1 rounded text-xs font-bold whitespace-nowrap">
              You are here
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
