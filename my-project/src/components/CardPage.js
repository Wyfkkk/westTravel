"use client";
import { Card, Tag } from "antd";
const { Meta } = Card;
import { EnvironmentOutlined, PushpinOutlined } from "@ant-design/icons";
import { useRouter } from 'next/navigation';

export default function CardPage(props) {
  // const data = {
  //   title: "茶卡盐湖",
  //   img: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  //   position: "青海",
  //   time: "2025-02-01T12:00:00Z",
  //   collect: 100,
  //   view: 100,
  //   tag: "旅游",
  // };
  const { data } = props;
  const router = useRouter();
  const timeAgo = (timestamp) => {
    const date = new Date(timestamp);
    const now = Date.now();
    const seconds = Math.floor((now - date) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return `${seconds}秒前`;
    } else if (minutes < 60) {
      return `${minutes}分钟前`;
    } else if (hours < 24) {
      return `${hours}小时前`;
    } else {
      return `${days}天前`;
    }
  };
  const handleClick = () => {
    // 只在 URL 中传递 ID
    localStorage.setItem('cardDetail', JSON.stringify(data));
    router.push(`/cardDetail?id=${data.id}`);
  };
  return (
    <Card
      onClick={handleClick}
      hoverable
      style={{ width: 300 }}
      cover={<img alt="example" src={data.img} />}
    >
      <Meta title={data.title} />
      <p>
        <EnvironmentOutlined />
        {data.position}
      </p>
      <p>
        {timeAgo(data.time)} 收藏({data.collect}) 浏览({data.view})
      </p>

      <p>{data.provider} <Tag color="blue">{data.tag}</Tag></p>
    </Card>
  );
  // 字段： title， img， poi， time， 收藏， 浏览，tag
}
