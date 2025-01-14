/*
 * @Author: Wyfkkk 2224081986@qq.com
 * @Date: 2024-12-12 15:23:00
 * @LastEditors: Wyfkkk 2224081986@qq.com
 * @LastEditTime: 2025-01-14 23:59:43
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
router.post('/login', async (req, res) => {
	//const md5 = crypto.createHash('md5');
	
	const { email, emailCode, password} = req.body;

  let p = new Promise((resolve, reject) => {
    const sql = `SELECT id, username, password, email, isAdmin, avatar FROM node_user WHERE email = ?`
    db.query(sql, [email], async (error, data) => {
        if (error) {
            reject(error); // 如果出现错误，拒绝 Promise
        } else {
          console.log(data, 'data')
          const user = data[0];
          const match = await bcrypt.compare(password, user.password); // 验证密码
          const SECRET_KEY = 'wyf666'
          if (match) {
            const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
            return res.json({ user, token, message: '登录成功' });
             
          } else {
              res.status(400).json({ message: '密码错误' });
          }
            resolve(data); // 如果查询成功，解析 Promise
        }
    });
});

	// 0:用户不存在		1:登录成功		2:登录失败
	// p.then((data) => {
	// 	const len = data.length;
	// 	if (len === 0) {
	// 		res.json({
  //               backInfo: '0'
  //           });
  //           return
	// 	} else if (len === 1) {
	// 		res.json({
	// 			backInfo: '1',
	// 			id: data[0].id,
	// 			name: data[0].name,
	// 			// phone: phone
	// 		});
  //     return
	// 	} else {
	// 		res.json({
	// 			backInfo: '2'
	// 		});
  //     return
	// 	}
	// });
});

// 添加修改用户资料的接口
router.put('/update-info', async (req, res) => {
  const { id, username, email, avatar } = req.body;

  if (!id) {
      return res.status(400).json({ message: '用户ID不能为空' });
  }

  const sql = `UPDATE node_user SET username = ?, email = ?, avatar = ? WHERE id = ?`;
  db.query(sql, [username, email, avatar, id], (error, result) => {
      if (error) {
          console.error(error);
          return res.status(500).json({ message: '更新用户资料失败' });
      }
      if (result.affectedRows === 0) {
          return res.status(404).json({ message: '用户未找到' });
      }

      // 查询更新后的用户信息
      const selectSql = `SELECT id, username, email, avatar, isAdmin FROM node_user WHERE id = ?`;
      db.query(selectSql, [id], (selectError, selectResult) => {
          if (selectError) {
              console.error(selectError);
              return res.status(500).json({ message: '获取用户信息失败' });
          }
          const updatedUser = selectResult[0];
          res.json({ message: '用户资料更新成功', user: updatedUser });
      });
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
      res.send({
          code:201,
          msg:'上传成功',
          data
      });
  });
  
  return req.pipe(bb);
});



module.exports = router
