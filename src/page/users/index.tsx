import { Card, Row, Col, Input, Button, Table, Pagination, Tag, Popconfirm, message } from "antd"
import type { TableProps, PaginationProps } from "antd"
import type { DataType } from "./interface"
import { useCallback, useEffect, useMemo, useState } from "react"
import { getUserList } from "../../api/userList"
import { deleteUser,batchDeleteUser } from "../../api/userList"
import UserForm from "./userForm"
import React from "react"
import { useDispatch } from "react-redux"
import { setUserData } from "../../store/user/userSlice"

interface searchType {
    companyName: string,
    contact: string,
    phone: string
}



function Users() {
    const [dataList, setDataList] = useState<DataType[]>([])
    const [page, setPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(10)
    const [total, setTotal] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const [selectedRowKeys, setSelectedRowkeys] = useState<React.Key[]>([])
    const [isModalOpen,setIsModalOpen]=useState<boolean>(false)
    const [title,setTitle]=useState<string>('')
    const dispatch=useDispatch()
    const [formData, setFormData] = useState<searchType>({
        companyName: "",
        contact: "",
        phone: ""
    })
    

    //columns中的方法會用到組件內的數據，所以需要放在組件裡面
    const columns: TableProps<DataType>['columns'] = [
        {//由此增加序號
            title: 'No.',
            key: 'index',
            // render(value,record,index){
            //     return index+1  //value 當前值，record，整行的數據，index序號
            // },
            render: (value, record, index) => index + 1
        },
        {
            title: '客戶名稱',
            key: 'name',
            dataIndex: 'name'
        },
        {
            title: '經營狀態',
            key: 'status',
            dataIndex: 'status',
            render(value, record, index) {
                if (value == 1) {
                    return <Tag color="green">營業中</Tag>
                } else if (value == 2) {
                    return <Tag color="#f50">暫停營業</Tag>
                } else if (value == 3) {
                    return <Tag color="red">已關閉</Tag>
                }
            }
        },
        {
            title: '聯絡電話',
            key: 'tel',
            dataIndex: 'tel'
        },
        {
            title: '所屬行業',
            key: 'business',
            dataIndex: 'business'
        },
        {
            title: '電郵',
            key: 'email',
            dataIndex: 'email'
        },
        {
            title: '統一信用代碼',
            key: 'creditCode',
            dataIndex: 'creditCode'
        },
        {
            title: '工商註冊號',
            key: 'industryNum',
            dataIndex: 'industryNum'
        },
        {
            title: '組織機構代碼',
            key: 'organizationCode',
            dataIndex: 'organizationCode'
        },
        {
            title: '法人名',
            key: 'legalPerson',
            dataIndex: 'legalPerson'
        },
        {
            title: '操作',
            key: 'operate',
            render(value,record,index) {
                return <>
                    <Button type="primary" size="small" onClick={()=>edit(record)}>編輯</Button>
                    <Popconfirm
                        description='確定要刪除嗎？'
                        title='刪除確認'
                        okText='是'
                        cancelText='否'
                        onConfirm={()=>confirm(record.id)}
                        >
                        <Button type="primary" danger size="small" className="ml">刪除</Button>
                    </Popconfirm>
    
                </>
            }
        },
    ]

    const disabled= useMemo(()=>{
        return selectedRowKeys.length?false:true
    },[selectedRowKeys])

    useEffect(() => {
        loadData()
    }, [page, pageSize])

    const loadData = async () => {
        setLoading(true)
        const { data: { list, total } } = await getUserList({ ...formData, page, pageSize })  //post查詢項、第幾頁、每頁的條數
        setLoading(false)
        setDataList(list)
        setTotal(total)

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target //得到輸入框中變化的項以及值
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const rowSelection = {
        selectedRowKeys,  //數組中的項會顯示為被選中
        onChange(selectedRowKeys: React.Key[]) {   //預設的回調函數，selectedRowkeys作為變量，selectedRowKeys為當前所有被勾選的項
            console.log(selectedRowKeys)
            setSelectedRowkeys(selectedRowKeys)  //更新選中項
        }
    }

    const onChange: PaginationProps['onChange'] = (page, pageSize) => {
        setPage(page)
        setPageSize(pageSize)
        //loadData()  //不要在這邊直接調用，因為set方法是異步的，loadData會先跑完
    }

    const reset = () => {
        //將選中項、搜索框、頁碼、條數全部初始化
        setSelectedRowkeys([]);
        setFormData({
            companyName: "",
            contact: "",
            phone: ""
        });
        setPage(1)
        setPageSize(10)
        loadData()
    }

    const confirm= async function(id:string){
        //點刪除時跳出的警告視窗
        const {data} =await deleteUser(id)
        message.success(data);
        loadData();
    }

    const batchDelete = async()=>{
        const {data} = await batchDeleteUser(selectedRowKeys)
        message.success(data);
        loadData();
    }

    const edit = (record:DataType)=>{
        setIsModalOpen(true)
        setTitle('編輯企業')
        dispatch(setUserData(record))
    }

    const add = ()=>{
        setIsModalOpen(true)
        setTitle('新增企業')
        dispatch(setUserData({}))
    }

    const hideModal = useCallback(()=>{setIsModalOpen(false)},[])
    //把函數緩存起來，免得組件更新的時候重新創建新的函數(不同基址的函數)

    return <div className="users">
        <MyUserForm visible={isModalOpen} hideModal={hideModal} title={title} loadData={loadData}/>
        <Card className="search">
            <Row gutter={16}>
                <Col span={7}>
                    <p>企業名稱：</p>
                    <Input name='companyName' value={formData.companyName} onChange={handleChange} />
                </Col>
                <Col span={7}>
                    <p>聯絡人： </p>
                    <Input name='contact' value={formData.contact} onChange={handleChange} />
                </Col>
                <Col span={7}>
                    <p>聯絡電話：</p>
                    <Input name='phone' value={formData.phone} onChange={handleChange} />
                </Col>
                <Col span={3}>
                    <Button type='primary' onClick={loadData}>查詢</Button>
                    <Button className='ml' onClick={reset}>重置</Button>
                </Col>
            </Row>
        </Card>
        <Card className="mt tr">
            <Button type='primary' onClick={add}>新增企業</Button>
            <Button danger type='primary' disabled={disabled} onClick={batchDelete} className='ml'>批量刪除</Button>
        </Card>
        <Card className="mt">
            <Table
                columns={columns}
                dataSource={dataList}
                rowKey={(record) => record.id /*這邊這個record就是每一條的數據，類型取決於上方的dataType*/}
                loading={loading}
                rowSelection={rowSelection}
                pagination={false}//關掉table自帶的頁碼
            />
            <Pagination
                className="fr mt"
                total={total}
                current={page}
                pageSize={pageSize}
                showSizeChanger
                showQuickJumper
                showTotal={(total) => `共 ${total} 條`}
                onChange={onChange}
            />
        </Card>
    </div>
}
const MyUserForm = React.memo(UserForm)  //把彈窗組件弄成緩存組件
export default Users