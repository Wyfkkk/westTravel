/*
 * @Author: Wyfkkk 2224081986@qq.com
 * @Date: 2024-12-13 17:16:34
 * @LastEditors: Wyfkkk 2224081986@qq.com
 * @LastEditTime: 2024-12-13 18:36:45
 * @FilePath: \backend\account\sendEmail.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */



const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const router = express.Router();
const db = require('../db');


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
router.post('/api/send-verification-code', (req, res) => {
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
