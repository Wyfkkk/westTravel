const express = require('express');
const router = express.Router();
const Comment = require('../model/Comment');
const User = require('../model/User');
const Attraction = require('../model/Attraction');

// 创建评论
router.post('/create', async (req, res) => {
    const { content, userId, attractionId, parentId } = req.body;

    try {
        const comment = await Comment.create({
            content,
            userId,
            attractionId,
            parentId
        });

        // 获取包含用户信息的完整评论
        const newComment = await Comment.findOne({
            where: { id: comment.id },
            include: [{
                model: User,
                as: 'user',
                attributes: ['id', 'username', 'avatar']
            }]
        });

        res.status(201).json({
            message: '评论成功',
            comment: newComment
        });
    } catch (error) {
        console.error('创建评论错误:', error);
        res.status(500).json({ message: '评论失败' });
    }
});

// 获取特定景点的评论列表
router.get('/attraction/:attractionId', async (req, res) => {
    const { attractionId } = req.params;
    try {
        const comments = await Comment.findAll({
            where: {
                attractionId,
                parentId: null,
                status: 'active'
            },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'username', 'avatar']
                },
                {
                    model: Attraction,
                    as: 'attraction',
                    attributes: ['id', 'name', 'description']
                },
                {
                    model: Comment,
                    as: 'replies',
                    where: { status: 'active' },
                    required: false,
                    include: [{
                        model: User,
                        as: 'user',
                        attributes: ['id', 'username', 'avatar']
                    }]
                }
            ],
            order: [
                ['createdAt', 'DESC'],
                [{ model: Comment, as: 'replies' }, 'createdAt', 'ASC']
            ]
        });

        res.json({ 
            attractionId,
            comments 
        });
    } catch (error) {
        console.error('获取评论列表错误:', error);
        res.status(500).json({ message: '获取评论失败' });
    }
});

// 获取评论列表（包含回复）
router.get('/list', async (req, res) => {
    try {
        const comments = await Comment.findAll({
            where: {
                parentId: null, // 只获取主评论
                status: 'active' // 只获取活跃的评论
            },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'username', 'avatar']
                },
                {
                    model: Comment,
                    as: 'replies',
                    where: { status: 'active' },
                    required: false, // LEFT JOIN
                    include: [{
                        model: User,
                        as: 'user',
                        attributes: ['id', 'username', 'avatar']
                    }]
                }
            ],
            order: [
                ['createdAt', 'DESC'],
                [{ model: Comment, as: 'replies' }, 'createdAt', 'ASC']
            ]
        });

        res.json({ comments });
    } catch (error) {
        console.error('获取评论列表错误:', error);
        res.status(500).json({ message: '获取评论失败' });
    }
});

// 删除评论（软删除）
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body; // 假设从认证中获取

    try {
        const comment = await Comment.findOne({
            where: { id }
        });

        if (!comment) {
            return res.status(404).json({ message: '评论不存在' });
        }

        // 检查是否是评论作者
        if (comment.userId !== userId) {
            return res.status(403).json({ message: '没有权限删除此评论' });
        }

        // 软删除评论
        await Comment.update(
            { status: 'deleted' },
            { where: { id } }
        );

        res.json({ message: '评论已删除' });
    } catch (error) {
        console.error('删除评论错误:', error);
        res.status(500).json({ message: '删除评论失败' });
    }
});

// 点赞评论
router.post('/:id/like', async (req, res) => {
    const { id } = req.params;

    try {
        const comment = await Comment.findOne({
            where: { id }
        });

        if (!comment) {
            return res.status(404).json({ message: '评论不存在' });
        }

        // 增加点赞数
        await comment.increment('likes');

        res.json({ 
            message: '点赞成功',
            likes: comment.likes + 1
        });
    } catch (error) {
        console.error('点赞错误:', error);
        res.status(500).json({ message: '点赞失败' });
    }
});

module.exports = router; 