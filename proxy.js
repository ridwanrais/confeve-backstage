import { NextResponse } from 'next/server'

export function proxy(request) {
  const pathname = request.nextUrl.pathname
  const token = request.cookies.get('auth_token')?.value

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/register', '/verify-otp']
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

  // If trying to access public auth routes while authenticated, redirect to dashboard
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If trying to access protected routes without authentication, redirect to login
  if (!isPublicRoute && !token && pathname !== '/') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If accessing root without token, redirect to login
  if (pathname === '/' && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
