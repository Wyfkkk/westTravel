/*
 * @Author: Wyfkkk 2224081986@qq.com
 * @Date: 2024-12-03 15:33:40
 * @LastEditors: Wyfkkk 2224081986@qq.com
 * @LastEditTime: 2025-01-03 00:02:12
 * @FilePath: \my-project\src\components\NavBar.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

"use client"; // 确保该组件只在客户端渲染

import { Menu, Typography, Button } from "antd";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import './style/NavBar.css'
export default function NavBar() {
  const [current, setCurrent] = useState("hotPlace"); // 使用 useState 来管理当前选中的 tab
  const { Title } = Typography 
  const router = useRouter();
  const value = useSelector((state) => state.userInfo.value);
  const items = [
    {
      label: "热门景点",
      key: "hotPlace",
    },
    {
      label: "热门活动",
      key: "hotActive",
    },
    {
      label: "热门住宿",
      key: "hotHotel",
    },
  ];

  const onClick = (e) => {
    setCurrent(e.key); // 当 tab 被点击时，更新当前选中的 tab
  };
  const token = Cookies.get('token')
  console.log(token, 'token');
  const toLogin = (e) => {
    
    router.push('/login')
    
  }
  const toRegister = () => {
    router.push('/register')
  }

  return (
    <div className="container">
      {/* <div className="title"> <a ><Title level={2}>西部旅游网</Title></a></div> */}
      <Menu
        onClick={onClick}
        selectedKeys={[current]} // 通过 current 来决定选中的 tab
        mode="horizontal"
        items={items}
      />
      {!token ? <div className="loginBtn" style={{ lineHeight: '46px'}}> <Button onClick={toLogin}>登录</Button></div> : ''}
      {!token ?  <div className="regBtn" style={{marginLeft: '10px', lineHeight: '46px'}}> <Button onClick={toRegister}>注册</Button></div> : ''}
    </div>
  );
}
