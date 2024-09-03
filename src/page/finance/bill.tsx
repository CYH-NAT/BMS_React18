import { Card, Row, Col, Input, Table, Pagination, Statistic, DatePicker, Select, Button, Tag } from 'antd'
import { DownloadOutlined, DeleteOutlined } from '@ant-design/icons'
import { TableProps } from 'antd'
import { getBillList } from '../../api/contract'
import { useEffect, useMemo, useState } from 'react'
import exportToExcel from '../../utils/exportToExcel'

interface DataType {
    key: string,
    accountNo: string,
    status: string,
    roomNo: string,
    carNo: string,
    tel: string,
    costName1: string,
    costName2: string,
    costName3: string,
    startDate: string,
    endDate: string,
    preferential: number,
    money: number,
    pay: string
}

interface SearchType {
    date: string[],
    no: string,
    status: string,
    page: number,
    pageSize: number
}

function Bill() {
    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'No.',
            key: 'index',
            render: (value, record, index) => index + 1,
            width: 100,
            fixed: 'left'
        },
        {
            title: '帳單號',
            dataIndex: 'accountNo',
            key: 'accountNo',
            width: 150
        },
        {
            title: '繳費狀態',
            dataIndex: 'status',
            key: 'status',
            render: value => value == 1 ? <Tag color='green'>已繳費</Tag> : <Tag color='red'>未繳費</Tag>,
            width: 100
        },
        {
            title: '房屋號',
            dataIndex: 'roomNo',
            key: 'roomNo',
            width: 100
        },
        {
            title: '車位號',
            dataIndex: 'carNo',
            key: 'carNo',
            width: 100
        },
        {
            title: '電話',
            dataIndex: 'tel',
            key: 'tel',
            width: 150
        },
        {
            title: '物業費(年)',
            dataIndex: 'costName1',
            key: 'costName1',
            width: 150
        },
        {
            title: '車位費',
            dataIndex: 'costName2',
            key: 'costName2',
            width: 150
        },
        {
            title: '房屋租金',
            dataIndex: 'costName3',
            key: 'costName3',
            width: 150
        },
        {
            title: '開始時間',
            dataIndex: 'startDate',
            key: 'startDate',
            width: 150
        },
        {
            title: '結束時間',
            dataIndex: 'endDate',
            key: 'endDate',
            width: 150
        },
        {
            title: '優惠金額',
            dataIndex: 'preferential',
            key: 'preferential',
            width: 150
        },
        {
            title: '合計應收金額',
            dataIndex: 'money',
            key: 'money',
            width: 150
        },
        {
            title: '支付方式',
            dataIndex: 'pay',
            key: 'pay',
            width: 100
        },
        {
            title: '操作',
            key: 'operate',
            render() {
                return <>
                    <Button type='primary' size='small'>列印</Button>
                    <Button type='primary' size='small' className='ml mr'  danger>帳單作廢</Button>
                    <Button type='primary' size='small'>退款</Button>
                </>
            },
            width: 230,
            fixed: 'right'
        },
    ]

    const [selectedRowKeys,setSelectedRowKeys]=useState<React.Key[]>([])
    const [selectedRows,setSelectedRows]=useState<any>({})
    const { RangePicker } = DatePicker
    const [dataList, setDataList] = useState<DataType[]>([])
    const [page, setPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(10);
    const [loading, setLoading] = useState<boolean>(false)
    const [total, setTotal] = useState<number>(0)
    const [formData, setFormData] = useState<SearchType>({
        date: [],
        no: "",
        status: "",
        page: 1,
        pageSize: 10
    })

    const rowSelection={
        selectedRowKeys,
        onChange(selectedRowKeys:React.Key[],selectedRows:any){
            setSelectedRowKeys(selectedRowKeys)
            setSelectedRows(selectedRows)
            //console.log(selectedRows)
        }
    }

    //導出成為excel需要的數組
    const header=['accountNo','status','roomNo','carNo','tel','costName1','costName2','costName3',"startDate","endDate","preferential",'money','pay']

    const onChange = (page: number, pageSize: number) => {
        setPage(page)
        setPageSize(pageSize)
    }

    const handleChange = (value: any, dateString: any) => {
        setFormData(prevState => ({
            ...prevState,
            date: dateString
        }))
    }

    const handleChange1 = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {value:no} = e.target  //解構出來之後改名成no
        setFormData(prevState => ({
            ...prevState,
            no //es6的寫法
        }))
    }

    const handleChange2 = (value:string) => {
        setFormData(prevState => ({
            ...prevState,
            status:value
        }))
    }

    const loadData= async()=>{
        setLoading(true)
        const {date:[startDate,endDate],no,status} =formData //把需要的東西解構出來
        const {data:{list,total}} = await getBillList({page,pageSize,startDate,endDate,no,status}) //es6寫法
        setLoading(false)
        setDataList(list)
        setTotal(total)
    }

    const disabled= useMemo(()=>{
        return selectedRowKeys.length?false:true
    },[selectedRowKeys])

    useEffect(()=>{
        loadData()
    },[page,pageSize])

    return <div>
        <Card>
            <Row gutter={16}>
                <Col span={6}>
                    <Statistic title='應收帳單金額' value='16876.38' />
                </Col>
                <Col span={6}>
                    <Statistic title='已繳帳單金額' value='6952.00' />
                </Col>
                <Col span={6}>
                    <Statistic title='已退帳單金額' value='2355.23' />
                </Col>
                <Col span={6}>
                    <Statistic title='未繳帳單金額' value='9962.00' />
                </Col>
            </Row>
        </Card>
        <Card className='mt search'>
            <Row gutter={16}>
                <Col span={6}>
                    <p>帳單日期</p>
                    <RangePicker name='date' style={{ width: '100%' }} onChange={handleChange} />
                </Col>
                <Col span={6}>
                    <p>房車號</p>
                    <Input placeholder='請輸入門牌號或車位號' value={formData.no} onChange={handleChange1}/>
                </Col>
                <Col span={6}>
                    <p>繳費情況</p>
                    <Select
                        style={{ width: '100%' }}
                        options={[
                            { value: "1", label: '全部' },
                            { value: "2", label: '已繳納' },
                            { value: "3", label: '未繳納' }
                        ]}
                        onChange={handleChange2}
                    >
                    </Select>
                </Col>
                <Col span={6}>
                    <Button type='primary' className='mr' onClick={loadData}>查詢</Button>
                    <Button>重置</Button>
                </Col>
            </Row>
        </Card>
        <Card>
            <Button type='primary' icon={<DownloadOutlined />} disabled={disabled} onClick={()=>exportToExcel(selectedRows,header)}>導出為Excel</Button>
            <Button danger type='primary' icon={<DeleteOutlined />} className='ml' disabled={disabled}>批量作廢</Button>
        </Card>
        <Card>
            <Table
                dataSource={dataList}
                columns={columns}
                pagination={false}
                rowKey={(record) => record.accountNo}
                scroll={{ x: 1200 }}
                rowSelection={rowSelection}
                loading={loading}
            />
            <Pagination className='fr mt' showQuickJumper current={page} pageSize={pageSize} total={total} onChange={onChange} />
        </Card>
    </div>
}

export default Bill