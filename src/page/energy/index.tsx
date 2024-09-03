import { Row, Col, Card, Table } from 'antd'
import ReactEcharts from 'echarts-for-react'
import { getEnergyData } from '../../api/dashboard'
import { useEffect, useState } from 'react'
import { TableProps } from 'antd'
//import "./index.scss"

const option2 = {
    title: { text: '能源消耗總覽' },
    legend: {},
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'category', boundaryGap: [0, 0.01], data: ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-6'] },
    yAxis: { type: 'value', data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World'] },
    series: [
        {
            name: '水',
            type: 'bar',
            data: [40, 220, 378, 658, 1122, 1200]
        },
        {
            name: '電',
            type: 'bar',
            data: [20, 39, 443, 490, 559, 762]
        },
        {
            name: '熱',
            type: 'bar',
            data: [78, 167, 239, 330, 380, 420]
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
                { value: 40, name: '工廠用電' },
                { value: 38, name: '工廠用煤' },
                { value: 32, name: '員工用電' },
                { value: 30, name: '日常照明' },
                { value: 28, name: '設備未關' },
                { value: 26, name: '太陽能發電' }
            ]
        }
    ]
};

interface DataType {
    id: number,
    name: string,
    building: string,
    electricity: number,
    heat: number,
    carbon: number,
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'No.',
        key: 'index',
        render: (value, record, index) => index + 1
    },
    {
        title: '企業名稱',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '企業樓宇',
        dataIndex: 'building',
        key: 'building'
    },
    {
        title: '電力消耗',
        dataIndex: 'electricity',
        key: 'electricity'
    },
    {
        title: '熱力消耗',
        dataIndex: 'heat',
        key: 'heat'
    },
    {
        title: '碳排放',
        dataIndex: 'carbon',
        key: 'carbon'
    }
]

const dataList: DataType[] = [
    {
        id: 1,
        name: '北京集集科技有限公司',
        building: 'B2棟',
        electricity: 70,
        heat: 45,
        carbon: 22,
    },
    {
        id: 2,
        name: '上海一二科技有限公司',
        building: 'C2棟',
        electricity: 70,
        heat: 37,
        carbon: 21,
    },
    {
        id: 3,
        name: '有條數據科技有限公司',
        building: 'A2棟',
        electricity: 60,
        heat: 25,
        carbon: 17,
    },
    {
        id: 4,
        name: '觔斗雲網路有限公司',
        building: 'B2棟',
        electricity: 33,
        heat: 21,
        carbon: 6,
    },
    {
        id: 5,
        name: '北京絲思科技有限公司',
        building: 'A1棟',
        electricity: 45,
        heat: 22,
        carbon: 8,
    },
    {
        id: 6,
        name: '平平技術科技有限公司',
        building: 'B2棟',
        electricity: 70,
        heat: 45,
        carbon: 22,
    }
]

function Energy() {
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

    const [data, setData] = useState(initialOption)
    useEffect(() => {
        const loadData = async () => {
            const { data: apiData } = await getEnergyData(); //解構出來之後改名成apidata
            const dataList = apiData.map((item: any) => ({
                name: item.name,
                data: item.data,
                type: 'line',
                stack: 'Total',
            }));
            const updateOption = {
                ...data,
                legend: { data: dataList.map((item: any) => item.name) },
                series: dataList
            }
            setData(updateOption)
        }
        loadData()
    }, []) //空的依賴項，只在掛載完成時載入

    return <div>
        <Row gutter={16} className='mt'>
            <Col span={12}>
                <Card title='能源消耗情況'>
                    <ReactEcharts option={data}></ReactEcharts>
                </Card>
            </Col>
            <Col span={12}>
                <Card title='消耗總覽'>
                    <ReactEcharts option={option2}></ReactEcharts>
                </Card>
            </Col>
        </Row>
        <Row gutter={16} className='mt'>
            <Col span={12}>
                <Card title='能源消耗佔比'>
                    <ReactEcharts option={option3}></ReactEcharts>
                </Card>
            </Col>
            <Col span={12}>
                <Card>
                    <Table
                        columns={columns}
                        pagination={false}
                        dataSource={dataList}
                        loading={false}
                        rowKey={record => record.id}
                    />
                </Card>
            </Col>
        </Row>
    </div>
}

export default Energy