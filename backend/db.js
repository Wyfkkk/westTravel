/*
 * @Author: Wyfkkk 2224081986@qq.com
 * @Date: 2024-12-12 13:31:02
 * @LastEditors: Wyfkkk 2224081986@qq.com
 * @LastEditTime: 2025-02-20 21:05:34
 * @FilePath: \backend\db.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// const mysql = require('mysql2');
const { Sequelize } = require('sequelize');
// 创建数据库连接
// const connection = mysql.createConnection({
//     host: 'localhost',      // 数据库主机
//     user: 'root',  // 替换为您的数据库用户名
//     password: 'wang010504', // 替换为您的数据库密码
//     database: 'my_news_test' // 目标数据库
// });

const sequelize = new Sequelize('my_news_test', 'root', 'wang010504', {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log,  // 开启 SQL 日志
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: true,  // 默认为所有模型添加时间戳
        underscored: true  // 使用下划线命名法
    }
});

// 测试连接
sequelize.authenticate()
    .then(() => console.log('数据库连接成功'))
    .catch(err => console.error('数据库连接失败:', err));

module.exports = sequelize;