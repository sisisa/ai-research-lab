"use client"

import { motion } from "framer-motion"
import { SkillTree } from "@/features/google-skills/components/SkillTree"
import { ConceptMap } from "@/features/google-skills/components/ConceptMap"
import { LearningLog } from "@/features/google-skills/components/LearningLog"
import { useGoogleSkills } from "@/features/google-skills/hooks/useGoogleSkills"
import { Map as MapIcon, Sparkles } from "lucide-react"

export default function GoogleSkillsPage() {
  const { nodes, selectedNode, currentLog, selectNode, updateLog, saveLogs, completeNode } = useGoogleSkills()

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="px-3 py-1 text-xs font-black tracking-widest text-emerald-500 uppercase bg-emerald-500/10 rounded-full border border-emerald-500/20">
            Adventure Field
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 text-xs font-black text-amber-500 bg-amber-500/10 rounded-full border border-amber-500/20">
            <Sparkles className="w-3 h-3" /> FSD Refactored
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-3 flex items-center gap-4 font-outfit">
              <MapIcon className="w-10 h-10 text-primary" />
              GOOGLE SKILLS MAP
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              RPG 階層構造に基づく AI 学習ロードマップ。各クエストで得た知識を構造化ログに記録し、NotebookLM で更なる精緻化を目指します。
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 左側：スキルツリーとマップ */}
        <div className="lg:col-span-4 space-y-6">
          <ConceptMap nodes={nodes} />
          <SkillTree 
            nodes={nodes} 
            selectedNodeId={selectedNode?.id || null} 
            onSelectNode={selectNode} 
          />
        </div>

        {/* 右側：学習ログフォーム */}
        <div className="lg:col-span-8 h-full min-h-[800px]">
          <LearningLog 
            selectedNode={selectedNode} 
            log={currentLog} 
            onUpdateLog={updateLog}
            onSaveLogs={saveLogs}
            onComplete={completeNode}
          />
        </div>
      </div>
    </div>
  )
}
