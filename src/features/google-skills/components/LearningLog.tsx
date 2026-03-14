import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { LearningLogEntry, SkillNode } from '../types';
import { BookOpen, Save, Send } from 'lucide-react';
import { toast } from 'sonner';

interface LearningLogProps {
  selectedNode: SkillNode | null;
  log: LearningLogEntry | null;
  onUpdateLog: (id: string, entry: Partial<LearningLogEntry>) => void;
  onSaveLogs: () => void;
  onComplete: (id: string) => void;
}

export const LearningLog: React.FC<LearningLogProps> = ({ selectedNode, log, onUpdateLog, onSaveLogs, onComplete }) => {
  if (!selectedNode || !log) {
    return (
      <Card className="h-full border-dashed border-2 flex items-center justify-center p-12 text-center text-muted-foreground">
        <div className="space-y-4">
          <BookOpen className="w-12 h-12 mx-auto opacity-20" />
          <p className="text-sm font-medium">スキルを選択して冒険の記録（学習ログ）を開始してください</p>
        </div>
      </Card>
    );
  }

  const handleInputChange = (key: keyof LearningLogEntry, value: string) => {
    onUpdateLog(selectedNode.id, { [key]: value });
  };

  const handleSave = () => {
    onSaveLogs();
    toast.success("冒険の記録をセーブしました！", {
      description: "ブラウザのローカルストレージに保存されました。",
      icon: <Save className="w-4 h-4 text-emerald-500" />
    });
  };

  return (
    <Card className="bg-card/50 backdrop-blur-xl border-primary/20 shadow-2xl overflow-hidden flex flex-col h-full">
      <CardHeader className="bg-primary/5 border-b border-primary/10">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />冒険の記録
            </CardTitle>
            <CardDescription className="font-bold text-primary/70">{selectedNode.level}: {selectedNode.title}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="bg-background/50 hover:bg-primary/10 border-primary/20"
              onClick={handleSave}
            >
              <Save className="w-4 h-4 mr-2" /> セーブ
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="bg-background/50 hover:bg-emerald-500/10 hover:text-emerald-500 border-emerald-500/20"
              onClick={() => {
                onComplete(selectedNode.id);
              }}
            >
              クエスト完了
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6 overflow-y-auto flex-1 custom-scrollbar">
        <div className="grid md:grid-cols-2 gap-6">
          <LogField 
            label="1. 概念（これは何か？）" 
            value={log.concept} 
            placeholder="技術の定義や概要を入力..."
            onChange={(v) => handleInputChange('concept', v)}
          />
          <LogField 
            label="2. 必要性（なぜこれが必要？）" 
            value={log.reason} 
            placeholder="解決する課題や動機を入力..."
            onChange={(v) => handleInputChange('reason', v)}
          />
        </div>

        <LogField 
          label="3. 仕組み（どのように動くのか？）" 
          value={log.mechanism} 
          placeholder="内部のロジックや動作プロセスを入力..."
          onChange={(v) => handleInputChange('mechanism', v)}
        />

        <div className="grid md:grid-cols-2 gap-6">
          <LogField 
            label="4. 具体例（身近な例は？）" 
            value={log.example} 
            placeholder="活用事例やメタファーを入力..."
            onChange={(v) => handleInputChange('example', v)}
          />
          <LogField 
            label="5. 自分の言葉（一言で言うと？）" 
            value={log.ownWords} 
            placeholder="小学生にもわかるような要約を入力..."
            onChange={(v) => handleInputChange('ownWords', v)}
          />
        </div>

        <LogField 
          label="6. AIツールとの関係（実際の活用方法は？）" 
          value={log.aiRelation} 
          placeholder="ChatGPTや生成AIでの具体的な活用場面を入力..."
          onChange={(v) => handleInputChange('aiRelation', v)}
        />
      </CardContent>

      <div className="p-4 bg-muted/30 border-t border-border/50">
        <Button className="w-full gap-2 shadow-lg group">
          <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          NotebookLM へ精緻化の書を送る
        </Button>
      </div>
    </Card>
  );
};

const LogField = ({ label, value, onChange, placeholder }: { label: string; value: string; placeholder: string; onChange: (v: string) => void }) => (
  <div className="space-y-2">
    <Label className="text-[11px] font-black text-muted-foreground uppercase tracking-wider">{label}</Label>
    <Textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="min-h-[100px] bg-background/30 focus-visible:ring-primary/20 border-primary/10 text-sm leading-relaxed"
    />
  </div>
);
