/*
 * @Author: Wyfkkk 2224081986@qq.com
 * @Date: 2025-01-02 23:14:30
 * @LastEditors: Wyfkkk 2224081986@qq.com
 * @LastEditTime: 2025-01-03 00:14:49
 * @FilePath: \my-project\src\store\reducers\userReducer.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// store/reducers/exampleReducer.js
import { createSlice } from '@reduxjs/toolkit';

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: { value: '' },
  reducers: {
    setUserInfoValue: (state, action) => {
      state.value = action.payload; // 更新状态
    },
  },
});

export const { setUserInfoValue } = userInfoSlice.actions;
export default userInfoSlice.reducer;