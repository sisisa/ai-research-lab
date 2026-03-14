"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  ChevronRight,
  Star,
  Video,
  PenLine,
  ArrowUpRight,
  Loader2,
  Map as MapIcon,
  Sword,
  Shield,
  Zap,
  Flame,
  Crown,
  LucideIcon
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface SkillNode {
  id: string;
  level: string;
  title: string;
  description: string;
  points: string[];
  category: 'foundation' | 'learning' | 'deep-learning' | 'modern-ai' | 'practice';
  status: 'completed' | 'in-progress' | 'locked';
  videoUrl: string;
  icon: LucideIcon;
}

const rpgSkills: SkillNode[] = [
  {
    id: 'lv1',
    level: "Lv1 村",
    title: "AI基礎クエスト",
    description: "AIの冒険はここから。基本概念をマスターしよう。",
    points: ["AIの定義", "機械学習との違い", "AIの用途"],
    category: 'foundation',
    status: 'completed',
    videoUrl: "https://www.youtube.com/watch?v=G2fqAlgmoPo",
    icon: Sword
  },
  {
    id: 'lv2',
    level: "Lv2 森",
    title: "学習方法の森",
    description: "機械がどうやって学ぶのか、その手法を探索する。",
    points: ["教師あり学習", "教師なし学習", "強化学習"],
    category: 'learning',
    status: 'in-progress',
    videoUrl: "https://www.youtube.com/watch?v=zjkBMFhNj_g",
    icon: Shield
  },
  {
    id: 'lv3',
    level: "Lv3 山",
    title: "深層学習の険峰",
    description: "脳を模した複雑なネットワークの頂点を目指す。",
    points: ["ニューラルネットワーク", "CNN", "RNN"],
    category: 'deep-learning',
    status: 'locked',
    videoUrl: "https://www.youtube.com/watch?v=1u4YF2-vGns",
    icon: Zap
  },
  {
    id: 'lv4',
    level: "Lv4 城",
    title: "現代AIの玉座",
    description: "TransformerとLLM。現代最強の魔法を習得する。",
    points: ["Transformer", "LLM", "生成AI"],
    category: 'modern-ai',
    status: 'locked',
    videoUrl: "https://www.youtube.com/watch?v=zjkBMFhNj_g",
    icon: Flame
  },
  {
    id: 'lv5',
    level: "Lv5 ダンジョン",
    title: "実践の迷宮",
    description: "プロンプトとRAG。現実にAIを召喚する。",
    points: ["プロンプト設計", "RAG", "AIアプリ開発"],
    category: 'practice',
    status: 'locked',
    videoUrl: "https://www.youtube.com/watch?v=G2fqAlgmoPo",
    icon: Crown
  }
]

const categoryColors = {
  foundation: "bg-blue-500",
  learning: "bg-emerald-500",
  'deep-learning': "bg-purple-500",
  'modern-ai': "bg-orange-500",
  practice: "bg-rose-500"
}

