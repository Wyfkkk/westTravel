/*
 * @Author: Wyfkkk 2224081986@qq.com
 * @Date: 2024-12-22 11:00:41
 * @LastEditors: Wyfkkk 2224081986@qq.com
 * @LastEditTime: 2025-02-18 00:54:49
 * @FilePath: \my-project\src\middleware\route.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// pages/_middleware.js
import { NextResponse } from 'next/server';

export function middlewareToken(request) {
  // 获取token
  const token = request.cookies.get('token');
  
  // 获取当前路径
  const { pathname } = request.nextUrl;
  
  // 定义不需要验证的路由
  const publicRoutes = ['/login', '/register'];
  console.log(pathname, 'path')
  
  // 如果是公开路由，直接放行
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }
  
  // 其他所有路由，如果没有token就重定向到登录页
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

