/*
 * @Author: Wyfkkk 2224081986@qq.com
 * @Date: 2025-03-02 21:09:22
 * @LastEditors: Wyfkkk 2224081986@qq.com
 * @LastEditTime: 2025-03-02 22:09:17
 * @FilePath: \backend\routes\rating.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');
const router = express.Router();
const { Attraction, User } = require('../model/index');

// 给景点评分
router.post('/:id/rate', async (req, res) => {
    try {
        const { id } = req.params;
        const { score } = req.body;
        console.log('进来了',id ,score)
        // 验证评分范围
        if (score < 1 || score > 5) {
            return res.status(400).json({
                code: 400,
                message: '评分必须在1-5之间'
            });
        }

        // 查找景点
        const attraction = await Attraction.findByPk(id);
        if (!attraction) {
            return res.status(404).json({
                code: 404,
                message: '景点不存在'
            });
        }

        // 更新评分
        const newTotalRating = attraction.totalRating + score;
        const newRatingCount = attraction.ratingCount + 1;
        const newRating = parseFloat((newTotalRating / newRatingCount).toFixed(1));
        console.log(newRating, 'newR')
        console.log(newRatingCount, 'newR')
        console.log(newTotalRating, 'newR')
        // 更新景点信息
        await attraction.update({
            rating: newRating,
            ratingCount: newRatingCount,
            totalRating: newTotalRating
        });

        // 返回更新后的评分信息
        res.json({
            code: 200,
            message: '评分成功',
            data: {
                attractionId: id,
                newRating: newRating,
                ratingCount: newRatingCount
            }
        });

    } catch (error) {
        console.error('评分错误:', error);
        res.status(500).json({
            code: 500,
            message: '评分失败',
            error: error.message
        });
    }
});

// 获取景点评分信息
router.get('/attractions/:id/rating', async (req, res) => {
    try {
        const { id } = req.params;

        const attraction = await Attraction.findByPk(id, {
            attributes: ['id', 'name', 'rating', 'ratingCount']
        });

        if (!attraction) {
            return res.status(404).json({
                code: 404,
                message: '景点不存在'
            });
        }

        res.json({
            code: 200,
            message: '获取评分信息成功',
            data: attraction
        });

    } catch (error) {
        console.error('获取评分信息错误:', error);
        res.status(500).json({
            code: 500,
            message: '获取评分信息失败',
            error: error.message
        });
    }
});

module.exports = router; 