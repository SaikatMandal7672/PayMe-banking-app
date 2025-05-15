import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Handle preflight OPTIONS request
  if (request.method === 'OPTIONS') {
    return NextResponse.json({}, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-CSRF-Token',
        'Access-Control-Max-Age': '86400', // 24 hours
        'Vary': 'Origin'
      }
    })
  }

  // Handle regular requests
  const response = NextResponse.next()

  // Set CORS headers for all origins
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-CSRF-Token')
  response.headers.set('Vary', 'Origin')

  return response
}

// Apply middleware only to API routes
export const config = {
  matcher: '/api/:path*'
}