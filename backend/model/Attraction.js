/*
 * @Author: Wyfkkk 2224081986@qq.com
 * @Date: 2025-03-01 16:34:56
 * @LastEditors: Wyfkkk 2224081986@qq.com
 * @LastEditTime: 2025-03-01 16:56:50
 * @FilePath: \backend\model\Attraction.js
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
        type: DataTypes.FLOAT,
        defaultValue: 5.0,
        comment: '平均评分'
    },
    ratingCount: {  // 新增评分人数字段
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: '评分人数'
    },
    totalRating: {  // 新增总评分字段
        type: DataTypes.FLOAT,
        defaultValue: 0,
        comment: '总评分'
    },
    visitCount: {
        type: DataTypes.INTEGER,  // 使用 INTEGER 类型
        allowNull: true,
        defaultValue: 0
    },
    collect: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    provider: {
        type: DataTypes.STRING(50), // VARCHAR(50)
        allowNull: true, // 可以为空
    },
    tag: {
        type: DataTypes.STRING(50), // VARCHAR(50)
        allowNull: true, // 可以为空
    }
}, {
    tableName: 'attractions', // 指定表名
    timestamps: true, // 启用时间戳，自动生成 createdAt 和 updatedAt 字段
});

// 导出模型
module.exports = Attraction;