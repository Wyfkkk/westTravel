/*
 * @Author: Wyfkkk 2224081986@qq.com
 * @Date: 2024-12-22 11:00:41
 * @LastEditors: Wyfkkk 2224081986@qq.com
 * @LastEditTime: 2025-01-08 23:16:44
 * @FilePath: \my-project\src\middleware\route.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// pages/_middleware.js
import { NextResponse } from 'next/server';
import Cookies from 'js-cookie'

export function middlewareToken(req) {
  // 从请求的 cookies 或 headers 中获取 token
//   const token = req.cookies.get('token')?.value || req.headers.get('Authorization');
  const token = req.cookies.get('token') || req.headers.get('Authorization');
  // 定义需要保护的路由
  const protectedRoutes = ['/front'];

  // 检查请求的 URL 是否在受保护的路由中
  if (protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
    // 如果没有 token，重定向到登录页面
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

// 配置中间件应用的路由
export const config = {
  matcher: ['/((?!login|register).*)'], // 只在这些路由上应用中间件
};