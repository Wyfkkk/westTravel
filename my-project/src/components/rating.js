/*
 * @Author: Wyfkkk 2224081986@qq.com
 * @Date: 2025-03-02 20:54:25
 * @LastEditors: Wyfkkk 2224081986@qq.com
 * @LastEditTime: 2025-03-02 22:15:33
 * @FilePath: \my-project\src\components\rating.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState } from "react";
import { Rate, message } from "antd";
import api from "@/api/attraction/index";
export default function Rating() {
  const [ratingValue, setRatingValue] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const id = JSON.parse(localStorage.getItem("cardDetail")).id

  const handleRatingChange = async (value) => {
    
    setRatingValue(value);

    try {
      // 将评分值提交到后端
      console.log("id value", id, value)
      const response = await api.setRating({ id, ratingValue: value });
      console.log("response", response);
      messageApi.success("评分提交成功！");
    } catch (error) {
      console.log(error, 'err')
      messageApi.error("评分提交失败");
    }
  };
  return (
    <div>
      {contextHolder}
      <Rate onChange={handleRatingChange} value={ratingValue}></Rate>
    </div>
  );
}
