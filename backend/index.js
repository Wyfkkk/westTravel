// server.js
const express = require('express');
const app = express();
const port = 8000;

// 中间件：解析 JSON 请求体
app.use(express.json());

// 路由：根路由
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});