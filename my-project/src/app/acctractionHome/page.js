/*
 * @Author: Wyfkkk 2224081986@qq.com
 * @Date: 2025-01-16 22:08:52
 * @LastEditors: Wyfkkk 2224081986@qq.com
 * @LastEditTime: 2025-01-21 16:28:59
 * @FilePath: \my-project\src\app\acctractionHome\page.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
"use client";
import CardPage from "@/components/CardPage.js";
import { Typography, Select, DatePicker, Input } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { AudioOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;
const { Search } = Input;
const { Title } = Typography;
import "./acctraction.css";
export default function AcctractionHome() {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onChange = (time, timeString) => {
    console.log(time, timeString);
  };
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  return (
    <div className="homePage">
      <div className="searchBox">
        
          <Title level={2}>景点信息</Title>
          <div style={{display: 'flex', marginTop: '-45px'}}>
          <Select
            defaultValue="所属类别"
            style={{
              width: 120,
              marginLeft: 650,
            }}
            onChange={handleChange}
            options={[
              {
                value: "jack",
                label: "Jack",
              },
              
            ]}
          />
          <RangePicker style={{ height: 32, marginLeft: 20 }} />
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{ width: 250, marginLeft: 20 }}
            enterButton
          />
        </div>
      </div>
      <div className="cardList">
        <CardPage></CardPage>
      </div>
    </div>
  );
}
