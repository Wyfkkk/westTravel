/*
 * @Author: Wyfkkk 2224081986@qq.com
 * @Date: 2024-12-12 13:31:02
 * @LastEditors: Wyfkkk 2224081986@qq.com
 * @LastEditTime: 2025-01-13 11:40:51
 * @FilePath: \backend\db.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const mysql = require('mysql2');

// 创建数据库连接
const connection = mysql.createConnection({
    host: 'localhost',      // 数据库主机
    user: 'root',  // 替换为您的数据库用户名
    password: 'wang010504', // 替换为您的数据库密码
    database: 'my_news_test' // 目标数据库
});

// 连接到数据库
connection.connect(err => {
    if (err) {
        console.error('连接失败: ', err.stack);
        return;
    }
    console.log('已连接到数据库');

   // 依次执行 SQL 语句
    // const sql = [
    //     "SET FOREIGN_KEY_CHECKS=0;",
    //     "DROP TABLE IF EXISTS node_user;",
    //     `CREATE TABLE node_user (
    //         id INT(11) NOT NULL AUTO_INCREMENT,
    //         username VARCHAR(30) DEFAULT NULL,
    //         password VARCHAR(255) DEFAULT NULL,
    //         email VARCHAR(18) DEFAULT NULL,
    //         avatar VARCHAR(255) DEFAULT NULL,
    //         isAdmin BOOLEAN DEFAULT FALSE,
    //         PRIMARY KEY (id) 
    //     ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
    //     "INSERT INTO node_user (id, username, password, email, avatar, isAdmin) VALUES (1, '王宇飞', '123456', '2224081986@qq.com', 'https://ts4.cn.mm.bing.net/th?id=OIP-C.IykEwu6UUNOvq9LFU0d3kwAAAA&w=226&h=226&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2', true);",
    //     "INSERT INTO node_user (id, username, password, email, avatar, isAdmin) VALUES (2, '盘回头', '123456', '2324081986@qq.com', 'https://ts4.cn.mm.bing.net/th?id=OIP-C.IykEwu6UUNOvq9LFU0d3kwAAAA&w=226&h=226&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2', false);",
    //     "INSERT INTO node_user (id, username, password, email, avatar, isAdmin) VALUES (3, '小刘', '123456', '2222081986@qq.com', 'https://ts4.cn.mm.bing.net/th?id=OIP-C.IykEwu6UUNOvq9LFU0d3kwAAAA&w=226&h=226&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2', false);",
    //     "INSERT INTO node_user (id, username, password, email, avatar, isAdmin) VALUES (4, '飞', '123456', '2224011986@qq.com', 'https://ts4.cn.mm.bing.net/th?id=OIP-C.IykEwu6UUNOvq9LFU0d3kwAAAA&w=226&h=226&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2', false);"
    // ];

    // // 执行每个 SQL 语句
    // sql.forEach((query, index) => {
    //     connection.query(query, (error, results) => {
    //         if (error) {
    //             console.error(`执行 SQL 语句失败（第 ${index + 1} 条）: `, error);
    //             return;
    //         }
    //         console.log(`SQL 语句执行成功（第 ${index + 1} 条）: `, results);
    //     });
    // });

    // 关闭连接
    // connection.end();
});
module.exports = connection;