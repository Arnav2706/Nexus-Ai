import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Network, ZoomIn, ZoomOut } from 'lucide-react';
import { ParticleCanvas } from '../components/graph/ParticleCanvas';

const nodes = [
  { id: 'llm', label: 'LLMs', x: 50, y: 40, type: 'topic', color: '#8b5cf6' },
  { id: 'startups', label: 'Startups', x: 75, y: 30, type: 'topic', color: '#3b82f6' },
  { id: 'sarah', label: 'Sarah Chen', x: 65, y: 60, type: 'person', color: '#f59e0b' },
  { id: 'healthcare', label: 'Healthcare AI', x: 30, y: 65, type: 'topic', color: '#10b981' },
  { id: 'david', label: 'David Miller', x: 80, y: 70, type: 'person', color: '#f59e0b' },
  { id: 'wasm', label: 'WebAssembly', x: 90, y: 45, type: 'topic', color: '#8b5cf6' },
  { id: 'workshop', label: 'AI Workshop', x: 45, y: 25, type: 'session', color: '#ec4899' },
  { id: 'you', label: 'You', x: 55, y: 52, type: 'self', color: '#38bdf8' },
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 h-full flex flex-col"
    >
      <header className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
            <Network className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Conference Knowledge Graph</h1>
            <p className="text-gray-400">Explore connections between attendees, topics & sessions</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setZoom((z) => Math.min(z + 0.1, 1.5))}
            className="p-2 glass-card rounded-lg hover:bg-white/10"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(z - 0.1, 0.6))}
            className="p-2 glass-card rounded-lg hover:bg-white/10"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="flex-1 glass-panel rounded-3xl overflow-hidden relative min-h-[500px]">
        <ParticleCanvas />

        {/* SVG Graph overlay */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'center', transition: 'transform 0.3s ease' }}
        >
          {/* Edges */}
          {edges.map(([from, to], i) => {
            const f = nodes.find((n) => n.id === from)!;
            const t = nodes.find((n) => n.id === to)!;
            const isActive = hoveredNode === from || hoveredNode === to;
            return (
              <motion.line
                key={i}
                x1={`${f.x}%`} y1={`${f.y}%`}
                x2={`${t.x}%`} y2={`${t.y}%`}
                stroke={isActive ? '#8b5cf6' : 'rgba(255,255,255,0.08)'}
                strokeWidth={isActive ? 1.5 : 0.8}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: i * 0.08 }}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node, i) => (
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
                  fill={`${node.color}30`}
                  stroke={node.color}
                  strokeWidth={hoveredNode === node.id ? 3 : 1.5}
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
                  stroke={node.color}
                  strokeWidth={1}
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
                fill={node.color}
                fontSize={node.type === 'self' ? 16 : 11}
                fontWeight="bold"
              >
                {typeToIcon[node.type]}
              </text>
              <text
                x={`${node.x}%`}
                y={`${node.y + 4.5}%`}
                textAnchor="middle"
                fill="white"
                fontSize={11}
                fontWeight="600"
                style={{ pointerEvents: 'none' }}
              >
                {node.label}
              </text>
            </g>
          ))}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 flex flex-col gap-1.5 glass-card rounded-xl p-3 border border-white/10">
          {[
            { color: '#38bdf8', label: 'You' },
            { color: '#f59e0b', label: 'People' },
            { color: '#8b5cf6', label: 'Topics' },
            { color: '#ec4899', label: 'Sessions' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-2 text-xs text-gray-300">
              <div className="w-3 h-3 rounded-full" style={{ background: color }} />
              {label}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
