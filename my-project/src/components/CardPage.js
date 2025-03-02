/*
 * @Author: Wyfkkk 2224081986@qq.com
 * @Date: 2025-01-16 21:46:58
 * @LastEditors: Wyfkkk 2224081986@qq.com
 * @LastEditTime: 2025-03-02 19:22:42
 * @FilePath: \my-project\src\components\CardPage.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
"use client";
import { useState, useEffect, useMemo } from 'react';
import { Card, Tag } from "antd";
const { Meta } = Card;
import { EnvironmentOutlined, PushpinOutlined } from "@ant-design/icons";
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CardPage(props) {
  const baseUrl = 'http://localhost:8000';
  const { data } = props;
  const router = useRouter();

  const timeAgo = (timestamp) => {
    if (!timestamp) return '';

    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (seconds < 60) {
      return `${seconds}秒前`;
    } else if (minutes < 60) {
      return `${minutes}分钟前`;
    } else if (hours < 24) {
      return `${hours}小时前`;
    } else if (days < 30) {
      return `${days}天前`;
    } else if (days < 365) {
      return `${Math.floor(days / 30)}个月前`;
    } else {
      return `${Math.floor(days / 365)}年前`;
    }
  };



  const handleClick = () => {
    localStorage.setItem('cardDetail', JSON.stringify(data));
    router.push(`/cardDetail?id=${data.id}`);
  };

  return (
    <Card
      onClick={handleClick}
      hoverable
      style={{ width: 300 }}
      cover={<img style={{width: 300, height:200}} alt="example" src={`${baseUrl}${data?.image_url}`} />}
    >
      <Meta title={data?.name} />
      <p>
        <EnvironmentOutlined />
        {data?.location}
      </p>
      <p>
        {timeAgo(data.updatedAt) || '加载中...'} 收藏({data?.collect}) 浏览({data?.visitCount})
      </p>
      <p>{data?.provider} <Tag color="blue">{data?.tag}</Tag></p>
    </Card>
  );
  // 字段： title， img， poi， time， 收藏， 浏览，tag
}
