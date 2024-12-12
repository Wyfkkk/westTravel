/*
 * @Author: Wyfkkk 2224081986@qq.com
 * @Date: 2024-12-12 15:23:00
 * @LastEditors: Wyfkkk 2224081986@qq.com
 * @LastEditTime: 2024-12-12 15:23:16
 * @FilePath: \backend\account\login.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');
const router = express.Router();
const db = require('../db');
const crypto = require('crypto');

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

module.exports = router;