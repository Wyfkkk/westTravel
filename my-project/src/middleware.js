import { middlewareToken } from '@/middleware/route';

export function middleware(req) {
  return middlewareToken(req);
}

// 配置中间件应用的路由
export const config = {
  matcher: [
    // 排除静态资源和特定路径
    '/((?!login|register|api|_next/static|_next/image|images|favicon.ico).*)',
  ],
};