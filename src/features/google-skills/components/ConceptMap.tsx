import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SkillNode } from '../types';
import { Network, Zap } from 'lucide-react';

interface ConceptMapProps {
  nodes: SkillNode[];
}

export const ConceptMap: React.FC<ConceptMapProps> = ({ nodes }) => {
  return (
    <Card className="h-full bg-card/30 backdrop-blur-md border-border/50 overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <pattern id="dot-grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.5" fill="currentColor" />
          </pattern>
          <rect width="100" height="100" fill="url(#dot-grid)" />
        </svg>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2 text-muted-foreground uppercase tracking-widest">
          <Network className="w-4 h-4" /> Concept Network
        </CardTitle>
      </CardHeader>

      <CardContent className="relative h-[300px] flex items-center justify-center">
        <div className="relative w-full max-w-md aspect-square">
          {nodes.map((node, i) => {
            const angle = (i / nodes.length) * 2 * Math.PI;
            const x = 50 + 35 * Math.cos(angle);
            const y = 50 + 35 * Math.sin(angle);

            return (
              <div
                key={node.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                style={{ left: `${x.toFixed(2)}%`, top: `${y.toFixed(2)}%` }}
              >
                <div className={`p-2 rounded-full border-2 bg-background shadow-lg transition-transform hover:scale-110 ${node.status === 'completed' ? 'border-emerald-500 text-emerald-500' :
                    node.status === 'available' ? 'border-primary text-primary shadow-primary/20' :
                      'border-muted text-muted-foreground opacity-50'
                  }`}>
                  <Zap className="w-4 h-4" />
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap text-[10px] font-bold uppercase tracking-tighter">
                  {node.title}
                </div>
              </div>
            );
          })}

          {/* Central Core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-4 border-primary/20 bg-primary/5 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-primary/20 animate-pulse" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
