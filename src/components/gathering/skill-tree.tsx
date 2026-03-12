"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Star,
  Trophy,
  Video,
  PenLine,
  ExternalLink,
  ArrowUpRight,
  Loader2
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface SkillNode {
  id: string;
  title: string;
  description: string;
  category: 'foundation' | 'llm' | 'image' | 'mlops';
  status: 'completed' | 'in-progress' | 'locked';
  videoUrl: string;
  connectedTo?: string[];
}

const skills: SkillNode[] = [
  {
    id: 'f1',
    title: "Introduction to Generative AI",
    description: "生成AIの基本概念と活用方法を学びます。",
    category: 'foundation',
    status: 'completed',
    videoUrl: "https://www.youtube.com/watch?v=G2fqAlgmoPo"
  },
  {
    id: 'l1',
    title: "Introduction to Large Language Models",
    description: "LLMの構造とプロンプトエンジニアリングの基礎。",
    category: 'llm',
    status: 'in-progress',
    videoUrl: "https://www.youtube.com/watch?v=zjkBMFhNj_g",
    connectedTo: ['f1']
  },
  {
    id: 'i1',
    title: "Introduction to Image Generation",
    description: "拡散モデルと画像生成の仕組みを理解します。",
    category: 'image',
    status: 'locked',
    videoUrl: "https://www.youtube.com/watch?v=1u4YF2-vGns",
    connectedTo: ['f1']
  }
]

const categoryColors = {
  foundation: "bg-blue-500",
  llm: "bg-emerald-500",
  image: "bg-rose-500",
  mlops: "bg-amber-500"
}

export function SkillTree() {
  const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(null)
  const [note, setNote] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const handleSaveNote = async () => {
    if (!selectedSkill || !note.trim()) return
    setIsSaving(true)
    try {
      const response = await fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: selectedSkill.title,
          content: note,
          sourceUrl: selectedSkill.videoUrl,
          skillId: selectedSkill.id
        })
      })
      if (response.ok) {
        toast.success("学習ログを保存しました！")
      }
    } finally {
      setIsSaving(false)
    }
  }

  const exportToNotebookLM = () => {
    if (!note.trim()) {
      toast.error("メモが空です")
      return
    }
    const fullText = `【テーマ】: ${selectedSkill?.title}\n【出典】: ${selectedSkill?.videoUrl}\n\n【学んだこと】:\n${note}`
    navigator.clipboard.writeText(fullText)
    toast.success("内容をクリップボードにコピーしました！", {
      description: "NotebookLMを開きます。ソースとしてペーストしてください。"
    })
    setTimeout(() => {
      window.open("https://notebooklm.google.com/", "_blank")
    }, 1500)
  }

  return (
    <div className="relative p-2 h-full min-h-[700px] overflow-hidden flex flex-col">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="flex items-center justify-between mb-8 relative z-10 px-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <Trophy className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Google AI Learning Path</h3>
            <p className="text-xs text-muted-foreground">体系的なスキル習得と NotebookLM 連携</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 relative z-10 px-4 flex-1">
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <Card className={cn(
                "group relative overflow-hidden transition-all border-border/40 cursor-pointer",
                skill.status === 'locked' ? 'opacity-60 grayscale' : 'opacity-100',
                selectedSkill?.id === skill.id ? 'ring-2 ring-primary border-transparent shadow-md' : 'hover:shadow-lg'
              )}
                onClick={() => skill.status !== 'locked' && setSelectedSkill(skill)}
              >
                <div className={cn("absolute left-0 top-0 bottom-0 w-1", categoryColors[skill.category])} />

                <div className="p-4 flex gap-4 items-center">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
                    skill.status === 'completed' ? "bg-emerald-500/10 text-emerald-500" :
                      skill.status === 'in-progress' ? "bg-blue-500/10 text-blue-500 animate-pulse" :
                        "bg-muted text-muted-foreground"
                  )}>
                    {skill.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> :
                      skill.status === 'in-progress' ? <Star className="w-5 h-5" /> :
                        <BookOpen className="w-5 h-5" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-0.5">
                      <h4 className="font-bold text-sm truncate">{skill.title}</h4>
                      <span className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">
                        {skill.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground line-clamp-1">
                      {skill.description}
                    </p>
                  </div>
                  {selectedSkill?.id === skill.id ? (
                    <ChevronRight className="w-4 h-4 text-primary animate-bounce-x" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground/30" />
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Selected Skill Interaction Area */}
        <AnimatePresence mode="wait">
          {selectedSkill ? (
            <motion.div
              key={selectedSkill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-4"
            >
              <Card className="border-primary/20 bg-primary/5 backdrop-blur-md overflow-hidden">
                <CardHeader className="p-4 pb-2 border-b border-primary/10">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Video className="w-4 h-4 text-primary" /> 学習と記録
                      </CardTitle>
                      <CardDescription className="text-xs">{selectedSkill.title}</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => window.open(selectedSkill.videoUrl, "_blank")}>
                      動画を開く <ExternalLink className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground mb-1">
                    <PenLine className="w-3 h-3" /> 学んだ概念・洞察をメモ
                  </div>
                  <Textarea
                    placeholder="例：TransformerのSelf-Attentionメカニズムにより、文中の離れた単語同士の関係性を..."
                    className="min-h-[120px] bg-background/50 text-sm resize-none focus-visible:ring-primary/30"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button className="flex-1 text-xs h-9" onClick={handleSaveNote} disabled={isSaving || !note.trim()}>
                      {isSaving ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <CheckCircle2 className="w-3 h-3 mr-1" />}
                      ログを保存
                    </Button>
                    <Button variant="secondary" className="flex-1 text-xs h-9 bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-blue-500/20" onClick={exportToNotebookLM}>
                      <ArrowUpRight className="w-3 h-3 mr-1" />
                      NotebookLMへ
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <div className="mt-8 text-center p-8 border-2 border-dashed border-border/40 rounded-2xl flex flex-col items-center justify-center space-y-3 grayscale opacity-40">
              <div className="p-3 bg-muted rounded-full">
                <BookOpen className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium">スキルを選択して学習を開始してください</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress (Footer area) */}
      <div className="mt-12 px-4 pb-4">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/10">
          <div className="flex justify-between items-end mb-2">
            <span className="text-[10px] font-bold text-primary tracking-widest uppercase">My Strategy Progress</span>
            <span className="text-xl font-black italic">33%</span>
          </div>
          <div className="w-full h-1.5 bg-primary/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]"
              initial={{ width: 0 }}
              animate={{ width: "33%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
