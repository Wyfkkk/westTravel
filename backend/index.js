/*
 * @Author: Wyfkkk 2224081986@qq.com
 * @Date: 2024-12-03 14:26:16
 * @LastEditors: Wyfkkk 2224081986@qq.com
 * @LastEditTime: 2025-03-01 16:53:57
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
const { sequelize } = require('./model/index');
const seedAttractions = require('./scripts/seedAttractions');
const attraction = require('./attraction/index');
const path = require('path');
const ratingRoutes = require('./rate/rating');

// 处理跨域
app.use(cors());
// 中间件：解析 JSON 请求体
app.use(express.json());

// 使用子路由
app.use('/api', routes); // 所有子路由前缀为 /api
app.use('/api', login)
app.use('/api', register)

app.use('/api', attraction);
app.use('/api', ratingRoutes);

app.use(express.static('public/images'))

// 设置静态文件服务
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const initDb = async () => {
    try {
        // 先测试数据库连接
        await sequelize.authenticate();
        console.log('数据库连接成功');

        // 同步数据库结构
        await sequelize.sync({ alter: true });
        console.log('数据库表创建成功');
        
        // 添加示例数据
        await seedAttractions();
    } catch (error) {
        console.error('数据库初始化失败:', error);
        if (error.name === 'SequelizeConnectionError') {
            console.error('数据库连接失败，请检查数据库配置');
        } else if (error.name === 'SequelizeDatabaseError') {
            console.error('数据库操作错误:', error.parent.message);
        } else {
            console.error('错误详情:', error.message);
        }
        process.exit(1);  // 如果初始化失败，退出程序
    }
};

initDb();
// 启动服务器
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});