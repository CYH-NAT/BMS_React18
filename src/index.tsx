import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import './mock'
import { Provider } from 'react-redux';  //redux數據使用
import {store} from './store'
import { ConfigProvider } from "antd"  //轉換antd的語言
import zhTW from 'antd/locale/zh_TW'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement  //強行斷言為HTMLElement
);
root.render(
  <Provider store={store}>
    <ConfigProvider locale={zhTW}>
      <App />
    </ConfigProvider>
  </Provider>

);


