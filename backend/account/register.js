/*
 * @Author: Wyfkkk 2224081986@qq.com
 * @Date: 2024-12-16 01:48:09
 * @LastEditors: Wyfkkk 2224081986@qq.com
 * @LastEditTime: 2025-03-01 14:47:59
 * @FilePath: \毕业设计\backend\account\register.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const db = require('../db')
const router = express.Router();
const User = require('../model/User');

// 创建 MySQL 连接
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root', // 根据你的 MySQL 用户名
//   password: 'wang010504', // 根据你的 MySQL 密码
//   database: 'my_news_test'
// });

// 注册用户
router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;

    try {
        // 检查邮箱是否已存在
        const existingUser = await User.findOne({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({ message: '该邮箱已被注册' });
        }

        // 密码加密
        const hashedPassword = await bcrypt.hash(password, 10);

        // 创建新用户
        const newUser = await User.create({
            username,
            password: hashedPassword,
            email,
            isAdmin: false  // 默认非管理员
        });

        // 返回创建的用户信息（不包含密码）
        const userResponse = {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin
        };

        res.status(201).json({
            message: '注册成功',
            user: userResponse
        });

    } catch (error) {
        console.error('注册错误:', error);
        res.status(500).json({ message: '注册失败，请稍后重试' });
    }
});

module.exports = router;