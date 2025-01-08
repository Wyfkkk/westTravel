This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


项目涵盖旅游景点、酒店推荐，以及类似小红书那样的博客系统
个人订单系统
后台管理系统
用户模块、景点模块、景点路线模块、酒店模块、订单模块、评论模块、景点攻略模块

功能模块：用户模块、景点模块、景点路线模块、酒店模块、订单模块、评论模块、景点攻略模块
数据库表：一共设计了15张表，工作量拉满。
本套《在线旅游系统》，一共设计了三个角色：管理员、用户、供应商。
其中，管理员承担全站信息管理任务；用户为服务或产品使用方(景点、买票、攻略、订房等多种服务使用)，下文做出详解。供应商为服务或产品的提供方。
角色数据流逻辑如下：
1. 用户信息由经用户注册，注册成功后可凭借个人身份信息登录《在线旅游系统》，并可对个人信息进行管理、使用系统服务或产品。
2. 供应商身份由用户注册申请，经由管理员审核后，可发布及管理景点或酒店相关配套服务。这类服务一经发布，由管理员审核通过后才可对外展出。
3. 用户身份或供应商身份状态，受管理员管理。用户或供应商状态异常(封号、禁言、停用)，功能受限，暂停相对应的操作能力。
《在线旅游系统》，一共设计了15张数据库表。数据库表清单如下:
1. 景点信息表
2. 景点路线表
3. 景点评分表
4. 服务商/供应商表
5. 评论表
6. 景点攻略表
7. 用户信息表
8. 景点酒店表
9. 酒店房间信息表
10. 酒店床位信息表
11. 酒店预约订单表
12. 景点门票信息表
13. 景点订票信息表
14. 景点分类表
15. 公告表