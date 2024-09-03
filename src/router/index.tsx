import { createBrowserRouter } from "react-router-dom";
import React from "react";
import RequireAuth from "../utils/RequireAuth";
import { RouteObject } from "react-router-dom"

const Home=React.lazy(()=>import('../page/home'))
const Login=React.lazy(()=>import('../page/login'))
const Notfound=React.lazy(()=>import('../page/404'))

// const router=createBrowserRouter([
//     {
//         path:'/',
//         element:<RequireAuth allowed={true} redirectTo="/login"> <Home/> </RequireAuth>
//         //Home組件需要登入，如果沒登入的話會被跳轉到login
//     },
//     {
//         path:'/login',
//         element:<RequireAuth allowed={false} redirectTo="/"> <Login/> </RequireAuth>
//         //Login組件不需要登入，如果已登入的話會被跳轉到Home
//     },
//     {
//         path:'*',
//         element:<Notfound/>
//     }
// ])

//export default router

export const routes:RouteObject[]= [
    {
        path:'/',
        element:<RequireAuth allowed={true} redirectTo="/login"> <Home/> </RequireAuth>
        //Home組件需要登入，如果沒登入的話會被跳轉到login
    },
    {
        path:'/login',
        element:<RequireAuth allowed={false} redirectTo="/dashboard"> <Login/> </RequireAuth>
        //Login組件不需要登入，如果已登入的話會被跳轉到工作台
    },
    {
        path:'*',
        element:<Notfound/>
    }
]