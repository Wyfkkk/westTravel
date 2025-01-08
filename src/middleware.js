import { NextResponse } from 'next/server';

export function middleware(request) {
  // 检查认证状态
  const isAuthenticated = // 你的认证检查逻辑

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/protected/:path*']
}; 