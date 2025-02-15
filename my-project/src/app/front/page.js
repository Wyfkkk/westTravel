/*
 * @Author: Wyfkkk 2224081986@qq.com
 * @Date: 2024-11-30 15:46:19
 * @LastEditors: Wyfkkk 2224081986@qq.com
 * @LastEditTime: 2025-01-12 20:40:06
 * @FilePath: \毕业设计\my-project\src\app\page.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use client'
import Image from "next/image";
import NavBar from '@/components/NavBar.js';
import { Button } from 'antd';
import  getEmailCode from '../../api/account/index'
import { useState } from "react";
import { useSelector } from 'react-redux';
import store from '../../store/store';
export default function Front() {
  const [res, setRes] = useState('')
  const value = useSelector((state) => state.userInfo.value);
  return;
  // return (<NavBar></NavBar>)
}
