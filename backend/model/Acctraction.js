/*
 * @Author: Wyfkkk 2224081986@qq.com
 * @Date: 2025-02-20 21:43:33
 * @LastEditors: Wyfkkk 2224081986@qq.com
 * @LastEditTime: 2025-02-20 21:54:41
 * @FilePath: \backend\model\Acctraction.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // 确保你已经正确设置了数据库连接

// 定义景点信息模型
const Attraction = sequelize.define('Attraction', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(100), // VARCHAR(100)
        allowNull: false, // 不能为空
    },
    location: {
        type: DataTypes.STRING(100), // VARCHAR(100)
        allowNull: false, // 不能为空
    },
    description: {
        type: DataTypes.TEXT, // TEXT
        allowNull: true, // 可以为空
    },
    image_url: {
        type: DataTypes.STRING(255), // VARCHAR(255)
        allowNull: true, // 可以为空
    },
    opening_hours: {
        type: DataTypes.STRING(50), // VARCHAR(50)
        allowNull: true, // 可以为空
    },
    entry_fee: {
        type: DataTypes.DECIMAL(10, 2), // DECIMAL(10, 2)
        allowNull: true, // 可以为空
    },
    rating: {
        type: DataTypes.FLOAT, // FLOAT
        allowNull: true, // 可以为空
    },
}, {
    tableName: 'attractions', // 指定表名
    timestamps: true, // 启用时间戳，自动生成 createdAt 和 updatedAt 字段
});

// 导出模型
module.exports = Attraction;