import { RouterProvider } from "react-router-dom";
import {routes} from "./router"; //初始路由表
import { useState,useEffect,Suspense } from "react";
import { generateRoutes } from "./utils/generatesRoutes";
import { useDispatch } from "react-redux";
import { createBrowserRouter } from "react-router-dom";
//讀取菜單使用
import { getMenu } from "./api/users";
import { setMenu } from "./store/login/authSlice";
import { useSelector } from "react-redux";
import { Spin } from "antd";

function App() {
  const {token}=useSelector((state:any)=> state.authSlice)
  const [routerss,setRouter]=useState<any>(null);
  const dispatch = useDispatch()

  useEffect(()=>{

    async function loadData(){
      const {data} = await getMenu();  //根據token得到菜單

      if(data.length){
        dispatch(setMenu(data)) //把得到的菜單存進reduex，以利後續路由產生

        const routers=generateRoutes(data)  //利用後端數據即時產生一個新的路由，動態路由表
        const myRoutes=[...routes] //複製一份，因為不能直接改
        
        myRoutes[0].children=routers;  //讓回傳的路由表成為根(home)路由的子組件
  
        myRoutes[0].children[0].index=true; //讓第一個子標籤為預設選中
  
        const router=createBrowserRouter(myRoutes)
        //console.log(router)
        setRouter(router)
      }else{
        const router=createBrowserRouter(routes)// 如果無返回的菜單，至少該有最基本的路由
        setRouter(router)
      }
    }

    loadData() //調用定義好的



  },[token]) //根據token的變化作更新



  //在app組件中載入路由組件

  if(routerss){
    return (
      <div className="App">
        <Suspense fallback={<Spin></Spin>}>
        {/* 如果使用了懶加載的話，就要加上Suspense */}
          <RouterProvider router={routerss}></RouterProvider>
        </Suspense>
        
      </div>
    );
  }else{
    return <Spin></Spin>
  }
}

export default App;
