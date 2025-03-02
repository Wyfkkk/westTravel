const Attraction = require('../model/Attraction');

async function seedAttractions() {
    try {
        // 检查是否已有数据
        const count = await Attraction.count();
        if (count > 0) {
            console.log('景点数据已存在，跳过添加');
            return;
        }

        // 添加示例景点数据
        const attractions = await Attraction.bulkCreate([
            {
                id: 1,
                name: '西湖',
                description: '西湖是位于浙江省杭州市西面的淡水湖。它是中国大陆首批国家重点风景名胜区和中国十大风景名胜之一。三面环山，一面临城，湖中白堤、苏堤、杨公堤、赵公堤等堤桥纵横交错。',
                location: '浙江省杭州市西湖区',
                image_url: '/uploads/1.jpg',
                entry_fee: 0.00,
                opening_hours: '全天开放',
                rating: 5.0,
                visitCount: 1000000,
                collect: 4,
                provider: '服务商',
                tag: '旅游'
            },
            {
                id: 2,
                name: '故宫',
                description: '故宫又名紫禁城，是中国明清两代的皇家宫殿，位于北京中轴线的中心。是世界上现存规模最大、保存最为完整的木质结构古建筑群，被誉为"世界五大宫之首"。',
                location: '北京市东城区景山前街4号',
                image_url: '/uploads/2.jpg',
                entry_fee: 60.00,
                opening_hours: '8:30-17:00\n8:30-16:30',
                rating: 5.0,
                visitCount: 20000,
                collect: 8,
                provider: '运营商',
                tag: '旅游'
            },
            {
                id: 3,
                name: '黄山',
                description: '黄山位于安徽省南部黄山市境内，是国家级风景名胜区，以奇松、怪石、云海、温泉"四绝"著称。主要景点有光明顶、始信峰、莲花峰等，还有著名的迎客松和云海景观。',
                location: '安徽省黄山市黄山区',
                image_url: '/uploads/3.jpg',
                entry_fee: 230.00,
                opening_hours: '6:30-16:30',
                rating: 4.9,
                visitCount: 500000,
                collect: 14,
                provider: '服务商',
                tag: '旅游'
            },
            {
                id: 4,
                name: '八达岭长城',
                description: '八达岭长城是明长城中保存最好的一段，也是最具代表性的一段。它是明长城的精华部分，城墙高大坚固，城楼巍峨壮观，登上长城极目远眺，万里长城雄姿尽收眼底。',
                location: '北京市延庆区八达岭长城景区',
                image_url: '/uploads/4.jpg',
                entry_fee: 40.00,
                opening_hours: '7:30-17:30（旺季）\n7:30-17:00（淡季）',
                rating: 4.8,
                visitCount: 900000,
                collect: 34,
                provider: '服务商',
                tag: '旅游'
            },
            // {
            //     name: '桂林山水',
            //     description: '桂林山水以桂林市漓江风景区为代表，包括漓江、阳朔、龙胜等景区。这里奇峰耸立，江水如镜，洞穴神奇，享有"桂林山水甲天下"的美誉。',
            //     location: '广西壮族自治区桂林市',
            //     image: '/uploads/attractions/guilin.jpg',
            //     price: 0.00,
            //     openTime: '全天开放（具体景点开放时间不同）',
            //     rating: 4.9,
            //     visitCount: 700000
            // }
        ]);

        console.log('景点数据添加成功！');
        console.log('已添加景点数量:', attractions.length);
        
    } catch (error) {
        console.error('添加景点数据失败:', error);
        throw error; // 向上传递错误
    }
}

module.exports = seedAttractions