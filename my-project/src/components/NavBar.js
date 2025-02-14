/*
 * @Author: Wyfkkk 2224081986@qq.com
 * @Date: 2024-12-03 15:33:40
 * @LastEditors: Wyfkkk 2224081986@qq.com
 * @LastEditTime: 2025-01-15 23:33:05
 * @FilePath: \my-project\src\components\NavBar.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

"use client"; // 确保该组件只在客户端渲染

import { Menu, Typography, Button, Collapse } from "antd";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

import './style/NavBar.css'
import { useSelector } from 'react-redux';
const { Panel } = Collapse;
export default function NavBar() {
  const [current, setCurrent] = useState("hotPlace"); // 使用 useState 来管理当前选中的 tab
  const { Title } = Typography 
  const router = useRouter();
  const value = useSelector((state) => state.userInfo.value);
  console.log(value, 'value') 



  const token = Cookies.get('token')
  const toLogin = (e) => {
    router.push('/login')
  }
  const toRegister = () => {
    router.push('/register')
  }
  // 控制个人信息展开
  const [activeKey, setActiveKey] = useState(null);

  const handleMouseEnter = () => {
    setActiveKey('1'); // 展开菜单
  };

  const handleMouseLeave = () => {
    setActiveKey(null); // 收起菜单
  };

  return (
    <div className="box">
      <div className="title"> <a ><Title level={2}>西部旅游网</Title></a></div>
      {/* <Menu
        onClick={onClick}
        selectedKeys={[current]} // 通过 current 来决定选中的 tab
        mode="horizontal"
        items={items}
      /> */}
      <div className="btnBox">
      <Button type="text" onClick={() => {router.push('/acctractionHome')}}>景点</Button>
      <Button type="text" onClick={() => {router.push('/')}}>攻略区</Button>
      <Button type="text" onClick={() => {router.push('/')}}>酒店</Button>
      <Button type="text" onClick={() => {router.push('/')}}>我的订单</Button>
      <Button type="text" onClick={() => {router.push('/')}}>订单详情</Button>
      <Button type="text" onClick={() => {router.push('/')}}>公告通知</Button>
      <Button type="text" onClick={() => {router.push('/')}}>内容中心</Button>
      </div>
      {token ?   <div style={{width: '140px', position: 'absolute', left: '1470px', backgroundColor: 'white'}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
   
      <Collapse activeKey={activeKey} expandIconPosition="right" bordered={false}>
        <Panel header={value.username} key="1">
          <a onClick={() => router.push('/userInfo')}>修改个人资料</a>
          <div onClick={() => console.log('退出登录')}>退出登录</div>
        </Panel>
      </Collapse>
    </div> : ''}
      {!token ? <div className="loginBtn" style={{ lineHeight: '46px'}}> <Button onClick={toLogin}>登录</Button></div> : ''}
      {!token ?  <div className="regBtn" style={{marginLeft: '10px', lineHeight: '46px'}}> <Button onClick={toRegister}>注册</Button></div> : ''}
    </div>
  );
}
