"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Globe, RefreshCw, Plus, CheckCircle2, History, BookOpen } from "lucide-react"
import { toast } from "sonner"
import { SkillTree } from "@/components/gathering/skill-tree"

interface Article {
  id: string;
  title: string;
  summary: string;
  url: string;
  source?: string;
}

export default function GatheringHub() {
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
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-3">Gathering Hub</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          AI速報ドットコムからの最新ニュースを取得したり、Google Skillsの情報を統合し、独自の学習データベースを構築します。
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* スクレイピングセクション */}
        <div className="space-y-8">
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

              <AnimatePresence>
                {scrapedResult && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="mt-6 p-5 rounded-xl bg-blue-500/5 border border-blue-500/20 shadow-inner"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-bold bg-blue-500/10 text-blue-500 px-2.5 py-1 rounded-md">
                        {scrapedResult.source || "Web"}
                      </span>
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    </div>
                    <h3 className="font-bold text-lg leading-tight mb-3">{scrapedResult.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3">
                      {scrapedResult.summary}
                    </p>

                    <Button
                      className="w-full gap-2 shadow-sm"
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

          {/* Google Skills (Skill Tree) */}
          <Card className="shadow-md border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden h-full">
            <div className="h-1.5 w-full bg-emerald-500" />
            <SkillTree />
          </Card>
        </div>

        {/* 保存済み記事リスト */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-xl font-bold">最近保存した記事</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={fetchArticles} className="text-muted-foreground">
              <RefreshCw className={`w-4 h-4 ${isLoadingArticles ? 'animate-spin' : ''}`} />
            </Button>
          </div>

          <div className="space-y-4 overflow-y-auto max-h-[650px] pr-2 custom-scrollbar">
            {isLoadingArticles ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="h-32 rounded-xl bg-card/20 animate-pulse border border-border/30" />
              ))
            ) : savedArticles.length > 0 ? (
              savedArticles.map((article) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ y: -2 }}
                >
                  <Card className="border-border/40 hover:border-primary/40 transition-all bg-card/30 backdrop-blur-sm">
                    <CardHeader className="p-4 pb-0">
                      <div className="text-[10px] font-bold text-muted-foreground mb-1 uppercase tracking-tight">
                        {new URL(article.url).hostname}
                      </div>
                      <CardTitle className="text-base line-clamp-1">{article.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-2 pb-3">
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
                        {article.summary}
                      </p>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-[11px] hover:bg-primary/10 hover:text-primary"
                          onClick={() => addToLearningHub(article)}
                        >
                          学習へ追加
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 text-[11px]">
                          <a href={article.url} target="_blank" rel="noopener noreferrer">ソースを開く</a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-border/40 rounded-2xl">
                <Globe className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-20" />
                <p className="text-sm text-muted-foreground">まだ記事が保存されていません。</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
