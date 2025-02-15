"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import "./cardDetail.css";
import { EnvironmentOutlined, PushpinOutlined } from "@ant-design/icons";
import { Typography, Tag } from "antd";
const { Title } = Typography;
export default function CardDetail() {
  const searchParams = useSearchParams();
  const [cardDetail, setCardDetail] = useState(null);

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
    // <div className="card-detail-container">
    //     <div className="card-detail-header">
    //         <h1>{cardDetail.title}</h1>
    //         <div className="card-meta">
    //             <span>{cardDetail.time}</span>
    //             <span>{cardDetail.tag}</span>
    //         </div>
    //     </div>

    //     <div className="card-detail-image">
    //         <img src={cardDetail.img} alt={cardDetail.title} />
    //     </div>

    //     <div className="card-detail-content">
    //         <p className="description">{cardDetail.position}</p>
    //         <div className="content">收藏数：{cardDetail.collect}</div>
    //     </div>
    // </div>
    <div className="container">
      <div className="context">
        <div>
        
          <Title level={2}>{cardDetail.title}</Title>
        </div>
        <img style={{width: 300, height: 200}} src={cardDetail.img}></img>
        <div><EnvironmentOutlined></EnvironmentOutlined>{cardDetail.position}</div>
        <div>发布时间: {cardDetail.time} </div>
        <div>收藏({cardDetail.collect}) 浏览({cardDetail.view})</div>
        <div>{cardDetail.provider} <Tag color="blue">{cardDetail.tag}</Tag></div>
      </div>
    </div>
  );
}
