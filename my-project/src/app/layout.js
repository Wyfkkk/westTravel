/*
 * @Author: Wyfkkk 2224081986@qq.com
 * @Date: 2024-11-30 15:46:19
 * @LastEditors: Wyfkkk 2224081986@qq.com
 * @LastEditTime: 2025-01-14 10:51:27
 * @FilePath: \毕业设计\my-project\src\app\layout.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import localFont from "next/font/local";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { ReduxProvider } from "@/store/store";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "西部旅游官网",
  description: "一个西部旅游网站",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ReduxProvider>
          <div style={{ width: "100%" }}>
            {/* <NavBar/> */}
            {children}
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
