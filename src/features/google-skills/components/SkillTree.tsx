import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SkillNode } from '../types';
import { Sword, Lock, CheckCircle2, ExternalLink, PlayCircle } from 'lucide-react';
import { cn } from "@/lib/utils";

interface SkillTreeProps {
  nodes: SkillNode[];
  selectedNodeId: string | null;
  onSelectNode: (id: string) => void;
}

export const SkillTree: React.FC<SkillTreeProps> = ({ nodes, selectedNodeId, onSelectNode }) => {
  const completedCount = nodes.filter(n => n.status === 'completed').length;
  const progress = Math.round((completedCount / (nodes.length || 1)) * 100);

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-end mb-2">
            <h3 className="text-sm font-bold text-primary uppercase tracking-widest">冒険の進捗</h3>
            <span className="text-2xl font-black italic">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-primary/10" />
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        {nodes.map((node) => (
          <Card
            key={node.id}
            className={cn(
              "relative overflow-hidden transition-all cursor-pointer hover:border-primary/50",
              node.status === 'locked' && "opacity-50 grayscale cursor-not-allowed",
              selectedNodeId === node.id && "ring-2 ring-primary border-transparent bg-primary/5"
            )}
            onClick={() => node.status !== 'locked' && onSelectNode(node.id)}
          >
            <CardHeader className="p-4 flex flex-row items-center gap-4">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner",
                node.status === 'completed' ? "bg-emerald-500/20 text-emerald-500" :
                  node.status === 'available' ? "bg-primary/20 text-primary animate-pulse" :
                    "bg-muted text-muted-foreground"
              )}>
                {node.status === 'completed' ? <CheckCircle2 className="w-6 h-6" /> :
                  node.status === 'available' ? <Sword className="w-6 h-6" /> :
                    <Lock className="w-6 h-6" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-black text-primary uppercase tracking-tighter">
                    {node.level}
                  </span>
                  {node.status === 'completed' && (
                    <Badge variant="outline" className="text-[10px] h-4 bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                      Cleared
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg leading-none">{node.title}</CardTitle>
                <CardDescription className="text-xs mt-1 line-clamp-1">{node.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-4 pt-0 space-y-4">
              <div className="flex flex-wrap gap-1.5">
                {node.items.map(item => (
                  <span key={item} className="text-[10px] px-2 py-0.5 rounded bg-muted/50 border border-border/50">
                    {item}
                  </span>
                ))}
              </div>

              {selectedNodeId === node.id && node.courses && node.courses.length > 0 && (
                <div className="pt-4 border-t border-primary/10 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <PlayCircle className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Recommended Courses</span>
                  </div>
                  <div className="grid gap-2">
                    {node.courses.map((course, idx) => (
                      <a
                        key={idx}
                        href={course.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2.5 rounded-lg bg-primary/5 hover:bg-primary/10 border border-primary/10 transition-colors group/link"
                      >
                        <span className="text-xs font-bold text-gray-200 group-hover/link:text-white truncate pr-4">
                          {course.title}
                        </span>
                        <ExternalLink className="w-3 h-3 text-primary opacity-50 group-hover/link:opacity-100 shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
