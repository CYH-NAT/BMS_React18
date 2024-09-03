import { createSlice } from "@reduxjs/toolkit";

export const contractSlice=createSlice({
    name:'contract',
    initialState:{
        data:[],
        total:0,
        back:false,
        formList:{
            contractNo: '',
            person: '',
            tel: ''
        },
        current:1,
        size:10
    },
    reducers:{
        setData:(state,action)=>{
            state.data=action.payload
        },
        setTotal:(state,action)=>{
            state.total=action.payload
        },
        setBack:(state,action)=>{
            state.back=action.payload
        },
        setformList:(state,action)=>{
            state.formList=action.payload
        },
        setCurrent:(state,action)=>{
            state.current=action.payload
        },
        setSize:(state,action)=>{
            state.size=action.payload
        },
    }
    })

export const {setData,setTotal,setBack,setformList,setCurrent,setSize} = contractSlice.actions
export default contractSlice.reducer

