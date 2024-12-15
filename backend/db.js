/*
 * @Author: Wyfkkk 2224081986@qq.com
 * @Date: 2024-12-12 13:31:02
 * @LastEditors: Wyfkkk 2224081986@qq.com
 * @LastEditTime: 2024-12-16 02:05:31
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
    //         password VARCHAR(18) DEFAULT NULL,
    //         email VARCHAR(18) DEFAULT NULL,
    //         PRIMARY KEY (id) 
    //     ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
    //     "INSERT INTO node_user (id, username, password, email) VALUES (1, '王宇飞', '123456', '2224081986@qq.com');",
    //     "INSERT INTO node_user (id, username, password, email) VALUES (2, '盘回头', '123456', '2324081986@qq.com');",
    //     "INSERT INTO node_user (id, username, password, email) VALUES (3, '小刘', '123456', '2222081986@qq.com');",
    //     "INSERT INTO node_user (id, username, password, email) VALUES (4, '飞', '123456', '2224011986@qq.com');"
    // ];

    // 执行每个 SQL 语句
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
    connection.end();
});