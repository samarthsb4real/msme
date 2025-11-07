import { NextRequest } from 'next/server'

export async function GET() {
  try {
    // Generate 512x512 SVG icon
    const svg = `
      <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="512" height="512" rx="76" fill="url(#grad1)"/>
        <g transform="translate(256, 256)">
          <circle cx="0" cy="0" r="160" fill="white" opacity="0.15"/>
          <rect x="-95" y="-65" width="190" height="105" rx="12" fill="white"/>
          <rect x="-80" y="-40" width="50" height="65" rx="6" fill="#2563eb"/>
          <rect x="-15" y="-40" width="50" height="65" rx="6" fill="#2563eb"/>
          <rect x="50" y="-40" width="50" height="65" rx="6" fill="#2563eb"/>
          <rect x="-95" y="50" width="190" height="20" rx="10" fill="white"/>
          <text x="0" y="120" font-family="Arial, sans-serif" font-size="32" fill="white" text-anchor="middle" font-weight="bold">MSME</text>
        </g>
      </svg>
    `

    return new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('Error generating 512 icon:', error)
    return new Response('Error generating icon', { status: 500 })
  }
}