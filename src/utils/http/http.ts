import axios,{AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {message} from 'antd';  //只有組件才可以用組件與鉤子函數，所以要額外使用antd提供給靜態網頁(非react組件)使用的
import {store} from '../../store'

const http:AxiosInstance=axios.create({
    baseURL:'https://www.demo.com',
    timeout:5000,
})

//請求攔截器，請求發送前
http.interceptors.request.use((config:InternalAxiosRequestConfig)=>{
    //console.log(config.data)
    const {token}=store.getState().authSlice //本來組件中使用useSelector就可以取出數據，但攔截器不是組件
    if(token){
        //Authorization專門用來攜帶認證信息
        //Bearer表示的是一種認證類型，表示後面攜帶的是一個令牌
        config.headers['Authorization']=`Bearer ${token}`
    }
    return config //配置項最終一定要返回
})


//響應攔截器，接收回應前
http.interceptors.response.use((response:AxiosResponse)=>{
    const res = response.data
    if(res.code!=200){
        message.error(res.code+':'+res.message)
        return Promise.reject(new Error(res.message))
        //請求失敗的話拋出一個rejcet
    }
    return response.data  //將返回結果做個預處理
})

export default http