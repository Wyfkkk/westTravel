/*
 * @Author: Wyfkkk 2224081986@qq.com
 * @Date: 2024-12-12 12:18:05
 * @LastEditors: Wyfkkk 2224081986@qq.com
 * @LastEditTime: 2025-01-21 13:54:23
 * @FilePath: \my-project\src\api\test\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios';
import axiosInstance from '../index.js';

// const getAllItems = async () => {
//   try {
//     const res = await axiosInstance.get('/data');
//     return res.data; // 返回响应数据
//   } catch (error) {
//     console.error('获取数据失败:', error);
//     throw error; // 重新抛出错误，以便调用者处理
//   }
// };
const getEmailCode = async (email) => {
  console.log(email, 'email');
  try {
    const res = await axiosInstance.post('/send-verification-code', {
      email,
    });
    return res.data;
  }catch (err){
    console.error('获取失败', err)
    throw err
  }
}
const register = async (val) => {
  try {
    const res = await axiosInstance.post('/register', {
      username: val.username,
      email: val.email,
      password: val.password,
      emailCode: val.emailCode
    })
    return res.data
  } catch(e) {
    console.error('获取失败', err)
    throw err
  }
}
const login = async (val) => {
  try {
    const res = await axiosInstance.post('/login', {
      email: val.email,
      password: val.password,
      emailCode: val.emailCode,
    })
    return res.data;
  }
  catch(e) {
    console.error('登陆失败', e);
    throw e;
  }
}
const saveUserInfo = async (val) => {

  try {
    const res = await axiosInstance.put('/update-info', {
      email: val.email,
      username: val.username,
      id: val.id,
      avatar: val.avatar
    })
    return res;
  }catch(e) {
    
    throw e;
  }
}
const uploadFile = async (val) => {
  try {
    const res = await axiosInstance.post('/upload', {
      file: val.file,
      
    })
    return res;
  }catch(e) {
    throw e
  }
}

export default { getEmailCode, register, login, saveUserInfo, uploadFile };