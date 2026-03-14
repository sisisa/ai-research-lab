"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, ArrowRight, Lightbulb } from "lucide-react"

export function ElaborativeInterrogation({ topic, context }: { topic: string, context: string }) {
  const [answer, setAnswer] = useState("")
  const [submitted, setSubmitted] = useState(false)
  
  // 擬似的なAIフィードバック
  const [feedback, setFeedback] = useState("")

  const handleSubmit = () => {
    if (!answer.trim()) return
    setSubmitted(true)
    // 実際のアプリではここでLLM APIを呼び出してフィードバックを生成する
    setTimeout(() => {
      setFeedback(`素晴らしい説明です！ ${topic} の基礎となる原理を正確に結びつけています。本番環境でのスケーラビリティにどのような影響を与えるかについても、さらに考えてみましょう。`)
    }, 1200)
  }

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-bl-full pointer-events-none" />
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-purple-500" />
          <div className="text-sm font-bold text-purple-500 uppercase tracking-widest">自己質問 (精緻的質問)</div>
        </div>
        <CardTitle className="text-xl leading-tight">なぜ <span className="text-primary">{topic}</span> と言えるのでしょうか？</CardTitle>
        <CardDescription className="text-base mt-2">
          コンテキスト: &ldquo;{context}&rdquo;<br/>
          基礎となる原理や理由を、あなた自身の言葉で説明してください。
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4 relative z-10">
        <Textarea 
          placeholder="説明を入力してください..."
          className="min-h-[150px] resize-none bg-background/50 focus-visible:ring-purple-500"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={submitted}
        />
        
        {submitted && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.5 }}
            className="rounded-xl bg-purple-500/10 border border-purple-500/20 p-4"
          >
            <div className="flex gap-3">
              <Lightbulb className="w-6 h-6 text-purple-500 shrink-0" />
              <div>
                <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-1">AIからのフィードバック</h4>
                {feedback ? (
                  <p className="text-sm leading-relaxed">{feedback}</p>
                ) : (
                  <div className="flex gap-1 items-center h-5">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
      
      <CardFooter className="bg-muted/30 pt-4 flex justify-end">
        {!submitted ? (
          <Button 
            onClick={handleSubmit} 
            disabled={!answer.trim()}
            className="bg-purple-600 hover:bg-purple-700 text-white gap-2"
          >
            説明を送信 <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button variant="outline" onClick={() => { setSubmitted(false); setAnswer(""); setFeedback(""); }}>
            別の問題を試す
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
