//每個頁面最好有自己的文件夾
import logo from '../../assets/logo.png' //將圖片作為組件引入
import bg from '../../assets/bg.jpg'
import lgbg from '../../assets/lgbg.jpg'
//圖片不能夠直接寫相對路徑，將來會因為webpack打包而跑掉
//webpack只會處理js資源，不會處理圖片，所以要讓圖片模塊化。
//否則要引用圖片在伺服器的絕對路徑。

import './index.scss'
//輸入npm i sass來安裝sass

// 接口名[屬性名]→取出接口中某屬性的特定類型，TS語法
import { Button, Form, Input } from 'antd';
import { UserOutlined,LockOutlined } from '@ant-design/icons';

// npm install mockjs --save-dev 存成開發依賴

import {login} from '../../api/users'

import { setToken } from '../../store/login/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login() {
    const [form] = Form.useForm() //得到表單的實例，hooks要寫在最上方
    const [loading,setLoading]=useState<boolean>(false) //要輸入數據的部分給他定義類型
    const dispatch=useDispatch()
    const navigate=useNavigate()

    function handleLogin(){
        form.validateFields().then(async (res)=>{
            setLoading(true)//讓登入按鈕轉圈
            const {data:{token,username}} = await login(res) //得到回應後，解構出data底下的token和username
            console.log(token)
            setLoading(false)//讓登入按鈕停止轉圈
            dispatch(setToken(token))//把token作為action.payload傳入
            sessionStorage.setItem('username',username)
            navigate('/') //跳轉到首頁
        }).catch((err)=>{
            console.log('shit')
            setLoading(false)//讓登入按鈕停止轉圈
            //登入失敗時的彈窗寫在了響應攔截器裡面
        })
        
    }

    return <div className="login" style={{ background: `url(${bg})` }}>
        <div className='lgbg' style={{ background: `url(${lgbg})` }}>
            <div className='part'>
                <div className='title'>
                    <div className='logo'>
                        <img src={logo} width={100} />
                    </div>
                    <h1>朋遠智慧園區管理平台</h1>
                    <Form form={form}>
                        {/* 得到表單的實例 */}
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '帳號不能為空',
                                },
                                {
                                    pattern:/^\w{4,8}$/,message:'帳號必須為4-8位數字字母組合'
                                }
                        ]}
                        >
                            <Input placeholder='請輸入帳號' prefix={<UserOutlined></UserOutlined>}/>
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '密碼不能為空',
                                },
                            ]}
                        >
                            <Input.Password placeholder='請輸入密碼' prefix={<LockOutlined></LockOutlined>}/>
                        </Form.Item>


                        <Form.Item>
                            <Button type="primary" style={{width:"100%"}} onClick={handleLogin} loading={loading}>
                                登入
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    </div >
}

export default Login