import { Card, Row, Col, Table, Input, Button, Pagination, Popconfirm, Tree } from 'antd'
import type { TableProps, TreeDataNode,TreeProps } from 'antd'
import { getAccountList } from '../../api/users'
import useDataList from '../../hooks/useDataList'
import {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'

interface MenuType{
    label:string,
    icon:string,
    key:string,
    children?:MenuType[]
}

interface DataType {
    id: number,  //後端有返回，但沒有渲染出來在列表上
    accountName: string,
    auth: string,
    person: string,
    tel: string,
    department: string,
    menu:MenuType[] //後端有返回，但沒有渲染出來在列表上
}

interface SearchType {
    accountName: string
}

const treeData: TreeDataNode[] = [
    {
        "title": "工作台",
        "key": "/dashboard",
    },
    {

        "title": "租戶管理",
        "key": "/users",
        "children": [
            {
                "title": "租戶列表",
                "key": "/users/list",
            },
            // {
            //     "title": "新增租戶",
            //     "key": "/users/add",
            // }
        ]
    },
    {
        "title": "物業管理",
        "key": "/estate",
        "children": [
            {
                "title": "樓宇管理",
                "key": "/estate/tenement",

            },
            {
                "title": "房間管理",
                "key": "/estate/room",
            },
            {
                "title": "車輛信息",
                "key": "/estate/car",
            }
        ]
    },
    {
        "title": "報修管理",
        "key": "/repair"
    },
    {
        "title": "財務管理",
        "key": "/finance",
        "children": [
            {
                "title": "契約管理",
                "key": "/finance/contract",

            },
            {
                "title": "契約詳情",
                "key": "/finance/surrender",
            },
            {
                "title": "賬單管理",
                "key": "/finance/bill",
            }
        ]
    },
    {
        "title": "招商管理",
        "key": "/merchants",
    },
    {
        "title": "運營管理",
        "key": "/operation",
        "children": [
            {
                "title": "運營總覽",
                "key": "/operation/all",

            },
            {
                "title": "文章發布",
                "key": "/operation/article",
            },
            {
                "title": "內容評論",
                "key": "/operation/comments",
            }
        ]
    },
    {
        "title": "設備管理",
        "key": "/equipment",
    },
    {
        "title": "能源消耗",
        "key": "/energy",
    },
    {
        "title": "系統設置",
        "key": "/settings",
    },
    {
        "title": "個人中心",
        "key": "/personal",
    }
]

function extractTreeKeys(data:any){
    let keys:string[]=[]
    data.forEach((item:any)=>{
        if(item.children&&item.children.length>0){
            const childKeys:string[]=extractTreeKeys(item.children) //得到children底下的key
            keys=keys.concat(childKeys)
        }else{
            keys.push(item.key)
        }
    })
    return keys
}



function Settings() {

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'No.',
            key: 'index',
            render: (value, record, index) => index + 1
        },
        {
            title: '帳號名稱',
            dataIndex: 'accountName',
            key: 'accountName'
        },
        {
            title: '所屬權限',
            dataIndex: 'auth',
            key: 'auth'
        },
        {
            title: '使用人',
            dataIndex: 'person',
            key: 'person'
        },
        {
            title: '使用電話',
            dataIndex: 'tel',
            key: 'tel'
        },
        {
            title: '所屬部門',
            dataIndex: 'department',
            key: 'department'
        },
        {
            title: '操作',
            key: 'operate',
            render(value, record) {
                return <>
                    <Button size='small' type='primary' className='mr' onClick={()=>edit(record.menu,record.accountName)}>修改權限</Button>
                    <Popconfirm
                        title='操作提示'
                        description='確認要刪除當前帳號嗎？'
                        okText='是'
                        cancelText='否'

                    >
                        <Button size='small' type='primary' danger>刪除帳號</Button>
                    </Popconfirm>

                </>
            }
        },
    ]

    const {
        dataList,
        page,
        pageSize,
        total,
        loading,
        formData,
        setDataList,
        setPage,
        setPageSize,
        setTotal,
        setLoading,
        setFormData,
        loadData,
        onChange,
        handleChange,
        reset
    } = useDataList<SearchType, DataType>({ accountName: '' }, getAccountList)

    const [checkKeys,setCheckKeys]=useState<React.Key[]>([])
    //checkKeys是一個純字符串數組

    const {menuList} = useSelector((state:any)=>state.authSlice)

    const [accountName,setAccountName]=useState<string>('當前用戶')
    
    const handle=()=>{
        console.log(checkKeys,accountName)
        //拿到勾選的keys和帳戶名發給後端，讓後端去處理權限變更
    }

    const edit=(menu:MenuType[],accountName:string)=>{
        setAccountName(accountName)
        const newCheckedKeys=extractTreeKeys(menu)
        setCheckKeys(newCheckedKeys)
    }

    const onCheck:TreeProps['onCheck']=(checkedKeys)=>{
        //checkedKeys是當下選到的
        setCheckKeys(checkedKeys as React.Key[])
        //前面宣告這個變數的時候有指定其類型
    }

    useEffect(()=>{
        setCheckKeys(extractTreeKeys(menuList))
        //console.log(menuList)
    },[])

    return <div>
        <Card>
            <Row gutter={16}>
                <Col span={8}>
                    <Input placeholder='請輸入帳號名' name='accountName' value={formData.accountName} onChange={handleChange} />
                </Col>
                <Col span={8}>
                    <Button type='primary' onClick={loadData}>搜索</Button>
                </Col>
                <Col span={8} className='tr'>
                    <Button type='primary'>新建帳號</Button>
                </Col>
            </Row>

        </Card>

        <Row gutter={16} className='mt'>
            <Col span={8} >
                <Card title={accountName+'：所擁權限'}>
                    <Tree
                        treeData={treeData}
                        checkable
                        checkedKeys={checkKeys}
                        onCheck={onCheck}
                    />
                </Card>
                <Card className='mt'>
                    <Popconfirm
                        title='操作提示'
                        description={`您確認要修改${accountName}的權限嗎？`}
                        okText='是'
                        cancelText='否'
                        onConfirm={handle}
                    >
                        <Button type='primary'>提交修改</Button>
                    </Popconfirm>
                    
                </Card>
            </Col>
            <Col span={16}>
                <Card>
                    <Table
                        columns={columns}
                        pagination={false}
                        dataSource={dataList}
                        loading={loading}
                        rowKey={record => record.id}
                    />
                    <Pagination className='fr mt' showQuickJumper defaultCurrent={1} total={total} onChange={onChange} current={page} pageSize={pageSize} />
                </Card>
            </Col>
        </Row>

    </div>
}

export default Settings