/*
 * @Author: Wyfkkk 2224081986@qq.com
 * @Date: 2025-02-20 22:08:01
 * @LastEditors: Wyfkkk 2224081986@qq.com
 * @LastEditTime: 2025-03-01 16:50:30
 * @FilePath: \backend\model\Route.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // 确保你已经正确设置了数据库连接

// 定义景点路线模型
const Route = sequelize.define('Route', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    route_name: {
        type: DataTypes.STRING(100), // VARCHAR(100)
        allowNull: false, // 不能为空
    },
    description: {
        type: DataTypes.TEXT, // TEXT
        allowNull: true, // 可以为空
    },
    duration: {
        type: DataTypes.FLOAT, // FLOAT
        allowNull: true, // 可以为空
    },
    distance: {
        type: DataTypes.FLOAT, // FLOAT
        allowNull: true, // 可以为空
    },
    attraction_ids: {
        type: DataTypes.TEXT, // 用于存储景点 ID 的 JSON 字符串
        allowNull: true, // 可以为空
    },
}, {
    tableName: 'routes', // 指定表名
    timestamps: true, // 启用时间戳，自动生成 createdAt 和 updatedAt 字段
});

// 导出模型
module.exports = Route;