export function SkillTree() {
  const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(null)
  const [notes, setNotes] = useState({
    concept: "",
    mechanism: "",
    example: "",
    ownWords: ""
  })
  const [isSaving, setIsSaving] = useState(false)

  const handleInputChange = (key: keyof typeof notes, value: string) => {
    setNotes(prev => ({ ...prev, [key]: value }))
  }

  const handleSaveNote = async () => {
    if (!selectedSkill) return
    const content = `
【概念】: ${notes.concept}
【仕組み】: ${notes.mechanism}
【具体例】: ${notes.example}
【自分の言葉】: ${notes.ownWords}
    `.trim()

    if (!content) return

    setIsSaving(true)
    try {
      const response = await fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `${selectedSkill.level}: ${selectedSkill.title}`,
          content,
          sourceUrl: selectedSkill.videoUrl,
          skillId: selectedSkill.id
        })
      })
      if (response.ok) {
        toast.success("RPG学習ログを保存しました！")
      } else {
        const errorData = await response.json()
        toast.error(`保存に失敗しました: ${errorData.error || '不明なエラー'}`)
      }
    } catch {
      toast.error("通信エラーが発生しました")
    } finally {
      setIsSaving(false)
    }
  }

  const exportToNotebookLM = () => {
    const fullText = `
【クエスト】: ${selectedSkill?.level} ${selectedSkill?.title}
【出典】: ${selectedSkill?.videoUrl}

■ 概念
${notes.concept}

■ 仕組み
${notes.mechanism}

■ 具体例
${notes.example}

■ 自分の言葉で説明
${notes.ownWords}
    `.trim()

    navigator.clipboard.writeText(fullText)
    toast.success("RPGログをコピーしました！", {
      description: "NotebookLMを開きます。ソースとしてペーストしてください。"
    })
    setTimeout(() => {
      window.open("https://notebooklm.google.com/", "_blank")
    }, 1500)
  }

  return (
    <div className="relative p-2 h-full min-h-[800px] overflow-hidden flex flex-col custom-scrollbar">
      {/* Background RPG Grid */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <pattern id="rpg-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect width="20" height="20" fill="none" stroke="currentColor" strokeWidth="0.2" />
              <circle cx="2" cy="2" r="0.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#rpg-grid)" />
        </svg>
      </div>

      <div className="flex items-center justify-between mb-8 relative z-10 px-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg shadow-inner">
            <MapIcon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-lg tracking-tight">AI学習RPGマップ</h3>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Adventure through Google Skills</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 relative z-10 px-4 flex-1 overflow-y-auto pb-8">
        <div className="space-y-3">
          {rpgSkills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={cn(
                "group relative overflow-hidden transition-all border-border/40 cursor-pointer hover:border-primary/40",
                skill.status === 'locked' ? 'opacity-50 grayscale' : 'opacity-100',
                selectedSkill?.id === skill.id ? 'ring-2 ring-primary border-transparent translate-x-2' : ''
              )}
                onClick={() => skill.status !== 'locked' && setSelectedSkill(skill)}
              >
                <div className={cn("absolute left-0 top-0 bottom-0 w-1", categoryColors[skill.category])} />

                <div className="p-3 flex gap-4 items-center">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 shadow-md transition-transform group-hover:scale-110",
                    skill.status === 'completed' ? "bg-primary/20 text-primary" :
                      skill.status === 'in-progress' ? "bg-amber-500/20 text-amber-600 animate-pulse" :
                        "bg-muted text-muted-foreground"
                  )}>
                    <skill.icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="text-[10px] font-black italic text-primary">{skill.level}</span>
                      <div className="flex gap-1">
                        {skill.points.map(p => (
                          <div key={p} className="w-1.5 h-1.5 rounded-full bg-primary/20" />
                        ))}
                      </div>
                    </div>
                    <h4 className="font-bold text-sm truncate">{skill.title}</h4>
                  </div>
                  <ChevronRight className={cn(
                    "w-4 h-4 transition-transform",
                    selectedSkill?.id === skill.id ? "rotate-90 text-primary" : "text-muted-foreground/30"
                  )} />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* RPG Quest Panel */}
        <AnimatePresence mode="wait">
          {selectedSkill ? (
            <motion.div
              key={selectedSkill.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="space-y-4"
            >
              <Card className="border-primary/30 bg-card/60 backdrop-blur-xl overflow-hidden shadow-2xl">
                <CardHeader className="p-5 pb-3 bg-primary/5">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                        クエスト詳細
                      </CardTitle>
                      <CardDescription className="text-xs font-medium text-primary uppercase tracking-wider mt-1">
                        {selectedSkill.level}: {selectedSkill.title}
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs bg-background/50"
                      onClick={() => window.open(selectedSkill.videoUrl, "_blank")}
                    >
                      <Video className="w-3.5 h-3.5 mr-1.5" />
                      教本(動画)を開く
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-5 space-y-4">
                  {/* Understand Points */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedSkill.points.map((point) => (
                      <span key={point} className="px-2 py-1 bg-primary/10 text-[10px] font-bold rounded-md border border-primary/20">
                        {point}
                      </span>
                    ))}
                  </div>

                  {/* RPG Notebook Template */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-2">
                        <Zap className="w-3 h-3" /> 1. 概念（この技術は何をするものか）
                      </label>
                      <Textarea
                        placeholder="入力してください..."
                        className="min-h-[60px] bg-background/30 border-primary/10 text-xs focus-visible:ring-primary/20"
                        value={notes.concept}
                        onChange={(e) => handleInputChange('concept', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-2">
                        <Zap className="w-3 h-3" /> 2. 仕組み（どうやって動くのか）
                      </label>
                      <Textarea
                        placeholder="入力してください..."
                        className="min-h-[60px] bg-background/30 border-primary/10 text-xs focus-visible:ring-primary/20"
                        value={notes.mechanism}
                        onChange={(e) => handleInputChange('mechanism', e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase">3. 具体例</label>
                        <Textarea
                          placeholder="使われ方..."
                          className="min-h-[60px] bg-background/30 border-primary/10 text-xs"
                          value={notes.example}
                          onChange={(e) => handleInputChange('example', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase">4. 自分の言葉</label>
                        <Textarea
                          placeholder="小学生に教えるなら..."
                          className="min-h-[60px] bg-background/30 border-primary/10 text-xs"
                          value={notes.ownWords}
                          onChange={(e) => handleInputChange('ownWords', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <div className="p-4 bg-muted/30 border-t border-border/40 flex gap-2">
                  <Button className="flex-1 text-xs h-9" onClick={handleSaveNote} disabled={isSaving || !notes.concept}>
                    {isSaving ? <Loader2 className="w-3 h-3 animate-spin mr-1.5" /> : <PenLine className="w-3.5 h-3.5 mr-1.5" />}
                    ログを記録
                  </Button>
                  <Button variant="secondary" className="flex-1 text-xs h-9 hover:bg-blue-500/10 hover:text-blue-500 transition-colors" onClick={exportToNotebookLM}>
                    <ArrowUpRight className="w-3.5 h-3.5 mr-1.5" />
                    NotebookLMへ
                  </Button>
                </div>
              </Card>
            </motion.div>
          ) : (
            <div className="mt-12 text-center p-12 border-2 border-dashed border-border/40 rounded-3xl flex flex-col items-center justify-center space-y-4 grayscale opacity-30">
              <div className="p-4 bg-muted rounded-full shadow-inner">
                <Sword className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-widest">Select Your Quest</p>
                <p className="text-[10px] mt-1">冒険を開始するクエストをマップから選択してください</p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress Footer */}
      <div className="mt-8 px-4 pb-4 relative z-10">
        <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 via-transparent to-transparent border border-primary/20 backdrop-blur-sm shadow-inner">
          <div className="flex justify-between items-end mb-2">
            <span className="text-[10px] font-black text-primary tracking-[0.2em] uppercase flex items-center gap-1.5">
              <Flame className="w-3 h-3 fill-primary" /> Total Exp
            </span>
            <span className="text-2xl font-black italic tracking-tighter">LV.02 <span className="text-muted-foreground text-sm">/ 05</span></span>
          </div>
          <div className="w-full h-1.5 bg-primary/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary shadow-[0_0_15px_rgba(var(--primary),0.6)]"
              initial={{ width: 0 }}
              animate={{ width: "40%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
