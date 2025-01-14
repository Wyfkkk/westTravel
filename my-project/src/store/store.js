/*
 * @Author: Wyfkkk 2224081986@qq.com
 * @Date: 2025-01-02 23:14:16
 * @LastEditors: Wyfkkk 2224081986@qq.com
 * @LastEditTime: 2025-01-12 23:26:54
 * @FilePath: \my-project\src\store\store.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use client'
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // 默认使用 localStorage
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, userReducer);
const store = configureStore({
  reducer: {
    userInfo: persistedReducer,
  },
});
const persistor = persistStore(store);
// export function ReduxProvider({ children }) {
//   return <Provider store={store}>{children}</Provider>;
// }
export function ReduxProvider({ children }) {
  return <Provider store={store}> <PersistGate loading={null} persistor={persistor}>
  {children}
</PersistGate></Provider>;
}
export default store;