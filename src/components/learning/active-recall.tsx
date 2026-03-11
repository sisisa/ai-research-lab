"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, CheckCircle2, XCircle, RotateCcw } from "lucide-react"

export function ActiveRecallCard({ question, answer }: { question: string, answer: string }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [status, setStatus] = useState<"pending" | "correct" | "incorrect">("pending")

  const handleFlip = () => {
    if (status === "pending") setIsFlipped(true)
  }

  const reset = () => {
    setIsFlipped(false)
    setTimeout(() => setStatus("pending"), 300)
  }

  return (
    <div className="w-full max-w-lg mx-auto perspective-1000">
      <AnimatePresence mode="wait">
        {!isFlipped ? (
          <motion.div
            key="front"
            initial={{ rotateX: 180, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 180, opacity: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
            className="cursor-pointer"
            onClick={handleFlip}
          >
            <Card className="min-h-[16rem] flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors shadow-lg bg-card/40 backdrop-blur-sm border-border/50">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-3 rounded-full mb-2">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">{question}</p>
              </CardContent>
              <div className="p-4 mt-auto text-xs text-muted-foreground animate-pulse">
                クリックして解答を表示
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="back"
            initial={{ rotateX: -180, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: -180, opacity: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
          >
            <Card className="min-h-[16rem] flex flex-col justify-between shadow-lg bg-card/60 border-primary/20 backdrop-blur-sm relative overflow-hidden">
              {status === "correct" && <div className="absolute inset-0 bg-green-500/10 pointer-events-none" />}
              {status === "incorrect" && <div className="absolute inset-0 bg-red-500/10 pointer-events-none" />}

              <CardHeader className="pb-2">
                <CardDescription className="text-center font-medium">解答</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex items-center justify-center overflow-auto px-6">
                <p className="text-lg text-center leading-relaxed">{answer}</p>
              </CardContent>

              <CardFooter className="flex justify-center gap-3 pt-4 border-t border-border/40 bg-card/50">
                {status === "pending" ? (
                  <>
                    <Button variant="outline" className="w-[120px] text-red-500 hover:text-red-600 hover:bg-red-50" onClick={(e) => { e.stopPropagation(); setStatus("incorrect") }}>
                      <XCircle className="w-4 h-4 mr-2" /> 忘れた
                    </Button>
                    <Button className="w-[120px] bg-green-600 hover:bg-green-700 text-white" onClick={(e) => { e.stopPropagation(); setStatus("correct") }}>
                      <CheckCircle2 className="w-4 h-4 mr-2" /> 思い出した
                    </Button>
                  </>
                ) : (
                  <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground" onClick={reset}>
                    <RotateCcw className="w-4 h-4 mr-2" /> もう一度
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
