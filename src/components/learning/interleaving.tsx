"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shuffle, ArrowRight } from "lucide-react"

const questions = [
  { id: 1, category: "LLM", q: "自己注意機構(Self-Attention)の主な機能は何ですか？", color: "text-blue-500" },
  { id: 2, category: "画像生成", q: "DiffusionモデルにおけるUNetアーキテクチャはどのように機能しますか？", color: "text-pink-500" },
  { id: 3, category: "エージェント", q: "ReActエージェントと標準的なチェーンアプローチの違いは何ですか？", color: "text-emerald-500" },
]

export function InterleavingQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const nextQuestion = () => setCurrentIndex((prev) => (prev + 1) % questions.length)

  return (
    <Card className="w-full shadow-md border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden flex flex-col justify-between">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Shuffle className="w-5 h-5 text-blue-500" />
          <div className="text-sm font-bold text-blue-500 uppercase tracking-widest">インターリービング</div>
        </div>
        <CardTitle className="text-xl">混合トピック演習</CardTitle>
        <CardDescription>複数の主題を切り替えることで、問題解決能力と記憶の定着を高めます。</CardDescription>
      </CardHeader>
      
      <CardContent className="h-48 relative flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full text-center"
          >
            <span className={`inline-block mb-4 text-xs font-bold px-3 py-1 rounded-full bg-muted ${questions[currentIndex].color}`}>
              {questions[currentIndex].category}
            </span>
            <p className="text-xl font-medium px-4 leading-tight">{questions[currentIndex].q}</p>
          </motion.div>
        </AnimatePresence>
      </CardContent>
      
      <CardFooter className="bg-muted/30 pt-4 pb-4 flex items-center justify-between border-t border-border/40">
        <div className="text-xs text-muted-foreground font-medium">問題 {currentIndex + 1} / {questions.length}</div>
        <Button onClick={nextQuestion} variant="secondary" className="gap-2">
          次のトピック <ArrowRight className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
