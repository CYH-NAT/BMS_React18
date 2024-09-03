import {post,get} from '../utils/http/request'
import type { DataType } from '../page/users/interface'

interface LoginData{
    username:string,
    password:string
}

interface AccountData{
    accountName:string
}

export function login(data:LoginData){
    return post('/login',data)
}

export function getMenu(){
    return get('/menu')
}

export function editUser(data:DataType){
    return post('/editUser',data)
}

export function getAccountList(data:AccountData){
    return post('/accountList',data)
}