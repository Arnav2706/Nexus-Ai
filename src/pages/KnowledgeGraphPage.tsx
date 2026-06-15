import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Network, ZoomIn, ZoomOut, Share2, Copy, CheckCircle2 } from 'lucide-react';
import { ParticleCanvas } from '../components/graph/ParticleCanvas';
import { useToast } from '../contexts/ToastContext';
import { Modal } from '../components/ui/Modal';

const initialNodes = [
  { id: 'llm', label: 'LLMs', x: 50, y: 40, type: 'topic', color: '#00ffff' },
  { id: 'startups', label: 'Startups', x: 75, y: 30, type: 'topic', color: '#ff00ff' },
  { id: 'sarah', label: 'Sarah Chen', x: 65, y: 60, type: 'person', color: '#000000' },
  { id: 'healthcare', label: 'Healthcare AI', x: 30, y: 65, type: 'topic', color: '#a9f131' },
  { id: 'david', label: 'David Miller', x: 80, y: 70, type: 'person', color: '#000000' },
  { id: 'wasm', label: 'WebAssembly', x: 90, y: 45, type: 'topic', color: '#00ffff' },
  { id: 'workshop', label: 'AI Workshop', x: 45, y: 25, type: 'session', color: '#ff00ff' },
  { id: 'you', label: 'You', x: 55, y: 52, type: 'self', color: '#a9f131' },
];

const edges = [
  ['you', 'llm'], ['you', 'startups'], ['you', 'sarah'], ['you', 'workshop'],
  ['sarah', 'llm'], ['sarah', 'healthcare'], ['david', 'wasm'], ['you', 'david'],
  ['workshop', 'llm'],
];

const typeToIcon: Record<string, string> = {
  topic: '●', person: '◆', session: '▲', self: '★',
};

