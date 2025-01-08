/*
 * @Author: Wyfkkk 2224081986@qq.com
 * @Date: 2024-12-12 12:17:34
 * @LastEditors: Wyfkkk 2224081986@qq.com
 * @LastEditTime: 2024-12-12 13:30:04
 * @FilePath: \my-project\src\api\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// lib/axiosInstance.js

import axios from 'axios';
import Cookies from 'js-cookie'
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api', // 替换为你的 API 基础 URL
  timeout: 10000, // 超时设置
  headers: {
    'Content-Type': 'application/json',
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token'); // 从 localStorage 获取 Token
    if (token) {
      config.headers['Authorization'] = token; // 添加 Token 到请求头
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;