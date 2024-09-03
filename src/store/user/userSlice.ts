import { createSlice } from "@reduxjs/toolkit";

export const userSlice=createSlice({
    name:'user',
    initialState:{
        userData:{}
    },
    reducers:{
        setUserData:(state,aciton)=>{
            state.userData=aciton.payload
        }
    }
})

export const {setUserData}=userSlice.actions;

export default userSlice.reducer