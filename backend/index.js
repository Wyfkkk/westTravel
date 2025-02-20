/*
 * @Author: Wyfkkk 2224081986@qq.com
 * @Date: 2024-12-03 14:26:16
 * @LastEditors: Wyfkkk 2224081986@qq.com
 * @LastEditTime: 2025-02-20 21:18:05
 * @FilePath: \backend\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// server.js
const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const routes = require('./routes/index'); // 引入子路由模块
const login = require('./account/login')
const register = require('./account/register')
const sequelize = require('./db.js');    
// 处理跨域
app.use(cors());
// 中间件：解析 JSON 请求体
app.use(express.json());

// 使用子路由
app.use('/api', routes); // 所有子路由前缀为 /api
app.use('/api', login)
app.use('/api', register)

app.use(express.static('public/images'))

const initDb = async () => {
    try {
        await sequelize.sync({ force: false }); // force: true 会删除现有表并重新创建
        console.log('数据库已同步');
    } catch (error) {
        console.error('数据库同步失败:', error);
    }
};

initDb();
// 启动服务器
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});