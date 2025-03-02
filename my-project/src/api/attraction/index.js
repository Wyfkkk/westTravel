/*
 * @Author: Wyfkkk 2224081986@qq.com
 * @Date: 2025-03-01 17:08:38
 * @LastEditors: Wyfkkk 2224081986@qq.com
 * @LastEditTime: 2025-03-02 22:11:31
 * @FilePath: \my-project\src\api\attraction\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios';
import axiosInstance from '../index.js';

const getAttractionList = async () => {
    try {
        const res = await axiosInstance.get('/getAcctractionList');
        return res.data;
      }catch (err){
        console.error('获取失败', err)
        throw err
      }
}

const setRating = async ({ id, ratingValue }) => {
  console.log(ratingValue,'ratingValue')
  try {
    const res = await axiosInstance.post(`/${id}/rate`, {score: ratingValue});
    return res.data;
  }catch (err){
    console.error('评分失败', err)
    throw err
  }
}
export default  { getAttractionList, setRating } 