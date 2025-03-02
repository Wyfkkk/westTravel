const express = require('express');
const router = express.Router();
const { Attraction, Comment, User } = require('../model/index');

// 获取所有景点列表
router.get('/getAcctractionList', async (req, res) => {
    try {
        const attractions = await Attraction.findAll({
            include: [
                {
                    model: Comment,
                    as: 'comments',
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ['id', 'username', 'avatar']
                        }
                    ]
                }
            ],
            order: [
                ['id', 'ASC'],
                [{ model: Comment, as: 'comments' }, 'createdAt', 'DESC']
            ]
        });

        res.json({
            code: 200,
            message: '获取景点列表成功',
            data: attractions
        });
    } catch (error) {
        console.error('获取景点列表失败:', error);
        res.status(500).json({
            code: 500,
            message: '获取景点列表失败',
            error: error.message
        });
    }
});

// 获取单个景点详情
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const attraction = await Attraction.findOne({
            where: { id },
            include: [
                {
                    model: Comment,
                    as: 'comments',
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ['id', 'username', 'avatar']
                        }
                    ]
                }
            ]
        });

        if (!attraction) {
            return res.status(404).json({
                code: 404,
                message: '景点不存在'
            });
        }

        res.json({
            code: 200,
            message: '获取景点详情成功',
            data: attraction
        });
    } catch (error) {
        console.error('获取景点详情失败:', error);
        res.status(500).json({
            code: 500,
            message: '获取景点详情失败',
            error: error.message
        });
    }
});

module.exports = router; 