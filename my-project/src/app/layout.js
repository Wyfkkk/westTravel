/*
 * @Author: Wyfkkk 2224081986@qq.com
 * @Date: 2024-11-30 15:46:19
 * @LastEditors: Wyfkkk 2224081986@qq.com
 * @LastEditTime: 2025-02-16 23:55:12
 * @FilePath: \毕业设计\my-project\src\app\layout.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/store/store";
import NavBar from "@/components/NavBar";
import { usePathname } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideNavBarPaths = ["/", "/login", "/register"];
  const showNavBar = !hideNavBarPaths.includes(pathname);
  return (
    <html lang="en">
      <head>
        <title>西部旅游官网</title>
        <meta name="description" content="一个西部旅游网站" />
      </head>
      <body >
        <ReduxProvider>
          {showNavBar ? <NavBar /> : null}
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
