const User = require('./model/User');
const createUser = async () => {
    try {
        const user = await User.create({
            id: 6, // 自动递增，通常不需要手动设置
            username: '债权人',
            password: '123456',
            email: '2224081986@qq.com',
            avatar: 'https://ts4.cn.mm.bing.net/th?id=OIP-C.IykEwu6UUNOvq9LFU0d3kwAAAA&w=226&h=226&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2',
            isAdmin: true,
        });

        console.log('用户创建成功:', user);
    } catch (error) {
        console.error('创建用户失败:', error);
    }
};

createUser();