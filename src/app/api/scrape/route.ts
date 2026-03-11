import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { url } = await request.json()
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    // Mock response for portfolio demo
    return NextResponse.json({ 
      success: true, 
      data: {
        id: "mock-id-12345",
        title: "Mock AI Research Article",
        summary: "This is a mocked summary of the latest AI trends extracted via the scraping API.",
        content: "Detailed content would appear here after scraping.",
        url: url
      }
    })
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
