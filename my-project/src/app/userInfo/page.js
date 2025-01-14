'use client'
import { useState } from "react";
import './style/userInfo.css'
import { useSelector } from 'react-redux';
import store from '../../store/store';
import { Avatar, message, Space, Button, Input, Form } from 'antd';
import api from "../../api/account/index";
import { useDispatch } from 'react-redux';
import { setUserInfoValue } from '../../store/reducers/userReducer';
import FileUpload from '../../components/upload.js'
export default function UserInfo() {
  const dispatch = useDispatch();
  const [res, setRes] = useState('');
  const userInfo = useSelector((state) => state.userInfo.value);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const handleEdit = () => {
    setIsEditing(true);
    form.setFieldsValue({
      username: userInfo.username,
      email: userInfo.email,
    });
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      if(values) {
        const res = await api.saveUserInfo({...values, id: userInfo.id})
        dispatch(setUserInfoValue(res.data.user));
        console.log(res, 'res')
        messageApi.open({
          type: 'success',
          content: '用户资料修改成功',
        });
        }
      // 这里可以添加保存逻辑，例如调用API更新用户信息
      setIsEditing(false);
    } catch (errorInfo) {
      messageApi.open({
        type: 'error',
        content: '修改失败',
      });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    
    <div className="infoContainer">
      {contextHolder}
      <div className="text"><h1>用户信息</h1></div>
      
      <div className="infoBox">
        <h2>头像：<Avatar src={userInfo.avatar || 'https://ts4.cn.mm.bing.net/th?id=OIP-C.IykEwu6UUNOvq9LFU0d3kwAAAA&w=226&h=226&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2'} /></h2>

        {isEditing ? (
          <div><FileUpload></FileUpload>
          <Form form={form} layout="vertical">
            <Form.Item name="username" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label="邮箱" rules={[{ required: true, message: '请输入邮箱' }]}>
              <Input />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" style={{marginLeft: '190px'}} htmlType="submit" onClick={handleSave}>保存</Button>
                <Button onClick={handleCancel}>取消</Button>
              </Space>
            </Form.Item>
          </Form></div>
        ) : (
          <>
            <h2>用户名: {userInfo.username}</h2>
            <h2>邮箱: {userInfo.email}</h2>
            <h2>账号属性: {userInfo.isAdmin === 0 ? '普通用户' : "管理员"}</h2>
            <Button type="primary" className="editButton" onClick={handleEdit}>修改信息</Button>
            {/* <Button type="primary" className="editButton" onClick={handleEdit}>保存</Button> */}
          </>
        )}
      </div>
    </div>
  );
}