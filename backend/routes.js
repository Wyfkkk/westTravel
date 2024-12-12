/*
 * @Author: Wyfkkk 2224081986@qq.com
 * @Date: 2024-12-12 13:28:51
 * @LastEditors: Wyfkkk 2224081986@qq.com
 * @LastEditTime: 2024-12-12 13:29:00
 * @FilePath: \backend\routes.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// routes.js
const express = require('express');
const router = express.Router();

// 路由：根路由
router.get('/data', (req, res) => {
    res.send('Hello, World!');
});

// 其他子路由
router.get('/another', (req, res) => {
    res.send('This is another route!');
});

module.exports = router;