export const KnowledgeGraphPage: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const { addToast } = useToast();
  
  const [graphNodes, setGraphNodes] = useState(initialNodes);
  const [isClustering, setIsClustering] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAutoCluster = () => {
    setIsClustering(true);
    addToast('AI identifying new topic clusters...', 'info');
    setTimeout(() => {
      setGraphNodes(prev => prev.map(n => ({
        ...n,
        x: n.id === 'you' ? n.x : Math.max(10, Math.min(90, n.x + (Math.random() * 30 - 15))),
        y: n.id === 'you' ? n.y : Math.max(10, Math.min(90, n.y + (Math.random() * 30 - 15))),
      })));
      setIsClustering(false);
      addToast('Graph re-clustered successfully!', 'success');
    }, 1500);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://nexus.ai/graph/share/u128d9');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 h-full flex flex-col"
    >
      <header className="flex justify-between items-end shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white flex items-center justify-center border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black">
            <Network className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-headline-lg uppercase tracking-wider text-on-background">Knowledge Graph</h1>
            <p className="text-primary font-bold font-label-md uppercase">Discover hidden connections in conference topics</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsShareOpen(true)}
            className="bg-white border-3 border-black px-4 py-2 text-black text-sm font-bold font-headline-md uppercase tracking-wider flex items-center gap-2 hover:bg-black hover:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors"
          >
            <Share2 className="w-4 h-4" /> Share Map
          </button>
          <button 
            onClick={handleAutoCluster}
            disabled={isClustering}
            className={`bg-white border-3 border-black px-4 py-2 text-sm font-bold font-headline-md uppercase tracking-wider flex items-center gap-2 hover:bg-black hover:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors ${isClustering ? 'text-gray-500' : 'text-black'}`}
          >
            {isClustering ? (
              <div className="w-4 h-4 rounded-full border-2 border-black border-t-primary animate-spin" />
            ) : 'Auto-Cluster'}
          </button>
          <button
            onClick={() => setZoom((z) => Math.min(z + 0.1, 1.5))}
            className="p-2 bg-white border-3 border-black text-black hover:bg-black hover:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(z - 0.1, 0.6))}
            className="p-2 bg-white border-3 border-black text-black hover:bg-black hover:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="flex-1 bg-white border-3 border-black brutalist-card-shadow overflow-hidden relative min-h-[500px] text-black">
        <ParticleCanvas />

        {/* SVG Graph overlay */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'center', transition: 'transform 0.3s ease' }}
        >
          {/* Edges */}
          {edges.map(([from, to], i) => {
            const f = graphNodes.find((n) => n.id === from)!;
            const t = graphNodes.find((n) => n.id === to)!;
            const isActive = hoveredNode === from || hoveredNode === to;
            return (
              <motion.line
                key={i}
                x1={`${f.x}%`} y1={`${f.y}%`}
                x2={`${t.x}%`} y2={`${t.y}%`}
                stroke="#000"
                strokeWidth={isActive ? 4 : 2}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: i * 0.08 }}
              />
            );
          })}

          {/* Nodes */}
          {graphNodes.map((node, i) => (
            <g
              key={node.id}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className="cursor-pointer"
            >
                <motion.circle
                  cx={`${node.x}%`}
                  cy={`${node.y}%`}
                  r={node.type === 'self' ? 22 : 16}
                  fill={node.color}
                  stroke="#000"
                  strokeWidth={3}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: hoveredNode === node.id ? 1.3 : 1,
                    opacity: 1,
                  }}
                  style={{ transformOrigin: `${node.x}% ${node.y}%` }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                />
              {/* Pulse for self node */}
              {node.type === 'self' && (
                <motion.circle
                  cx={`${node.x}%`}
                  cy={`${node.y}%`}
                  r={28}
                  fill="none"
                  stroke="#000"
                  strokeWidth={2}
                  style={{ transformOrigin: `${node.x}% ${node.y}%` }}
                  animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              <text
                x={`${node.x}%`}
                y={`${node.y}%`}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={node.color === '#000000' ? '#fff' : '#000'}
                fontSize={node.type === 'self' ? 16 : 11}
                fontWeight="bold"
              >
                {typeToIcon[node.type]}
              </text>
              <text
                x={`${node.x}%`}
                y={`${node.y + 4.5}%`}
                textAnchor="middle"
                fill="#000"
                fontSize={12}
                fontWeight="bold"
                style={{ pointerEvents: 'none' }}
                className="font-headline-md uppercase"
              >
                {node.label}
              </text>
            </g>
          ))}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 flex flex-col gap-1.5 bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-3 text-black">
          {[
            { color: '#a9f131', label: 'You' },
            { color: '#000000', label: 'People' },
            { color: '#00ffff', label: 'Topics' },
            { color: '#ff00ff', label: 'Sessions' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-2 text-xs font-bold font-label-md uppercase tracking-wider text-black">
              <div className="w-4 h-4 border-2 border-black" style={{ background: color }} />
              {label}
            </div>
          ))}
        </div>

        {/* Selected Node Panel */}
        {hoveredNode && graphNodes.find(n => n.id === hoveredNode)?.type !== 'self' && (
          <div className="absolute top-4 right-4 w-64 bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 text-black z-20 pointer-events-none">
            <h3 className="text-lg font-bold font-headline-md uppercase mb-2 border-b-2 border-black pb-2">
              {graphNodes.find(n => n.id === hoveredNode)?.label}
            </h3>
            <div className="space-y-2">
              <p className="text-xs font-bold text-gray-900 uppercase">Type: {graphNodes.find(n => n.id === hoveredNode)?.type}</p>
              <p className="text-xs font-bold text-black bg-[#a9f131] border-2 border-black inline-block px-1">Relevance: High</p>
              <p className="text-xs font-bold font-body-md text-gray-900 mt-2 leading-relaxed">
                This entity shares strong structural similarity with your background in AI and software engineering.
              </p>
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        title={<><Share2 className="w-6 h-6 text-black" /> Share Knowledge Map</>}
      >
        <div className="space-y-6">
          <p className="text-black font-bold font-body-md text-sm">
            Share this interactive visualization of your conference connections. Anyone with the link can explore your public topic clusters.
          </p>
          
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-100 border-2 border-black p-3 text-sm font-bold text-black font-mono truncate">
              https://nexus.ai/graph/share/u128d9
            </div>
            <button
              onClick={handleCopyLink}
              className={`p-3 border-3 border-black flex items-center justify-center transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${copied ? 'bg-primary text-black hover:bg-primary' : 'bg-white text-black hover:bg-black hover:text-white'}`}
            >
              {copied ? <CheckCircle2 className="w-5 h-5 stroke-black stroke-2" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};
