import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { title, content, sourceUrl, skillId } = await request.json()

    if (!content) {
      return NextResponse.json({ success: false, error: "Content is required" }, { status: 400 })
    }

    const log = await prisma.learningLog.create({
      data: {
        title,
        content,
        sourceUrl,
        skillId
      }
    })

    return NextResponse.json({ success: true, log })
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Internal Server Error"
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const skillId = searchParams.get('skillId')

  try {
    const logs = await prisma.learningLog.findMany({
      where: skillId ? { skillId } : {},
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json({ success: true, logs })
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Internal Server Error"
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 })
  }
}
