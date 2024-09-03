import { Row, Col, Card,Progress,Statistic, Timeline,Tag } from 'antd'
import { RadarChartOutlined,SnippetsOutlined,DollarOutlined,LaptopOutlined } from '@ant-design/icons'
import ReactEcharts from 'echarts-for-react'
import { getEnergyData } from '../../api/dashboard'
import { useEffect,useState } from 'react'
import "./index.scss"

const option2={
    title:{text:'企業資質情況(家)'},
    legend: {},
    tooltip: {trigger:'axis',axisPointer:{type:'shadow'}},
    grid:{left:'3%',right:'4%',bottom:'3%',containLabel:true},
    xAxis: { type: 'category',boundaryGap:[0,0.01],data:['2014','2016','2018','2020','2022','2024'] },
    yAxis: {type:'value',data:['Brazil','Indonesia','USA','India','China','World']},
    series: [
        {
            name:'科技企業',
            type: 'bar',
            data:[40,220,378,658,1122,1200]
        },
        {
            name:'高新企業',
            type: 'bar',
            data:[20,39,443,490,559,762]
        },
        {
            name:'國營企業',
            type: 'bar',
            data:[78,167,239,330,380,420]
        },
        ]
};

const option3 = {
    legend: {
      top: '10px'
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [30, 100],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: [
          { value: 40, name: '在營' },
          { value: 38, name: '已租' },
          { value: 32, name: '出租' },
          { value: 30, name: '續簽' },
          { value: 28, name: '新簽 5' },
          { value: 26, name: '待租 6' },
          { value: 22, name: '退租' }
        ]
      }
    ]
  };

function Dashboard() {
    
    const initialOption = {
        title: {
          text: '當日能源消耗'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: []
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['0:00', '4:00', '8:00', '12:00', '16:00', '20:00', '24:00']
        },
        yAxis: {
          type: 'value'
        },
        series: []
      };
    
    const [data,setData]=useState(initialOption)
    useEffect(()=>{
        const loadData = async()=>{
            const {data:apiData}=await getEnergyData(); //解構出來之後改名成apidata
            const dataList=apiData.map((item:any)=>({
                name:item.name,
                data:item.data,
                type:'line',
                stack:'Total',
            }));
            const updateOption={
                ...data,
                legend:{data:dataList.map((item:any)=>item.name)},
                series:dataList
            }
            setData(updateOption)
        }
        loadData()
    },[]) //空的依賴項，只在掛載完成時載入

    return <div className="dashboard">
        <Row gutter={16 /*間距*/}>
            <Col span={6}>
                <Card className='clearfix'>
                    <div className='fl area'>
                        <h2>13479</h2>
                        <p>園區總面績(平方公尺)</p>
                    </div>
                    <div className='fr'>
                        <RadarChartOutlined className='icon'/>
                    </div>
                </Card>
            </Col>
            <Col span={6}>
                <Card className='clearfix'>
                    <div className='fl area'>
                        <h2>8635</h2>
                        <p>租賃總面績(平方公尺)</p>
                    </div>
                    <div className='fr'>
                        <SnippetsOutlined className='icon' style={{color:"#81c452"}}/>
                    </div>
                </Card>
            </Col>            <Col span={6}>
                <Card className='clearfix'>
                    <div className='fl area'>
                        <h2>38764</h2>
                        <p>園區總產值(萬元)</p>
                    </div>
                    <div className='fr'>
                        <DollarOutlined className='icon' style={{color:"#62c9cb"}}/>
                    </div>
                </Card>
            </Col>            <Col span={6}>
                <Card className='clearfix'>
                    <div className='fl area'>
                        <h2>2874</h2>
                        <p>入住企業總數(家)</p>
                    </div>
                    <div className='fr'>
                        <LaptopOutlined className='icon' style={{color:"#e49362"}}/>
                    </div>
                </Card>
            </Col>
        </Row>
        <Row gutter={16} className='mt'>
            <Col span={12}>
                <Card title='能源消耗情況'>
                    <ReactEcharts option={data}></ReactEcharts>
                </Card>
            </Col>
            <Col span={12}>
                <Card title='企業資質情況'>
                    <ReactEcharts option={option2}></ReactEcharts>
                </Card>
            </Col>
        </Row>
        <Row gutter={16} className='mt'>
            <Col span={12}>
                <Card title='租賃情況'>
                    <ReactEcharts option={option3}></ReactEcharts>
                </Card>
            </Col>
            <Col span={6}>
                <Card title='充電樁空閒統計'>
                    <div className='wrap'>
                        <Progress type='circle' percent={75}/>
                        <Statistic title="總統電樁數" value={75} suffix='/100' className='mt'/>
                    </div>
                </Card>
            </Col>
            <Col span={6}>
                <Card title='實時車輛信息' style={{height:"406px"}}>
                    <Timeline items={[
                        {
                            children:<><Tag color='green'>進場</Tag>08:24車輛 A12345</>
                        },
                        {
                            children:<><Tag color='red'>出場</Tag>08:24車輛 A23456</>
                        },
                        {
                            children:<><Tag color='green'>進場</Tag>08:24車輛 A23456</>
                        },
                        {
                            children:<><Tag color='red'>出場</Tag>08:24車輛 A12345</>
                        },
                        {
                            children:<><Tag color='green'>進場</Tag>08:24車輛 A23456</>
                        },
                        {
                            children:<><Tag color='green'>進場</Tag>08:24車輛 A12345</>
                        }
                    ]}/>
                </Card>
            </Col>
        </Row>
    </div>
}

export default Dashboard