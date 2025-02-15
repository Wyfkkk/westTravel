/*
 * @Author: Wyfkkk 2224081986@qq.com
 * @Date: 2024-11-30 15:46:19
 * @LastEditors: Wyfkkk 2224081986@qq.com
 * @LastEditTime: 2025-02-16 01:32:23
 * @FilePath: \毕业设计\my-project\src\app\page.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use client'
import Login from './login/page'
import Front from './front/page'
import NavBar from '@/components/NavBar.js';

import store from '../store/store.js';
import Cookies from 'js-cookie'
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home({ Component, pageProps }) {
  return <Login></Login>;
}
