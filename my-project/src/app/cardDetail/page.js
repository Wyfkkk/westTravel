"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import "./cardDetail.css";
import { EnvironmentOutlined, PushpinOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import { Typography, Tag, Button, Menu, Tabs  } from "antd";
import CommentSection from '@/components/CommentSection';
const { Title } = Typography;
export default function CardDetail() {
  const [isCollect, setIsCollect] = useState(false);
  const [cardDetail, setCardDetail] = useState(null);
   // 切换menu
   const items = [
    {
      label: '景点详情',
      key: 'detail',
      children: '景点详情',
    },
    {
      label: '评论',
      key: 'comment',
      children: <CommentSection />,
    },
    {
      label: '景点评分',
      key: 'rating',
      children: (
        <div className="rating-content">
          <h3>景点评分</h3>
          {/* 这里可以添加评分组件 */}
        </div>
      ),
    },
    {
      key: 'ticket',
      label: '门票列表',
      children: (
        <div className="ticket-content">
          <h3>门票信息</h3>
          {/* 这里可以添加门票列表 */}
        </div>
      ),
    },
  ];
   const [current, setCurrent] = useState('detail');
   const onChange = (e) => {
     
     setCurrent(e.key);
   };
  // 收藏、取消收藏逻辑
  const chooseCollect = async () => {
    // 请求
    setIsCollect(!isCollect)
  }
  const abortCollect = async () => {
    setIsCollect(!isCollect)
  }

  useEffect(() => {
    const data = localStorage.getItem("cardDetail");
    if (data) {
      setCardDetail(JSON.parse(data));
    }
  }, []);

  if (!cardDetail) {
    return <div>加载中...</div>;
  }
 
  return (
    <div className="container">
      <div className="context">
        <div>
          <Title level={2}>{cardDetail.title}</Title>
        </div>
        <img style={{ width: 300, height: 200 }} src={cardDetail.img}></img>
        <div>
          <EnvironmentOutlined></EnvironmentOutlined>
          {cardDetail.position}
        </div>
        <div>发布时间: {cardDetail.time} </div>
        <div>
          收藏({cardDetail.collect}) 浏览({cardDetail.view})
        </div>
        <div>
          {cardDetail.provider} <Tag color="blue">{cardDetail.tag}</Tag>
        </div>
        <Button 
          icon={isCollect ? <StarFilled /> : <StarOutlined />}
          onClick={chooseCollect}
          style={{ color: isCollect ? '#faad14' : undefined }}
        >
          {isCollect ? '取消收藏' : '收藏'}
        </Button>
      </div>
      <div className="menu">
        <Tabs  
          defaultActiveKey="detail"
          items={items} 
          onChange={onChange} 
        />
      </div>
    </div>
  );
}
