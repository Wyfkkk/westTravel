const sequelize = require('../db');
const User = require('./User');
const Attraction = require('./Attraction');
const Comment = require('./Comment');

// 清除所有已存在的关联
User.associations = {};
Attraction.associations = {};
Comment.associations = {};

// 重新定义关联关系
User.hasMany(Comment, {
    foreignKey: 'userId',
    as: 'comments'
});

Attraction.hasMany(Comment, {
    foreignKey: 'attractionId',
    as: 'comments'  // 改为复数形式
});

Comment.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

Comment.belongsTo(Attraction, {
    foreignKey: 'attractionId',
    as: 'attraction'
});

// 评论的自关联
Comment.belongsTo(Comment, {
    foreignKey: 'parentId',
    as: 'parent'
});

Comment.hasMany(Comment, {
    foreignKey: 'parentId',
    as: 'replies'
});

module.exports = {
    sequelize,
    User,
    Attraction,
    Comment
}; 