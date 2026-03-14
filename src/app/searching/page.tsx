"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Globe, RefreshCw, Plus, CheckCircle2, History, BookOpen } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface Article {
  id: string;
  title: string;
  summary: string;
  url: string;
  source?: string;
}

export default function SearchingHub() {
  const [url, setUrl] = useState("")
  const [isScraping, setIsScraping] = useState(false)
  const [scrapedResult, setScrapedResult] = useState<Article | null>(null)
  const [savedArticles, setSavedArticles] = useState<Article[]>([])
  const [isLoadingArticles, setIsLoadingArticles] = useState(true)

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/articles')
      const result = await response.json()
      if (result.success) {
        setSavedArticles(result.articles)
      }
    } catch (error) {
      console.error("Failed to fetch articles:", error)
    } finally {
      setIsLoadingArticles(false)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  const handleScrape = async () => {
    if (!url) return
    setIsScraping(true)
    setScrapedResult(null)

    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })

      const result = await response.json()

      if (result.success) {
        setScrapedResult(result.data)
        toast.success("記事の取得に成功しました！")
        fetchArticles() // リストを更新
      } else {
        toast.error("エラー: " + (result.error || "データの取得に失敗しました"))
      }
    } catch (error) {
      console.error("Scraping failed:", error)
      toast.error("通信エラーが発生しました")
    } finally {
      setIsScraping(false)
    }
  }

  const addToLearningHub = (article: Article) => {
    toast.success(`${article.title.substring(0, 20)}... をラーニングハブに追加しました！`, {
      description: "ラーニングハブ画面で学習を開始できます。",
      icon: <BookOpen className="w-4 h-4 text-emerald-500" />
    })
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full">
          AI情報収集・連携
        </div>
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-3 font-outfit">Searching Hub</h1>
        <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
          最新のAIニュースを収集・蓄積するための情報収集センターです。収集した知見は後ほど Google Skills 学習やラーニングハブで活用できます。
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* スクレイピングセクション */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="shadow-md border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden">
            <div className="h-1.5 w-full bg-blue-500" />
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-5 h-5 text-blue-500" />
                <CardTitle className="text-xl">新規記事を取得</CardTitle>
              </div>
              <CardDescription>対象ページのURLを入力して、AI技術情報を自動取得します。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="https://isokuhou.com/..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="bg-background/50 focus-visible:ring-blue-500/30"
                  disabled={isScraping}
                />
                <Button
                  onClick={handleScrape}
                  disabled={!url || isScraping}
                  className="bg-blue-600 hover:bg-blue-700 text-white min-w-[100px] shadow-lg shadow-blue-500/20"
                >
                  {isScraping ? <RefreshCw className="w-4 h-4 animate-spin" /> : "記事を取得"}
                </Button>
              </div>

              <AnimatePresence>
                {scrapedResult && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="mt-6 p-5 rounded-2xl bg-blue-500/5 border border-blue-500/20 shadow-inner group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-black bg-blue-500/10 text-blue-500 px-2 py-1 rounded tracking-widest uppercase">
                        {scrapedResult.source || "Found Insight"}
                      </span>
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="font-bold text-lg leading-snug mb-3 group-hover:text-blue-400 transition-colors">{scrapedResult.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3">
                      {scrapedResult.summary}
                    </p>

                    <Button
                      className="w-full gap-2 shadow-md bg-emerald-600 hover:bg-emerald-700 text-white"
                      variant="default"
                      onClick={() => addToLearningHub(scrapedResult)}
                    >
                      <Plus className="w-4 h-4" /> ラーニングハブに追加
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>

        {/* 保存済み記事リスト（サイドバー） */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-lg font-bold">アーカイブ</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={fetchArticles} className="h-8 w-8 p-0 text-muted-foreground hover:bg-white/5">
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingArticles ? 'animate-spin' : ''}`} />
            </Button>
          </div>

          <div className="space-y-4 overflow-y-auto max-h-[700px] pr-2 custom-scrollbar">
            {isLoadingArticles ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="h-32 rounded-xl bg-card/20 animate-pulse border border-border/10" />
              ))
            ) : savedArticles.length > 0 ? (
              savedArticles.map((article) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Card className="border-border/40 hover:border-primary/40 transition-all bg-card/20 backdrop-blur-sm shadow-sm group">
                    <CardHeader className="p-4 pb-0">
                      <div className="text-[10px] font-black text-muted-foreground mb-1 uppercase tracking-widest group-hover:text-primary transition-colors">
                        {new URL(article.url).hostname}
                      </div>
                      <CardTitle className="text-sm line-clamp-1 leading-tight">{article.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-2 pb-3">
                      <p className="text-[11px] text-muted-foreground line-clamp-2 mb-3 leading-snug">
                        {article.summary}
                      </p>
                      <div className="flex justify-between items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-[10px] px-2 hover:bg-primary/10 hover:text-primary font-bold uppercase tracking-tighter"
                          onClick={() => addToLearningHub(article)}
                        >
                          学習へ
                        </Button>
                        <a 
                          href={article.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-7 text-[10px] px-2 bg-background/30 font-bold uppercase tracking-tighter")}
                        >
                          Source
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-16 border-2 border-dashed border-border/10 rounded-3xl bg-muted/5">
                <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-10" />
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-loose">
                  No Data<br />
                  <span className="text-[10px] font-medium opacity-50">記事を収集してください</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
