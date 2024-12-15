const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');

const router = express.Router();

// 创建 MySQL 连接
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // 根据你的 MySQL 用户名
  password: 'wang010504', // 根据你的 MySQL 密码
  database: 'my_news_test'
});

// 注册用户
router.post('/register', async (req, res) => {
    console.log(req.body, 'body')
  const { username, password, email, emailCode } = req.body;

  try {
    // 检查用户是否已存在
    db.query('SELECT * FROM node_user WHERE email = ?', [email], async (err, results) => {
      if (err) return res.status(500).js,on({ message: '服务器错误' });
      if (results.length > 0) {
        return res.status(400).json({ message: '用户已存在' });
      }

      // 哈希密码
      const hashedPassword = await bcrypt.hash(password, 10);

      // 创建新用户
      db.query('INSERT INTO node_user ( username, password, email) VALUES ( ?, ?, ?)', [username, hashedPassword, email], (err) => {
        if (err) {
            console.log(err, 'err');
            return res.status(500).json({ message: '注册失败' });
        }
        res.status(200).json({ message: '注册成功' });
      });
    });
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
});

module.exports = router;