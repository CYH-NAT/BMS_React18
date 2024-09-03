import React from 'react';
import { UserOutlined,PoweroffOutlined,DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { clearToken } from '../../store/login/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="_blank">
          個人中心
        </a>
      ),
      icon: <UserOutlined/>,
    },
    {
      key: '2',
      label: (
        <a target="_blank">
          退出登入
        </a>
      ),
      icon: <PoweroffOutlined/>,
    }
  ];

function MyHeader() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const onClick:MenuProps['onClick']=({key})=>{
        if(key=='1'){
            //跳到個人中心
            navigate('/personal')
        }else{
            dispatch(clearToken())
            sessionStorage.removeItem('username')
        }
    }
    return <div>
        <Dropdown menu={{ items,onClick }}>
            {/* 上面的{items,onClick}是es6的縮寫 */}
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    歡迎您，{sessionStorage.getItem('username')}
                    <DownOutlined />
                </Space>
            </a>
        </Dropdown>
    </div>
}

export default MyHeader