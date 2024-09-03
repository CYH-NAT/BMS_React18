import { useLocation } from "react-router-dom"
import { UseSelector, useSelector } from "react-redux"
import { Breadcrumb } from "antd"

interface MenuItems{
    key:string,
    label:string,
    children?:MenuItems[]
}



function findBreadCrumbPath(path:string,menuItems:MenuItems[]):string[]{
    const pathSegment:string[]=[];
    function findPath(currentPath:string,items:MenuItems[]){
        for(let item of items){
            //檢查路由表和當前目錄的對應關係
            if(currentPath.startsWith(item.key)){
                pathSegment.push(item.label)
                if(item.children){
                    findPath(currentPath,item.children)
                }
                break;
            }
        }
        return pathSegment
    }
    return findPath(path,menuItems)
}

function MyBreadCrumb(){
    const location=useLocation()
    const {menuList} = useSelector((state:any)=>state.authSlice)
    const breadList = findBreadCrumbPath(location.pathname,menuList).map(title=>({title}))//回傳一個數組，裡面有好幾個title對象
    return <Breadcrumb items={breadList} className="mt mb"/>
}

export default MyBreadCrumb