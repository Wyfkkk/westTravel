/*
 * @Author: Wyfkkk 2224081986@qq.com
 * @Date: 2024-12-12 15:23:00
 * @LastEditors: Wyfkkk 2224081986@qq.com
 * @LastEditTime: 2025-03-01 14:45:42
 * @FilePath: \backend\account\login.js
 * @Description: 登录逻辑
 */
require('dotenv').config();
const express = require('express');
const router = express.Router();
const fs = require('fs')
const db = require('../db');
const crypto = require('crypto');
const path = require('path');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
let Busboy = require('busboy');

const jwt = require('jsonwebtoken');
const User = require('../model/User');  // 引入 User 模型

router.post('/login', async (req, res) => {
	const { email, emailCode, password } = req.body;

	try {
		// 查找用户
		const user = await User.findOne({
			where: { email },
			attributes: ['id', 'username', 'password', 'email', 'isAdmin', 'avatar']
		});

		if (!user) {
			return res.status(400).json({ message: '用户不存在' });
		}

		const SECRET_KEY = 'wyf666';

		// 验证码登录
		if (!password) {
			if (emailCode && verificationCodes[email] === emailCode) {
				const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
				return res.json({ 
					user: user.toJSON(), 
					token, 
					message: '登录成功' 
				});
			} else {
				return res.status(400).json({ message: '验证码错误' });
			}
		}

		// 密码登录
		const match = await bcrypt.compare(password, user.password);
		if (match) {
			const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
			return res.json({ 
				user: user.toJSON(), 
				token, 
				message: '登录成功' 
			});
		} else {
			return res.status(400).json({ message: '密码错误' });
		}

	} catch (error) {
		console.error('登录错误:', error);
		return res.status(500).json({ message: '服务器错误' });
	}
});

// 添加Promise的处理

// 添加修改用户资料的接口
router.put('/update-info', async (req, res) => {
	const { id, username, email, avatar } = req.body;

	try {
		if (!id) {
			return res.status(400).json({ message: '用户ID不能为空' });
		}

		// 更新用户信息
		const [updateCount] = await User.update({
			username,
			email,
			avatar
		}, {
			where: { id }
		});

		if (updateCount === 0) {
			return res.status(404).json({ message: '用户未找到' });
		}

		// 查询更新后的用户信息
		const updatedUser = await User.findOne({
			where: { id },
			attributes: ['id', 'username', 'email', 'avatar', 'isAdmin']
		});

		res.json({ 
			message: '用户资料更新成功', 
			user: updatedUser 
		});

	} catch (error) {
		console.error('更新用户资料错误:', error);
		res.status(500).json({ message: '更新用户资料失败' });
	}
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

router.post('/uploads',function(req,res){
  const bb = Busboy({ headers: req.headers });

  let data = {
      filename:'', // 图片名字
      encoding:'', // 图片大小
      mimeType:'', // 图片格式
      imgUrl:'' // 图片地址
  }

  bb.on('file', (name, file, info) => {
      // 名字 大小 格式
      const { filename, encoding, mimeType } = info;
      // 根据时间创建名字 - 防止重名
      const filePath = new Date().getTime() + path.extname(filename)
      // 保存数据
      data = {...info,filename:filePath}
      // 拼接地址
      const saveTo = path.join(__dirname, './uploads', filePath);
      // 写入流
      file.pipe(fs.createWriteStream(saveTo));
  }); 

  bb.on('finish', function () {
      // 地址回显
      data.imgUrl = 'http://127.0.0.1:3000/uploads/' + data.filename
      // 返回图片
      res.status(201).json({
          msg:'上传成功',
          data
      });
  });
  
  return req.pipe(bb);
});



module.exports = router
