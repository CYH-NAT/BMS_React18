import {Card,Row,Col,Table,Input,Button,Tag,Progress,Badge} from 'antd'
import type {TableProps} from 'antd'

interface DataType{
    //後端回傳的數據類型
    key:string,
    name:string,
    person:string,
    tel:string,
    status:number,
    vacancyRate:number,
    propertyFee:string
}

const columns:TableProps<DataType>['columns']=[
    {
        title:'No.',
        key:'index',
        render:(value,record,index)=>index+1
    },
    {
        title:'樓宇名稱',
        key:'name',  //key隨便取沒差
        dataIndex:'name'
    },
    {
        title:'負責人',
        key:'person',  //key隨便取沒差
        dataIndex:'person'
    },
    {
        title:'負責人電話',
        key:'tel',  //key隨便取沒差
        dataIndex:'tel'
    },
    {
        title:'使用狀態',
        key:'status',  //key隨便取沒差
        dataIndex:'status',
        render(value){
            if(value==1){
                return <Tag color='#f50'>建設中</Tag>
            }else if(value==2){
                return <Tag color='#2db7f5'>已竣工</Tag>
            }else{
                return <Tag color='#87d068'>使用中</Tag>
            }
        }
    },
    {
        title:'空置率',
        key:'vacancyRate',  //key隨便取沒差
        dataIndex:'vacancyRate',
        render:value=><Progress percent={value} status='active'/>
    },
    {
        title:'物業費率',
        key:'propertyFee',  //key隨便取沒差
        dataIndex:'propertyFee',
        render:value=><Badge color='green' text={value}/>
    },
    {
        title:'操作',
        key:'operate',  //key隨便取沒差
        render(){
            return <>
                <Button type='primary' className='mr'>編輯</Button>
                <Button type='primary' danger>刪除</Button>
            </>
        }
    }
]

const data:DataType[]=[
    {
        key:'1',
        name:'A1幢寫字樓',
        person:'王達',
        tel:'16654789654',
        status:1,
        vacancyRate:60,
        propertyFee:'3.5%'
    },
    {
        key:'2',
        name:'A2幢寫字樓',
        person:'蘇東凱',
        tel:'13698756669',
        status:2,
        vacancyRate:40,
        propertyFee:'3.8%'
    },
    {
        key:'3',
        name:'B1幢寫字樓',
        person:'莉亞',
        tel:'15587966698',
        status:3,
        vacancyRate:20,
        propertyFee:'3.1%'
    },
    {
        key:'4',
        name:'B2幢寫字樓',
        person:'常可',
        tel:'13698756324',
        status:3,
        vacancyRate:30,
        propertyFee:'4.0%'
    },
    {
        key:'5',
        name:'C1幢寫字樓',
        person:'劉偉',
        tel:'19878965444',
        status:3,
        vacancyRate:50,
        propertyFee:'3.5%'
    },
    {
        key:'6',
        name:'C2幢寫字樓',
        person:'王達',
        tel:'13369888562',
        status:3,
        vacancyRate:10,
        propertyFee:'2.9%'
    },
    {
        key:'7',
        name:'天匯國際大廈',
        person:'馬浩瀚',
        tel:'13578549687',
        status:3,
        vacancyRate:25,
        propertyFee:'3.7%'
    },
    {
        key:'8',
        name:'時代金融廣場',
        person:'楊枊',
        tel:'16654789654',
        status:3,
        vacancyRate:15,
        propertyFee:'3.3%'
    },
]


function Tenement(){
    return <div>
        <Card className='search'>
            <Row gutter={16}>
                <Col span={4}>
                    <p>樓宇名稱</p>
                    <Input></Input>
                </Col>
                <Col span={4}>
                    <p>負責人</p>
                    <Input></Input>
                </Col>
                <Col span={4}>
                    <Button className='mr' type='primary'>查詢</Button>
                    <Button>重置</Button>
                </Col>
            </Row>
        </Card>
        <Card>
            <Table
                columns={columns}
                dataSource={data}
            />
        </Card>
    </div>
}

export default Tenement