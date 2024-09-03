//每個頁面最好有自己的文件夾
//所有的導入導出都要放在最上方

import { theme, Layout } from 'antd';
import { useState } from 'react';
import Navleft from '../../components/navLeft';
import MyBreadCrumb from '../../components/breadCrumb';
import MyHeader from '../../components/header';
import { Outlet } from 'react-router-dom'; //子路由顯示

const { Header, Content, Footer, Sider } = Layout;


function Home() {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

    return <div className="home">
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <Navleft />
            </Sider>
            <Layout>
                <Header style={{ paddingRight:'20px', background: colorBgContainer ,textAlign:'right'}}>
                    <MyHeader/>
                </Header>
                <Content style={{ margin: '0 16px',height:'90vh',overflowY:'auto'}/*內容欄高度預設為90vh，超過時用滾動*/}>
                    <MyBreadCrumb/>
                    <Outlet/>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    </div>
}

export default Home