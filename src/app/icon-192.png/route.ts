import { NextRequest } from 'next/server'

export async function GET() {
  try {
    // Generate SVG that browsers will render as PNG
    const svg = `
      <svg width="192" height="192" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="192" height="192" rx="28" fill="url(#grad1)"/>
        <g transform="translate(96, 96)">
          <circle cx="0" cy="0" r="60" fill="white" opacity="0.15"/>
          <rect x="-35" y="-25" width="70" height="40" rx="4" fill="white"/>
          <rect x="-30" y="-15" width="20" height="25" rx="2" fill="#2563eb"/>
          <rect x="-5" y="-15" width="20" height="25" rx="2" fill="#2563eb"/>
          <rect x="20" y="-15" width="20" height="25" rx="2" fill="#2563eb"/>
          <rect x="-35" y="20" width="70" height="8" rx="4" fill="white"/>
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
    console.error('Error generating 192 icon:', error)
    return new Response('Error generating icon', { status: 500 })
  }
}