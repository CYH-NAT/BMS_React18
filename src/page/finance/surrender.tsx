import { Card, Descriptions, Button } from 'antd'
import type {DescriptionsProps} from 'antd'
import { useNavigate,useSearchParams } from 'react-router-dom'
import { useDispatch} from "react-redux";
import { setBack } from '../../store/finance/contractSlice'

const items: DescriptionsProps['items']=[
    {
        key:'1',
        label:'契約類型',
        children:'租賃合約'
    },
    {
        key:'2',
        label:'契約名稱',
        children:'房屋租賃合約通用模板'
    },
    {
        key:'3',
        label:'合約開始日期',
        children:'2023-03-05'
    },
    {
        key:'4',
        label:'合約結束日期',
        children:'2023-03-05'
    },
    {
        key:'5',
        label:'甲方',
        children:'萬物科技有限公司'
    },
    {
        key:'6',
        label:'乙方',
        children:'天明物業有限公司'
    },
    {
        key:'7',
        label:'審核狀態',
        children:'審核拒絕'
    },
    {
        key:'8',
        label:'拒絕原因',
        children:'缺少法人蓋章'
    },
    {
        key:'9',
        label:'聯絡方式',
        children:'1888888888'
    },
    {
        key:'10',
        label:'降加條款',
        children:(
            <>
                1.半年付，年租
                <br />
                2.費用已包含空調費用
                <br />
                3.含兩個車位使用權(不含充電樁)
                <br />
                4.9:00-18:00禁止裝修
            </>
        )
    },
]

const items2: DescriptionsProps['items']=[
    {
        key:'1',
        label:'所有樓宇',
        children:'A1寫字樓'
    },
    {
        key:'2',
        label:'房號',
        children:'406'
    },
    {
        key:'3',
        label:'房屋面積',
        children:'96㎡'
    },
    {
        key:'4',
        label:'計價面積',
        children:'70㎡'
    },
    {
        key:'5',
        label:'物業費',
        children:'6800'
    },
    {
        key:'6',
        label:'房屋狀態',
        children:'精裝'
    },
    {
        key:'7',
        label:'物業管家',
        children:'蔡文萍'
    },
    {
        key:'8',
        label:'管家電話',
        children:'177777777'
    }
]

function Surrender(){
    const navigate=useNavigate()
    const dispatch = useDispatch()
    const [searchParams]=useSearchParams()

    const jump=()=>{
        navigate('/finance/contract?return=true')
        dispatch(setBack(true)) //識別是否為跳回的標籤
    }

    return <div>
        <Card>
            <Button type='primary' onClick={jump}>返回</Button>
        </Card>
        <Card>
            <Descriptions title={`契約編號：${searchParams.get('contractNo')}`} bordered items={items}/>
            <Descriptions title='租賃房間信息' bordered items={items2} className='mt'/>
        </Card>
    </div>
}

export default Surrender