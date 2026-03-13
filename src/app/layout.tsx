import type { Metadata } from "next"
import { Inter, Outfit } from "next/font/google"
import { Github, Globe, Brain, BookOpen, Map as MapIcon, Sparkles } from "lucide-react"
import Link from "next/link"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" })

export const metadata: Metadata = {
  title: "AI Research Lab | 未来を拓くAI学習プラットフォーム",
  description: "最新のAI速報の収集から、科学的根拠に基づいた学習定着、Google Skillsとの連携までを一元管理する次世代AIラボ。",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className="dark" style={{ colorScheme: 'dark' }}>
      <body className={`${inter.variable} ${outfit.variable} font-sans min-h-screen bg-[#050506] text-gray-100 selection:bg-primary/30 antialiased`}>
        {/* Ambient Background Glow */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full opacity-50" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full opacity-30" />
        </div>

        <div className="flex flex-col min-h-screen relative">
          <header className="sticky top-0 z-50 w-full border-b border-white/[0.05] bg-[#050506]/60 backdrop-blur-xl transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center gap-10">
                  <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="relative p-1.5 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-primary/5">
                      <Brain className="w-6 h-6 text-primary group-hover:text-blue-400 transition-colors" />
                      <div className="absolute -top-1 -right-1">
                        <Sparkles className="w-2.5 h-2.5 text-amber-400 animate-pulse" />
                      </div>
                    </div>
                    <span className="text-xl font-black tracking-tight text-white font-outfit">AI Research Lab</span>
                  </Link>

                  <nav className="hidden md:flex items-center gap-1">
                    <NavItem href="/searching" icon={<Globe className="w-4 h-4" />} label="searching" />
                    <NavItem href="/google-skills" icon={<MapIcon className="w-4 h-4" />} label="Google Skills" />
                    <NavItem href="/learning" icon={<BookOpen className="w-4 h-4" />} label="Learning" />
                  </nav>
                </div>

                <div className="flex items-center gap-4">
                  <Link
                    href="https://github.com"
                    target="_blank"
                    className="p-2.5 text-gray-400 hover:text-white transition-all bg-white/[0.03] hover:bg-white/[0.08] rounded-full"
                  >
                    <Github className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
            {children}
          </main>

          <footer className="border-t border-white/[0.03] py-12 bg-[#050506]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 cursor-default">
                  <Brain className="w-5 h-5 text-primary" />
                  <span className="font-bold font-outfit tracking-tighter">AI Research Lab</span>
                </div>
                {/* <p className="text-xs text-gray-500 font-medium tracking-widest uppercase">
                  © 2026 AI Research Lab. Powered by Advanced Intelligence.
                </p>
                <div className="flex gap-6 text-[10px] uppercase tracking-widest font-bold text-gray-600">
                  <button className="hover:text-primary transition-colors">Documentation</button>
                  <button className="hover:text-primary transition-colors">Privacy Policy</button>
                </div> */}
              </div>
            </div>
          </footer>
        </div>
        <Toaster closeButton richColors position="top-center" />
      </body>
    </html>
  )
}

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="px-4 py-2 text-sm font-bold text-gray-400 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all flex items-center gap-2.5 group relative"
    >
      <span className="opacity-70 group-hover:opacity-100 transition-opacity">{icon}</span>
      <span className="font-outfit antialiased">{label}</span>
    </Link>
  )
}
