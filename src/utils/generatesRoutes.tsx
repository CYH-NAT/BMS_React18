//只要寫到組件的話就以tsx結尾
import { RouteObject } from "react-router-dom"
import { componentMap } from "../router/routerMap"

interface MenuType{
    icon:string,
    key:string,
    label:string,
    children?:MenuType[]
}
export function generateRoutes(menu:MenuType[]){  //產生一個路由對象的數組
    return menu.map((item:MenuType)=>{
        const hasChildren=item.children
        let routerObj:RouteObject={
            path:item.key,
            element:hasChildren?null:<>{componentMap[item.key]}</>, //有子集的不渲染，沒有子集的渲染
        };
        if(item.children){
            routerObj.children=generateRoutes(item.children)  //有子集的話要遞歸
        }
        return routerObj //map裡的箭頭函數的return
    })
}