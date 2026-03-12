import { NextResponse } from 'next/server'
import * as cheerio from 'cheerio'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const { url } = await request.json()
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.statusText}`)
    }

    const html = await response.text()
    const $ = cheerio.load(html)
    
    // 基本的なデータ抽出
    const title = $('title').text() || $('h1').first().text() || "No Title"
    const summary = $('meta[name="description"]').attr('content') || $('p').first().text() || "No Summary"
    
    // 本文の抽出 (長いテキストを持つ P タグを優先)
    const content = $('p')
      .map((_, el) => $(el).text())
      .get()
      .filter(text => text.length > 30)
      .join('\n\n')

    const cleanTitle = title.trim()
    const cleanSummary = summary.trim()

    // データベースに保存（Upsert）
    const article = await prisma.article.upsert({
      where: { url },
      update: {
        title: cleanTitle,
        summary: cleanSummary,
        content
      },
      create: {
        url,
        title: cleanTitle,
        summary: cleanSummary,
        content
      }
    })

    return NextResponse.json({ 
      success: true, 
      data: {
        id: article.id,
        title: article.title,
        summary: article.summary,
        content: article.content,
        url: article.url,
        source: new URL(url).hostname
      }
    })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    console.error('Scraping error:', errorMessage)
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
