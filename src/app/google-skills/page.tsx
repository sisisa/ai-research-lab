"use client"

import { motion } from "framer-motion"
import { SkillTree } from "@/components/searching/skill-tree"
import { Compass, Sparkles } from "lucide-react"

export default function GoogleSkillsHub() {
  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="px-3 py-1 text-xs font-semibold tracking-wider text-emerald-500 uppercase bg-emerald-500/10 rounded-full border border-emerald-500/20">
            Exclusive Hub
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-amber-500 bg-amber-500/10 rounded-full border border-amber-500/20">
            <Sparkles className="w-3 h-3" /> RPG Mode
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-3 flex items-center gap-4">
              <Compass className="w-10 h-10 text-emerald-500" />
              Google Skills Hub
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              Googleの生成AI学習パスをRPGマップとして再構築。Lv1から段階的にクエストを攻略し、体系的な知識の「召喚」を目指します。
            </p>
          </div>
          <div className="hidden lg:block">
            <div className="p-4 rounded-2xl bg-card border border-border/50 text-right">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">Current Quest</div>
              <div className="text-sm font-bold text-emerald-500">Lv2 森: 学習方法の探索</div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card/40 backdrop-blur-xl rounded-3xl border border-border/50 overflow-hidden shadow-2xl"
        >
          <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500" />
          <SkillTree />
        </motion.div>
      </div>
    </div>
  )
}
