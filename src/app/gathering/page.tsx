"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Globe, Search, RefreshCw, Plus, CheckCircle2 } from "lucide-react"

// 型定義を追加して any エラーを解消
interface ScrapedResult {
  title: string;
  summary: string;
  source: string;
  tags: string[];
}

export default function GatheringHub() {
  const [url, setUrl] = useState("")
  const [isScraping, setIsScraping] = useState(false)
  const [scrapedResult, setScrapedResult] = useState<ScrapedResult | null>(null)

  const handleScrape = async () => {
    if (!url) return
    setIsScraping(true)
    
    // Simulate scraping API call for AI Sokuhou format
    setTimeout(() => {
      setScrapedResult({
        title: "AI速報: 次世代LLMの推論速度が劇的向上",
        summary: "Sparse Attentionを活用した新しい推論アーキテクチャにより、従来比3倍の速度向上が確認されました。エッジデバイスでの活用が期待されています。",
        source: "AI速報ドットコム",
        tags: ["LLM", "アーキテクチャ"]
      })
      setIsScraping(false)
    }, 1500)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-8">
      <div>
        <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full">
          AI情報収集・連携
        </div>
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-3">Gathering Hub</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          AI速報ドットコムからの最新ニューススクレイピングと、Google Skillsからのスキル情報を統合し、あなたの学習データベースを構築します。
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* スクレイピング・情報収集セクション */}
        <div className="space-y-6">
          <Card className="shadow-md border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden">
            <div className="h-1.5 w-full bg-blue-500" />
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-5 h-5 text-blue-500" />
                <CardTitle className="text-xl">Webスクレイピング (AI速報など)</CardTitle>
              </div>
              <CardDescription>対象ページのURLを入力して、記事内容を自動取得・要約します。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input 
                  placeholder="https://aisokuhou.com/article/..." 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="bg-background/50"
                  disabled={isScraping}
                />
                <Button 
                  onClick={handleScrape} 
                  disabled={!url || isScraping}
                  className="bg-blue-600 hover:bg-blue-700 text-white min-w-[100px]"
                >
                  {isScraping ? <RefreshCw className="w-4 h-4 animate-spin" /> : "取得する"}
                </Button>
              </div>

              {scrapedResult && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-lg bg-blue-500/5 border border-blue-500/20"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-md">
                      {scrapedResult.source}
                    </span>
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  </div>
                  <h3 className="font-bold text-lg leading-tight mb-2">{scrapedResult.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{scrapedResult.summary}</p>
                  
                  <Button className="w-full gap-2" variant="outline">
                    <Plus className="w-4 h-4" /> ラーニングハブに追加
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Google Skills 連携セクション */}
        <div className="space-y-6">
          <Card className="shadow-md border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden">
            <div className="h-1.5 w-full bg-emerald-500" />
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2 mb-2">
                <Search className="w-5 h-5 text-emerald-500" />
                <CardTitle className="text-xl">Google Skills 連携</CardTitle>
              </div>
              <CardDescription>Googleが提唱する最新のAIスキル要件やトレンドデータを同期します。</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 text-center border-2 border-dashed border-border/60 rounded-xl bg-background/30">
                <Search className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
                <h4 className="font-semibold mb-2">現在連携待機中</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Google Workspaceや認定プログラムのAPIから、AI関連スキルのパスウェイを取り込み、学習プランを構築します。
                </p>
                <Button variant="secondary" className="gap-2">
                  <RefreshCw className="w-4 h-4" /> 同期の設定を構成
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
