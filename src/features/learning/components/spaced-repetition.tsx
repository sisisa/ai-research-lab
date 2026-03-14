"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, CheckCircle2, Circle } from "lucide-react"

const schedule = [
  { id: 1, title: "Attentionメカニズム", Due: "今日", Status: "due", method: "アクティブリコール" },
  { id: 2, title: "Diffusionモデル", Due: "明日", Status: "upcoming", method: "自己質問" },
  { id: 3, title: "RAGアーキテクチャ", Due: "3日後", Status: "upcoming", method: "インターリービング" },
]

export function SpacedRepetition() {
  return (
    <Card className="w-full shadow-md border-border/50 bg-card/40 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-5 h-5 text-amber-500" />
          <div className="text-sm font-bold text-amber-500 uppercase tracking-widest">分散学習</div>
        </div>
        <CardTitle className="text-xl">復習スケジュール</CardTitle>
        <CardDescription>忘却曲線に基づき、記憶の定着を最大化するようにアルゴリズムが選択したアイテムです。</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {schedule.map((item) => (
            <div key={item.id} className="flex items-start justify-between p-4 rounded-xl border border-border/50 bg-background/50 hover:bg-muted/50 transition-colors group cursor-pointer">
              <div className="flex gap-3 items-start">
                <button className="text-muted-foreground group-hover:text-amber-500 transition-colors mt-0.5">
                  {item.Status === "due" ? <Circle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5 opacity-50" />}
                </button>
                <div>
                  <h4 className={`font-medium ${item.Status === "due" ? "" : "text-muted-foreground"}`}>{item.title}</h4>
                  <div className="mt-1 flex items-center">
                    <span className="text-[10px] font-bold tracking-wider uppercase bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">{item.method}</span>
                  </div>
                </div>
              </div>
              <div className={`text-xs font-bold px-2 py-1 rounded-md ${item.Status === "due" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" : "bg-muted text-muted-foreground"}`}>
                {item.Due}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
