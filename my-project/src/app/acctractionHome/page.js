/*
 * @Author: Wyfkkk 2224081986@qq.com
 * @Date: 2025-01-16 22:08:52
 * @LastEditors: Wyfkkk 2224081986@qq.com
 * @LastEditTime: 2025-03-02 21:58:02
 * @FilePath: \my-project\src\app\acctractionHome\page.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
"use client";
import CardPage from "@/components/CardPage.js";
import { Typography, Select, DatePicker, Input } from "antd";
import api from "../../api/attraction/index";
const { RangePicker } = DatePicker;
const { Search } = Input;
const { Title } = Typography;
import "./acctraction.css";
import { useEffect, useState } from "react";
export default function AcctractionHome() {

  const [attractionList, setAttractionList] = useState([])
  const getData = async () => {
    
    const data = await api.getAttractionList()
    console.log('执行了',data)
    setAttractionList(data.data)
  }
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onChange = (time, timeString) => {
    console.log(time, timeString);
  };
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  useEffect(() => {
    getData()
  }, [])
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
                value: "生态型旅游",
                label: "生态型旅游",
              },
              {
                value: "观光型旅游",
                label: "观光型旅游",
              },
              {
                value: "度假型旅游",
                label: "度假型旅游",
              },
              
            ]}
          />
          <RangePicker style={{ height: 32, marginLeft: 20 }}/>
          <Search
            placeholder="请输入搜索内容"
            onSearch={onSearch}
            style={{ width: 250, marginLeft: 20 }}
            enterButton
          />
        </div>
      </div>
      <div className="cardList">
        {attractionList.map((item, index) => (
          <CardPage key={index} data={item}></CardPage>
        ))}
      </div>
    </div>
  );
}
