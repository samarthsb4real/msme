import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title') || 'MSME Service Assistant'
    
    // Create a simple SVG image for screenshots
    const svg = `
      <svg width="1280" height="720" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="1280" height="720" fill="url(#grad1)"/>
        <text x="640" y="320" font-family="Arial, sans-serif" font-size="48" fill="white" text-anchor="middle" font-weight="bold">${title}</text>
        <text x="640" y="400" font-family="Arial, sans-serif" font-size="24" fill="#e2e8f0" text-anchor="middle">Comprehensive MSME service assistant for Indian entrepreneurs</text>
        <circle cx="640" cy="500" r="40" fill="white" opacity="0.1"/>
        <text x="640" y="510" font-family="Arial, sans-serif" font-size="20" fill="white" text-anchor="middle">🏢</text>
      </svg>
    `

    return new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('Error generating OG image:', error)
    return new Response('Error generating image', { status: 500 })
  }
}