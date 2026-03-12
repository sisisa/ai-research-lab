import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/sonner";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Research Lab",
  description: "AI Research Lab",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-primary/30 min-h-screen bg-background`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Decorative Background for premium feel */}
          <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-blue-500/10 blur-[100px]" />
          </div>

          <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 overflow-x-hidden relative flex flex-col min-h-screen w-full">
              <header className="flex h-16 items-center border-b border-border/40 bg-background/50 backdrop-blur-md px-6 w-full sticky top-0 z-10 transition-all">
                <SidebarTrigger className="opacity-70 hover:opacity-100" />
              </header>
              <div className="flex-1 p-6 lg:p-10">
                {children}
              </div>
            </main>
          </SidebarProvider>
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
