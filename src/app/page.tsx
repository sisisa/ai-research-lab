"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Globe, Search, ArrowRight } from "lucide-react"
import Link from "next/link"

const features = [
  { 
    title: "AI情報収集 (AI速報ドットコム)", 
    icon: Globe, 
    description: "AI速報ドットコムなどの最新ニュースサイトからスクレイピングを行い、AIに関する最新情報を自動的に収集・蓄積します。", 
    color: "text-blue-500", 
    bg: "bg-blue-500/10",
    link: "/gathering"
  },
  { 
    title: "Google Skills 連携", 
    icon: Search, 
    description: "Google Skillsなどの外部プラットフォームと連携し、必要なスキル情報やトレンドを取り込み、学習コンテンツとして再構成します。", 
    color: "text-emerald-500", 
    bg: "bg-emerald-500/10",
    link: "/gathering"
  },
  { 
    title: "4つの科学的学習メソッド", 
    icon: Brain, 
    description: "収集した情報を「アクティブリコール」「分散学習」「精緻的質問」「インターリービング」の4つの手法を用いて効率的に脳に定着させます。", 
    color: "text-purple-500", 
    bg: "bg-purple-500/10",
    link: "/learning"
  },
]

export default function Dashboard() {
  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-8">
      <motion.div 
        initial={{ opacity: 0, y: 15 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-3xl mx-auto mt-8"
      >
        <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full">
          機能紹介
        </div>
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
          情報収集と学習の統合プラットフォーム
        </h1>
        <p className="text-muted-foreground text-lg">
          AI Research Labは、最新のAI情報の収集から、その知識の効率的な定着までをシームレスに行うプラットフォームです。
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card className="hover:border-primary/50 transition-all duration-300 shadow-sm bg-card/40 backdrop-blur-sm border-border/50 h-full flex flex-col group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className={`w-5 h-5 ${feature.color}`} />
              </div>
              <CardHeader className="flex flex-col items-start gap-4 pb-2">
                <div className={`p-3 rounded-xl ${feature.bg}`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <div>
                  <CardTitle className="text-xl leading-tight">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-2 flex-1 flex flex-col justify-between">
                <p className="text-muted-foreground leading-relaxed mb-6">{feature.description}</p>
                <Link 
                  href={feature.link}
                  className={`inline-flex font-medium text-sm group-hover:underline ${feature.color}`}
                >
                  詳細を見る
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
