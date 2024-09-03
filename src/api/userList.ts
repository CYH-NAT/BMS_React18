import { post } from "../utils/http/request";

interface searchType{
    page:number;
    pageSize:number;
    companyName?:string;
    contact?:string;
    tel?:string
}

export function getUserList(data:searchType){
    return post('/userList',data)
}

export function deleteUser(id:string){
    return post('/deleteUser',{id})  //解構得到的id
}

//批量刪除
export function batchDeleteUser(ids:React.Key[]){
    return post('/batchDeleteUser',{ids})
}