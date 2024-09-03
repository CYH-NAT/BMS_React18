import { createSlice } from "@reduxjs/toolkit";

export const authSlice=createSlice({
    name:'auth',
    initialState:{
        token:sessionStorage.getItem('token')||null,  //頁面初次戴入或是刷新時取token
        menuList:[]
    },
    reducers:{
        setToken:(state,action)=>{
            state.token=action.payload;//把token存到redux
            sessionStorage.setItem('token',action.payload)//把token存到本地
        },
        clearToken:state=>{
            state.token=null;
            sessionStorage.removeItem('token')
        },
        setMenu:(state,action)=>{
            state.menuList=action.payload
        }
    }
})

export const{setToken,clearToken,setMenu}=authSlice.actions;
export default authSlice.reducer