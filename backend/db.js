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
    const sql = [
        "SET FOREIGN_KEY_CHECKS=0;",
        "DROP TABLE IF EXISTS node_user;",
        `CREATE TABLE node_user (
            id INT(11) NOT NULL AUTO_INCREMENT,
            name VARCHAR(30) DEFAULT NULL,
            age INT(8) DEFAULT NULL,
            PRIMARY KEY (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
        "INSERT INTO node_user (id, name, age) VALUES (1, 'admin', 32);",
        "INSERT INTO node_user (id, name, age) VALUES (2, 'dans88', 45);",
        "INSERT INTO node_user (id, name, age) VALUES (3, '张三', 35);",
        "INSERT INTO node_user (id, name, age) VALUES (4, 'ABCDEF', 88);",
        "INSERT INTO node_user (id, name, age) VALUES (5, '李小二', 65);"
    ];

    // 执行每个 SQL 语句
    sql.forEach((query, index) => {
        connection.query(query, (error, results) => {
            if (error) {
                console.error(`执行 SQL 语句失败（第 ${index + 1} 条）: `, error);
                return;
            }
            console.log(`SQL 语句执行成功（第 ${index + 1} 条）: `, results);
        });
    });

    // 关闭连接
    connection.end();
});