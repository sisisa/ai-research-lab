import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 10 // 直近10件を取得
    })

    return NextResponse.json({ success: true, articles })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch articles"
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  }
}
