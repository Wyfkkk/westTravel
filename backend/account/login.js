/*
 * @Author: Wyfkkk 2224081986@qq.com
 * @Date: 2024-12-12 15:23:00
 * @LastEditors: Wyfkkk 2224081986@qq.com
 * @LastEditTime: 2024-12-13 18:08:53
 * @FilePath: \backend\account\login.js
 * @Description: 登录逻辑
 */
require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('../db');
const crypto = require('crypto');
const nodemailer = require('nodemailer');


router.post('/login', (req, res) => {
	const md5 = crypto.createHash('md5');
	const loginMsg = req.body;
	const phone = loginMsg.phone;
	const pwd = md5.update(loginMsg.pwd).digest('hex');

	let p = new Promise((resolve, reject) => {
		db('select id,user_name from tour_user where user_phone="'+ phone +'" and user_pwd="'+pwd +'"', (error, data) => {
			data ? resolve(data) : reject(error);
		});
	});

	// 0:用户不存在		1:登录成功		2:登录失败
	p.then((data) => {
		const len = data.length;
		if (len === 0) {
			res.json({
                backInfo: '0'
            });
		} else if (len === 1) {
			res.json({
				backInfo: '1',
				id: data[0].id,
				name: data[0].name,
				phone: phone
			});
		} else {
			res.json({
				backInfo: '2'
			});
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
  console.log(111)
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
