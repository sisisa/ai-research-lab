"use client"

import { BrainCircuit, BookOpen, Home, Globe } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
  {
    title: "ダッシュボード",
    url: "/",
    icon: Home,
  },
  {
    title: "情報収集 (AI速報など)",
    url: "/searching",
    icon: Globe,
  },
  {
    title: "ラーニングハブ",
    url: "/learning",
    icon: BookOpen,
  },
]

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar" className="border-r border-border/50">
      <SidebarContent>
        <div className="flex items-center gap-3 p-6 pb-2">
          <div className="p-2 bg-primary/10 rounded-xl">
            <BrainCircuit className="w-6 h-6 text-primary" />
          </div>
          <span className="font-bold text-xl tracking-tight">AI研究所</span>
        </div>
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground px-6 font-semibold">
            メニュー
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-4 mt-2">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className="hover:bg-primary/5 hover:text-primary transition-all rounded-lg py-5 px-3"
                    render={<a href={item.url} />}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
