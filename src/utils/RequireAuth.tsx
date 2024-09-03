import { useSelector} from "react-redux";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Iprops{  //接口本來就是給對象限定類型用的
    allowed:boolean,
    redirectTo:string,
    children:React.ReactNode  //children指的是組件標籤內的內容
}

//創造一個組件來做導航守衛
function RequireAuth({allowed,redirectTo,children}:Iprops){ 
    //allowed為是否需要登入
    const {token} = useSelector((state:any)=>state.authSlice)
    const isLogin=token?true:false; //用token判斷是否登入
    const navigate=useNavigate()
    useEffect(()=>{
        if(allowed!==isLogin){
            navigate(redirectTo,{replace:true})
        }
    },[allowed,isLogin,redirectTo])//因為加上了isLogin的監測，所以當token刷新的時候就會檢查是否已登入，按登出的時候會立刻跳回登入頁

    return allowed===isLogin?<>{children}</>:<></>
}

export default RequireAuth