/*
 * @Author: Wyfkkk 2224081986@qq.com
 * @Date: 2024-11-30 16:15:57
 * @LastEditors: Wyfkkk 2224081986@qq.com
 * @LastEditTime: 2025-01-13 12:06:58
 * @FilePath: \my-project\src\app\login\page.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
"use client";
import { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { useRouter } from "next/navigation";
import { SwapOutlined } from '@ant-design/icons'
import api from "../../api/account/index";
import './login.css'; // 引入CSS文件
import Cookies from 'js-cookie';

import { useDispatch } from 'react-redux';
import { setUserInfoValue } from '../../store/reducers/userReducer';
export default function Login({ children }) {
  const dispatch = useDispatch();
  const { Title } = Typography;
  const [type, setType] = useState(true);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  let getCode = async () => {
    let res = await api.getEmailCode();
    return;
  }

  const onFinish = async (values) => {
    setLoading(true);
    setError("");

    console.log(values, 'val');

    try {
      const res = await api.login(values)
      Cookies.set('token', res.token, { expires: 1 }); // 1 天有效期
      dispatch(setUserInfoValue(res.user));
      setLoading(false);
      router.push("/front"); 
    } catch (err) {
      setLoading(false);
      setError("登录失败，请重试。");
    }
  };
  const toRegister = () => {
    router.push('/register')
  }

  return (
    
    <div className="container">
      <div className="login-form">
        <Title level={2}>登录</Title>
        <Button type="text" onClick={() => setType(!type)}>
        <SwapOutlined> </SwapOutlined>
          {type ? '用邮箱验证码登录' : '用密码登录'}
        </Button>
       
        {error && <p className="error-message">{error}</p>}
        <Form name="login" onFinish={onFinish} layout="vertical">
          <Form.Item
            label="用户邮箱"
            name="email"
            rules={[{ required: true, message: "请输入邮箱!" }]}
          >
            <Input />
          </Form.Item>
          {type && (
            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: "请输入密码!" }]}
            >
              <Input.Password  />
            </Form.Item>
          )}
          {!type && (
            <Form.Item
              label="验证码"
              name="emailCode"
              rules={[{ required: true, message: "请输入验证码!" }]}
            >
              <Input placeholder="请输入验证码" />
            </Form.Item>
          )}
          <Form.Item>
            {!type ? <Button type="primary" htmlType="button" onClick={getCode} loading={loading}>
              获取验证码
            </Button> : ''}
            
            <Button type="primary" htmlType="submit" loading={loading}>
              登录
            </Button>
            <Button color="default" variant="text" onClick={toRegister}>还没有账号？去注册</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}