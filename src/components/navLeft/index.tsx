import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import icons from './iconList';
import logo from '../../assets/logo.png'
import './index.scss'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

//type MenuItem = Required<MenuProps>['items'][number];
//Require代表必傳。取出menuProps裡的items屬性的類型，[number]表示數組中的元素該有的類型

interface MenuItem{  //處理完之後的類型
    key:string,
    label:string,
    icon?:React.ReactNode,
    children?:MenuItem[] //menuItem構成的數組
}

interface MenuItemFromData{  //從後端返回的類型
    key:string,
    label:string,
    icon:string,  //後端返回的icon一定是字符串
    children?:MenuItemFromData[] //menuItem構成的數組
}


function Navleft() {
    //沒特別要求的話定義在組件外比較好，但如果是hooks或組件用的方法的話要寫在裡面
    const {menuList} = useSelector((state:any)=>state.authSlice)   //在navLeft那邊加載進redux的數據
    const [menuData,setMenuData]=useState<MenuItem[]>([])
    const navigate=useNavigate()
    const location = useLocation()


    useEffect(()=>{
        configMenu()
        //不應該在useEffect的箭頭函數作成async異步函數，因為useEffect後面return是組件銷毀時的操作
        //如果加上了async的話，返回值會變成一個Promise
    },[menuList])

    //將後端的menu傳進來
    async function configMenu() {
        const mappedMenuItems:MenuItem[] = mapMenuItems(menuList);
        console.log('打印轉換後的Menu',mappedMenuItems)
        setMenuData(mappedMenuItems)
    }

    //將返回的數據轉換成我們需要的格式
    function mapMenuItems(items:MenuItemFromData[]):any{
        return items.map((item:MenuItemFromData)=>({
            key:item.key,
            label:item.label,
            icon:icons[item.icon], //icons是一個對象，不是ReactNode類型
            children:item.children?mapMenuItems(item.children):null  //遞迴
        }))
    }

    function handleClick({key}:{key:string}){ //:後面是對解構賦值取對象ts
        navigate(key)//得到點擊的key並且跳轉
    }

    return <div className='navleft'>
        <div className='logo'>
            <img src={logo} alt="" width={18}/>
            <h1>朋遠智慧園區</h1>
        </div>
        <Menu
            defaultSelectedKeys={['/dashboard']} //預設選中高亮的標籤
            mode="inline"
            theme="dark"
            items={menuData}
            onClick={handleClick}  //給每個按鈕加上跳轉事件
            selectedKeys={[location.pathname]} //被選中需高亮的標籤
        />
    </div>
}

export default Navleft