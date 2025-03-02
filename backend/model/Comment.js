const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
const Attraction = require('./Attraction');  // 引入景点模型

// 定义评论模型
const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,  // 评论内容
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,  // 评论者ID
        allowNull: false
    },
    attractionId: {  // 新增景点ID字段
        type: DataTypes.INTEGER,
        allowNull: false
    },
    parentId: {
        type: DataTypes.INTEGER,  // 父评论ID（用于回复功能）
        allowNull: true,
        defaultValue: null
    },
    likes: {
        type: DataTypes.INTEGER,  // 点赞数
        defaultValue: 0
    },
    status: {
        type: DataTypes.ENUM('active', 'deleted'),  // 评论状态
        defaultValue: 'active'
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'comments',
    timestamps: true,  // 启用时间戳
});

// 建立与用户表的关联
Comment.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

User.hasMany(Comment, {
    foreignKey: 'userId',
    as: 'comments'
});

// 自关联（用于回复功能）
Comment.belongsTo(Comment, {
    foreignKey: 'parentId',
    as: 'parent'
});

Comment.hasMany(Comment, {
    foreignKey: 'parentId',
    as: 'replies'
});

// 建立与景点的关联
Comment.belongsTo(Attraction, {
    foreignKey: 'attractionId',
    as: 'attraction'
});

module.exports = Comment; 