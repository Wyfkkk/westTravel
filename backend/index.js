/*
 * @Author: Wyfkkk 2224081986@qq.com
 * @Date: 2024-12-03 14:26:16
 * @LastEditors: Wyfkkk 2224081986@qq.com
 * @LastEditTime: 2024-12-12 13:28:18
 * @FilePath: \backend\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// server.js
const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const routes = require('./routes'); // 引入子路由模块

// 处理跨域
app.use(cors());
// 中间件：解析 JSON 请求体
app.use(express.json());

// 使用子路由
app.use('/api', routes); // 所有子路由前缀为 /api

// 启动服务器
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});