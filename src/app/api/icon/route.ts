import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const size = searchParams.get('size') || '192'
    const sizeNum = parseInt(size)
    
    // Create SVG that can be converted to PNG by the browser
    const svg = `
      <svg width="${sizeNum}" height="${sizeNum}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="${sizeNum}" height="${sizeNum}" rx="${sizeNum * 0.15}" fill="url(#grad1)"/>
        <g transform="translate(${sizeNum/2}, ${sizeNum/2})">
          <rect x="${-sizeNum*0.25}" y="${-sizeNum*0.25}" width="${sizeNum*0.5}" height="${sizeNum*0.5}" rx="${sizeNum*0.05}" fill="white" opacity="0.2"/>
          <text x="0" y="${sizeNum*0.1}" font-family="Arial, sans-serif" font-size="${sizeNum*0.3}" fill="white" text-anchor="middle" font-weight="bold">M</text>
        </g>
      </svg>
    `

    // For PNG conversion, we'll use a data URL approach
    const canvas = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
    
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