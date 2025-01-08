/*
 * @Author: Wyfkkk 2224081986@qq.com
 * @Date: 2024-12-12 15:23:00
 * @LastEditors: Wyfkkk 2224081986@qq.com
 * @LastEditTime: 2025-01-02 00:38:04
 * @FilePath: \backend\account\login.js
 * @Description: 登录逻辑
 */
require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('../db');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const jwt = require('jsonwebtoken');
router.post('/login', async (req, res) => {
	//const md5 = crypto.createHash('md5');
	
	const { email, emailCode, password} = req.body;

  console.log(req.body ,'req')
  let p = new Promise((resolve, reject) => {
    const sql = `SELECT id, username, password FROM node_user WHERE email = ?`
    db.query(sql, [email], async (error, data) => {
        if (error) {
            reject(error); // 如果出现错误，拒绝 Promise
        } else {
          console.log(data, 'data');
          const user = data[0];
          const match = await bcrypt.compare(password, user.password); // 验证密码
          const SECRET_KEY = 'wyf666'
          if (match) {
            const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
            return res.json({ user, token, message: '登录成功' });
              // res.status(200).json({ message: '登录成功' });
          } else {
              res.status(400).json({ message: '密码错误' });
          }
            resolve(data); // 如果查询成功，解析 Promise
        }
    });
});

	// 0:用户不存在		1:登录成功		2:登录失败
	p.then((data) => {
		const len = data.length;
		if (len === 0) {
			res.json({
                backInfo: '0'
            });
            return
		} else if (len === 1) {
			res.json({
				backInfo: '1',
				id: data[0].id,
				name: data[0].name,
				// phone: phone
			});
      return
		} else {
			res.json({
				backInfo: '2'
			});
      return
		}
	});
});


let verificationCodes = {}; // 存储验证码

// 邮件发送设置
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVICE === 'qq' ? 'smtp.qq.com' : 'smtp.163.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});
// 发送验证码的路由
router.post('/send-verification-code', (req, res) => {
  console.log(req.body, '邮箱请求体')
  const { email } = req.body;
  const verificationCode = crypto.randomBytes(3).toString('hex'); // 生成随机验证码

  // 将验证码存储在内存中
  verificationCodes[email] = verificationCode;

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: 'Your Verification Code',
    text: `Your verification code is: ${verificationCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error, 'error');
      return res.status(500).send('Error sending email');
    }
    res.status(200).send('Verification code sent!');
  });
});

module.exports = router
