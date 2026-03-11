"use client"

import { ActiveRecallCard } from "@/components/learning/active-recall"
import { SpacedRepetition } from "@/components/learning/spaced-repetition"
import { ElaborativeInterrogation } from "@/components/learning/elaborative-interrogation"
import { InterleavingQuiz } from "@/components/learning/interleaving"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"

export default function LearningHub() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-12">
      <motion.div 
        initial={{ opacity: 0, y: 15 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full">
          学習メソッド
        </div>
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-3">ラーニングハブ</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          上から順番に進めることで、4つの科学的学習法をシームレスなワークフローとして体験できます。
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Accordion defaultValue={["step-1"]} className="w-full space-y-4">
          
          <AccordionItem value="step-1" className="border-border/50 bg-card/40 backdrop-blur-sm px-6 rounded-xl shadow-sm data-[state=open]:border-primary/50 data-[state=open]:shadow-md transition-all">
            <AccordionTrigger className="text-xl font-semibold hover:no-underline py-6">
              <div className="flex items-center gap-4 text-left">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-bold">1</span>
                <div>
                  <div className="font-bold">アクティブリコール</div>
                  <div className="text-sm font-normal text-muted-foreground mt-1">取得した情報から、自らの記憶を引き出す練習をします。</div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-8 pt-2">
              <ActiveRecallCard 
                question="深層ニューラルネットワークにおける勾配消失問題とは何ですか？" 
                answer="勾配消失問題とは、誤差逆伝播法において、初期の層に伝わるにつれて勾配が極端に小さくなり、重みの更新が止まって学習が進まなくなる現象です。対策として、ReLU活性化関数やスキップ接続（ResNet）、適切な重みの初期化などが用いられます。"
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="step-2" className="border-border/50 bg-card/40 backdrop-blur-sm px-6 rounded-xl shadow-sm data-[state=open]:border-primary/50 data-[state=open]:shadow-md transition-all">
            <AccordionTrigger className="text-xl font-semibold hover:no-underline py-6">
              <div className="flex items-center gap-4 text-left">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/10 text-amber-500 text-sm font-bold">2</span>
                <div>
                  <div className="font-bold">分散学習・想起学習</div>
                  <div className="text-sm font-normal text-muted-foreground mt-1">忘却曲線に基づくスケジュールで、知識を定着させます。</div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-8 pt-2">
              <SpacedRepetition />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="step-3" className="border-border/50 bg-card/40 backdrop-blur-sm px-6 rounded-xl shadow-sm data-[state=open]:border-primary/50 data-[state=open]:shadow-md transition-all">
            <AccordionTrigger className="text-xl font-semibold hover:no-underline py-6">
              <div className="flex items-center gap-4 text-left">
                <span className="flex items-center justify-center w-8 h-8 rounded-full text-purple-500 bg-purple-500/10 text-sm font-bold">3</span>
                <div>
                  <div className="font-bold">自己質問 (精緻的質問)</div>
                  <div className="text-sm font-normal text-muted-foreground mt-1">「なぜ？」を深掘りし、既存の知識と結びつけます。</div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-8 pt-2">
              <ElaborativeInterrogation 
                topic="Transformerアーキテクチャ" 
                context="Transformerは、時系列情報を並行して処理するために、入力の異なる要素間の重要度を重み付けする自己注意機構（Self-Attention）に依存しており、RNNとは異なります。"
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="step-4" className="border-border/50 bg-card/40 backdrop-blur-sm px-6 rounded-xl shadow-sm data-[state=open]:border-primary/50 data-[state=open]:shadow-md transition-all">
            <AccordionTrigger className="text-xl font-semibold hover:no-underline py-6">
              <div className="flex items-center gap-4 text-left">
                <span className="flex items-center justify-center w-8 h-8 rounded-full text-blue-500 bg-blue-500/10 text-sm font-bold">4</span>
                <div>
                  <div className="font-bold">インターリービング</div>
                  <div className="text-sm font-normal text-muted-foreground mt-1">複数の異なるトピックをシャッフルして解き、応用力を鍛えます。</div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-8 pt-2">
              <div className="max-w-2xl mx-auto">
                <InterleavingQuiz />
              </div>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </motion.div>
    </div>
  )
}
