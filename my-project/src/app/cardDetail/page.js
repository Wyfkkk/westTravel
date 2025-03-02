"use client";

import { useEffect, useState } from "react";
import "./cardDetail.css";

import { EnvironmentOutlined, PushpinOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import { Typography, Tag, Button, Menu, Tabs  } from "antd";
import CommentSection from '@/components/CommentSection';
import Rating from "@/components/rating";
const { Title } = Typography;
export default function CardDetail() {
  const [isCollect, setIsCollect] = useState(false);
  const [cardDetail, setCardDetail] = useState(null);
  const baseUrl = 'http://localhost:8000';
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
      children: <Rating/>,
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
    <div className="card-detail-container">
      <div className="context">
        <div className="basic-info">
          <Title level={2}>{cardDetail.name}</Title>
          <div className="image-container" style={{ position: 'relative', width: '300px', height: '200px' }}>
            <img 
              src={`${baseUrl}${cardDetail.image_url}`} 
              alt={cardDetail.name}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 300px"
            />
          </div>
          <div className="location">
            <EnvironmentOutlined />
            {cardDetail.location}
          </div>
          <div className="meta-info">
            <span>发布时间: {cardDetail.createdAt}</span>
            <span>收藏({cardDetail.collect}) 浏览({cardDetail.visitCount})</span>
          </div>
          <div className="tags">
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
      </div>
      
      <div className="tabs-section">
        <Tabs 
          defaultActiveKey="detail"
          items={items} 
          onChange={onChange}
        />
      </div>
    </div>
  );
}
