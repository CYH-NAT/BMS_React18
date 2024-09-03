import { Card, Table, Row, Col, Input, Button, Tag, Pagination } from 'antd'
import { useEffect, useState } from 'react'
import { TableProps } from 'antd'
import { getContractList } from '../../api/contract'
import { setTotal ,setData,setBack,setformList,setCurrent,setSize} from '../../store/finance/contractSlice'
import { useDispatch,useSelector } from "react-redux";
import { PaginationProps } from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'

interface searchType {
    contractNo: string,
    person: string,
    tel: string
}

interface DataType {
    key: string,
    contractNo: string,
    type: string,
    name: string,
    startDate: string,
    endDate: string,
    jia: string,
    yi: string,
    status: string
}

function Contract() {

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'No.',
            key: 'index',
            render: (value, record, index) => index + 1
        },
        {
            title: '契約編號',
            dataIndex: "contractNo",
            key: 'contractNo',
        },
        {
            title: '契約類別',
            dataIndex: "type",
            key: 'type',
        },
        {
            title: '契約名稱',
            dataIndex: "name",
            key: 'name',
        },
        {
            title: '契約開始日期',
            dataIndex: "startDate",
            key: 'startDate',
        },
        {
            title: '契約結束日期',
            dataIndex: "endDate",
            key: 'endDate',
        },
        {
            title: '甲方',
            dataIndex: "jia",
            key: 'jia',
        },
        {
            title: '乙方',
            dataIndex: "jia",
            key: 'jia',
        },
        {
            title: '審核狀態',
            dataIndex: "status",
            key: 'status',
            render(value) {
                if (value == 1) {
                    return <Tag>未審核</Tag>
                } else if (value == 2) {
                    return <Tag color='green'>審核通過</Tag>
                } else {
                    return <Tag color='red'>申請拒絕</Tag>
                }
            }
        },
        {
            title: '操作',
            key: 'operate',
            render(value, record) {
                return <Button type='primary' size='small' onClick={()=>detail(record.contractNo)}>契約詳情</Button>
            }

        },

    ]
    
    const {data,total,back,current,formList,size}=useSelector((state:any)=>state.contractSlice) //先把redux的數據取出來
    const [formData, setFormData] = useState<searchType>(formList)
    const [page, setPage] = useState<number>(current)
    const [pageSize, setPageSize] = useState<number>(size)
    //以上三行都是先用redux裡的數據當初始值，這樣子從詳情切回來的時候就不會使page或pageSize變動而觸發loadData
    //useState的數據會比useEffect還先建立好，也就是說每次組件載入時，useEffect以前的東西都會先加載一遍
    const dispatch=useDispatch()
    const [loading,setLoading]=useState<boolean>(false)
    const navigate=useNavigate()
    const [searchParams] = useSearchParams()
    const isReturn=searchParams.get('return')


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,  //把完整的對象複製
            [name]: value  //把對應的屬性修改為使用者輸入的值
        })
        )
    }

    const onChange:PaginationProps['onChange']=(page,pageSize)=>{
        //此處的page、pageSize為最新的值
        setPage(page)
        setPageSize(pageSize)
        //數據更新是異步的，不該在下方直接loadData
        //否則傳給loadData的page是舊值
        //loadData(page,pageSize)

    }

    const loadData = async () => {
        setLoading(true)
        const { data:{list,total} } = await getContractList({ ...formData, page, pageSize })
        setLoading(false)
        dispatch(setData(list))  //返回的數據全存在redux裡了
        dispatch(setTotal(total))
        
    }

    const detail=(contractNo:string)=>{
        //按下按鈕的瞬間把內容記下來存進redux
        dispatch(setCurrent(page))
        dispatch(setSize(pageSize))
        dispatch(setformList(formData))
        navigate('/finance/surrender?contractNo='+contractNo)
    }

    const reset=()=>{
        setFormData({
            contractNo: '',
            person: '',
            tel: ''
        })
        setPage(1)
        setPageSize(10)
        loadData()
    }

    useEffect(()=>{
        if(back){
            dispatch(setBack(false))
        }else{
            loadData()
        }
        //back?dispatch(setBack(false)):loadData()
        //從上詳情頁跳回來的話就把flag關了，不是的話就加載數據
        
        //console.log('我回來惹',back)  //顯示的是舊值
    },[page,pageSize])

    return <div>
        <Card className='search'>
            <Row gutter={16}>
                <Col span={7}>
                    <p>契約編號：</p>
                    <Input name='contractNo' value={formData.contractNo} onChange={handleChange} />
                </Col>
                <Col span={7}>
                    <p>聯絡人</p>
                    <Input name='person' value={formData.person} onChange={handleChange} />
                </Col>
                <Col span={7}>
                    <p>聯絡電話</p>
                    <Input name='tel' value={formData.tel} onChange={handleChange} />
                </Col>
                <Col span={3}>
                    <Button type='primary' className='mr' onClick={()=>{loadData()}}>查詢</Button>
                    <Button onClick={reset}>重置</Button>
                </Col>
            </Row>
        </Card>
        <Card className='mt'>
            <Table
                columns={columns}
                pagination={false}
                loading={loading}
                dataSource={data}
                rowKey={record=>record.contractNo}
            />
            <Pagination className='mt fr' showQuickJumper defaultCurrent={1} total={total} onChange={onChange} current={page} pageSize={pageSize}/>
        </Card>
    </div>
}

export default Contract