import http from "./http"
interface ApiResponse{
    code:number,
    message:string,
    data:any
}
export function get(url:string,params?:any):Promise<ApiResponse> {  //讓param可選。promise<>是要讓回傳的Promise的返回值有限制
    return http.get(url,{params:params}) //可用es6省略，但留著。get方法要把params以對象傳入。可見react18-12-07:06
}

export function post(url:string,data?:any):Promise<ApiResponse> {  //讓param可選。promise<>是要讓回傳的Promise的返回值有限制
    return http.post(url,data) //axios的post方法直接傳data就好，不必寫成對象
}