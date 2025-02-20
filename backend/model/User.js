const { DataTypes } = require('sequelize');
const sequelize = require('../db');

// 定义用户模型
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING(30), // VARCHAR(30)
        allowNull: true, // DEFAULT NULL
    },
    password: {
        type: DataTypes.STRING(255), // VARCHAR(255)
        allowNull: true, // DEFAULT NULL
    },
    email: {
        type: DataTypes.STRING(18), // VARCHAR(18)
        allowNull: true, // DEFAULT NULL
    },
    avatar: {
        type: DataTypes.STRING(255), // VARCHAR(255)
        allowNull: true, // DEFAULT NULL
    },
    isAdmin: {
        type: DataTypes.BOOLEAN, // BOOLEAN
        defaultValue: false, // DEFAULT FALSE
    },
}, {
    tableName: 'node_user', // 指定表名
    timestamps: false,  
});

module.exports = User;