
 /*
  * @Author: Wyfkkk 2224081986@qq.com
  * @Date: 2024-11-30 16:15:57
 * @LastEditors: Wyfkkk 2224081986@qq.com
 * @LastEditTime: 2025-02-18 00:10:20
  * @FilePath: \my-project\src\app\login\page.js
  * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
  */
 "use client";
 import { useState } from "react";
 import { Form, Input, Button, Typography } from "antd";
 import { useRouter } from "next/navigation";
 import { SwapOutlined } from '@ant-design/icons'
 import getEmailCode from "../../api/account/index";
 import './register.css'; // 引入CSS文件
 import api from '../../api/account/index'
 export default function Register({ children }) {
   const { Title } = Typography;
   const [type, setType] = useState(true);
   const router = useRouter();
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");
   const [form] = Form.useForm();
   let getCode = async () => {
    let email = form.getFieldValue('email')
    try {
        let res = await api.getEmailCode(email);
        return res; // 返回获取的代码
    } catch (error) {
        console.error('Error fetching code:', error);
    }
};  
 
   const onFinish = async (values) => {
     setLoading(true);
     setError("");
 
    
    
     try {
      let res = await api.register(values);
      console.log(res, 'res');
      setLoading(false);
      router.push("/login"); 
     } catch (err) {
       setLoading(false);
       setError("注册失败，请重试。");
     }
   };
 
   return (
     <div className="container">
       <div className="login-form">
         <Title level={2}>注册</Title>
         
        
         {error && <p className="error-message">{error}</p>}
         <Form name="login" form={form} onFinish={onFinish} layout="vertical">
         <Form.Item
             label="用户名"
             name="username"
             rules={[{ required: true, message: "请输入用户名!" }]}
           >
             <Input placeholder="请输入您的名称" />
           </Form.Item>
           <Form.Item
             label="用户邮箱"
             name="email"
             rules={[{ required: true, message: "请输入邮箱!" }]}
           >
             <Input placeholder="请输入您的邮箱" />
           </Form.Item>
           <Form.Item
               label="验证码"
               name="emailCode"
               rules={[{ required: true, message: "请输入验证码!" }]}
             >
               <Input placeholder="请输入验证码" />
             </Form.Item> 
             <Form.Item
               label="密码"
               name="password"
               rules={[{ required: true, message: "请输入密码!" }]}
             >
               <Input.Password placeholder="请输入您的密码" />
             </Form.Item>
           
            
             
           
           <Form.Item>
             <Button type="primary" htmlType="button" onClick={getCode} loading={loading}>
               获取验证码
             </Button>
             <Button type="primary" htmlType="submit" loading={loading}>
               注册
             </Button>
           </Form.Item>
         </Form>
       </div>
     </div>
   );
 }