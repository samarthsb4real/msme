import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const size = searchParams.get('size') || '192'
    const sizeNum = parseInt(size)
    
    // Create SVG that will be converted to PNG
    const svg = `
      <svg width="${sizeNum}" height="${sizeNum}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="${sizeNum}" height="${sizeNum}" rx="${sizeNum * 0.1}" fill="url(#grad1)"/>
        <text x="${sizeNum/2}" y="${sizeNum/2 + sizeNum*0.1}" font-family="Arial, sans-serif" font-size="${sizeNum*0.4}" fill="white" text-anchor="middle" font-weight="bold">🏢</text>
      </svg>
    `

    return new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('Error generating icon:', error)
    return new Response('Error generating icon', { status: 500 })
  }
}