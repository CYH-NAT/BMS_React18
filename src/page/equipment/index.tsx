import { Card, Row, Col, Input, Table, Pagination, Button, Tag } from 'antd'
import { TableProps } from 'antd'
import useDataList from '../../hooks/useDataList'
import { getEquipmentList } from '../../api/equipment'

interface SearchType{
    name:string,
    person:string,
}

interface DataType{
    id:number,
    no:string,
    name:string,
    person:string,
    tel:number,
    time:string,
    rest:string,
    status:string,
    las:string,
    type:string,
    from:string
}

const columns:TableProps<DataType>['columns']=[
    {
        title:'No.',
        key:'index',
        render:(value,record,index)=>index+1
    },
    {
        title:'設備名稱',
        dataIndex:'name',
        key:'name'
    },
    {
        title:'設備編號',
        dataIndex:'no',
        key:'no'
    },
    {
        title:'負責人',
        dataIndex:'person',
        key:'person'
    },
    {
        title:'負責人電話',
        dataIndex:'tel',
        key:'tel'
    },
    {
        title:'理論壽命',
        dataIndex:'time',
        key:'time'
    },
    {
        title:'剩餘壽命',
        dataIndex:'rest',
        key:'rest'
    },
    {
        title:'使用狀態',
        dataIndex:'status',
        key:'status',
        render(value){
            const color=['green','yellow','red']
            const status=['使用中','維護中','已損壞']
            // let v=0
            // value==1?(v=0):(value=='2'?v=1:v=2)
            return <Tag color={color[value-1]}>{status[value-1]}</Tag>
        }
    },
    {
        title:'最近保養日期',
        dataIndex:'last',
        key:'last'
    },
    {
        title:'規格型號',
        dataIndex:'type',
        key:'type'
    },
    {
        title:'生產商',
        dataIndex:'from',
        key:'from'
    },
    {
        title:'操作',
        dataIndex:'operate',
        render:()=> <Button type='primary' size='small'>詳細</Button>
    },
    
]

function Equipment(){
    const {
        dataList,
        page,
        pageSize,
        total,
        loading,
        formData,
        loadData,
        onChange,
        handleChange,
        reset
    }=useDataList<SearchType,DataType>({name:'',person:''},getEquipmentList)
    return <div>
        <Card className='search'>
            <Row>
                <Col span={7}>
                    <p>設備名稱：</p>
                    <Input name='name' placeholder='請輸入設備名稱或編號' onChange={handleChange} value={formData.name}/>
                    {/* Input的value屬性是表單的值、顯示出來的值，事件對象的value是事件發生時表單當下的值 */}
                </Col>
                <Col span={7}>
                    <p>負責人：</p>
                    <Input name='person' placeholder='請輸入負責人姓名' onChange={handleChange} value={formData.person}/>
                </Col>
                <Col span={3}>
                    <Button type='primary' className='mr' onClick={loadData}>查詢</Button>
                    <Button onClick={reset}>重置</Button>
                </Col>
            </Row>
        </Card>
        <Card className='mt'>
            <Table
                columns={columns}
                pagination={false}
                dataSource={dataList}
                loading={loading}
                rowKey={record=>record.id}
            />
            <Pagination className='fr mt' showQuickJumper defaultCurrent={1} total={total} onChange={onChange} current={page} pageSize={pageSize}/>
        </Card>

    </div>
}

export default Equipment