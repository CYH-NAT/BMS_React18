import { Row, Col, Tag, Progress, List, Avatar, Card,Calendar,Badge } from 'antd'

const data = [
    {
        title: 'Ant Design title 1'
    }
]

function Personal() {
    return <div>
        <Row gutter={16}>
            <Col span={6}>
                <Card>
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={(item, index) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={`https://randomuser.me/api/portraits/thumb/men/52.jpg`} />}
                                    title={<a href="https://ant.design">{sessionStorage.getItem('username')}-運營專員</a>}
                                    description="無論是工作還是生存，都要盡己所能全力以赴，優秀才是常態。"
                                />
                            </List.Item>
                        )}
                    />
                </Card>
                <Card className='mt'>
                    <Calendar fullscreen={false}/>
                </Card>
            </Col>
            <Col span={18}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card>
                            待處理：<Badge count={4} color='#faad14'></Badge>
                        </Card>
                        <Card title='新增帳號申請' extra={<a href='#'>詳情</a>} className='mt'>
                            <p>描述：新入職員工，需要新建user帳號</p>
                            <p className='mt'>創建者：人力資源部-劉婷</p>
                            <div className='mt'>
                                日期：<Tag>2024-05-02</Tag>
                            </div>
                            <div className='mt'>
                                <Tag color='blue'>常規</Tag><Tag color='blue'>帳號問題</Tag>
                            </div>
                            <div className='mt'>
                                進度：
                                <Progress percent={1}/>
                            </div>
                        </Card>
                        <Card title='物業費催繳' extra={<a href='#'>詳情</a>} className='mt'>
                            <p>描述：催促企業儘快繳納</p>
                            <p className='mt'>創建者：總裁辦-王久</p>
                            <div className='mt'>
                                日期：<Tag>2024-05-01</Tag>
                            </div>
                            <div className='mt'>
                                <Tag color='orange'>緊急</Tag><Tag color='blue'>物業問題</Tag>
                            </div>
                            <div className='mt'>
                                進度：
                                <Progress percent={1}/>
                            </div>
                        </Card>
                        <Card title='充電樁報修' extra={<a href='#'>詳情</a>} className='mt'>
                            <p>描述：C1樓下充電樁損壞，盡快找人維修</p>
                            <p className='mt'>創建者：行政部-王偉</p>
                            <div className='mt'>
                                日期：<Tag>2024-05-04</Tag>
                            </div>
                            <div className='mt'>
                                <Tag color='blue'>常規</Tag><Tag color='blue'>物業問題</Tag>
                            </div>
                            <div className='mt'>
                                進度：
                                <Progress percent={1}/>
                            </div>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            處理中：<Badge count={3} color='blue'></Badge>
                        </Card>
                        <Card title='通知企業統一供暖' extra={<a href='#'>詳情</a>} className='mt'>
                            <p>描述：即將供暖，調試閥門</p>
                            <p className='mt'>創建者：行政部-王偉</p>
                            <div className='mt'>
                                日期：<Tag>2024-05-03</Tag>
                            </div>
                            <div className='mt'>
                                <Tag color='blue'>常規</Tag><Tag color='blue'>物業問題</Tag>
                            </div>
                            <div className='mt'>
                                進度：
                                <Progress percent={34}/>
                            </div>
                        </Card>
                        <Card title='帳單沒有審核' extra={<a href='#'>詳情</a>} className='mt'>
                            <p>描述：新一季度財務帳單抓緊審核完成</p>
                            <p className='mt'>創建者：總裁辦-張大</p>
                            <div className='mt'>
                                日期：<Tag>2024-05-011</Tag>
                            </div>
                            <div className='mt'>
                                <Tag color='orange'>緊急</Tag><Tag color='blue'>財務問題</Tag>
                            </div>
                            <div className='mt'>
                                進度：
                                <Progress percent={65}/>
                            </div>
                        </Card>
                        <Card title='車位到期提醒' extra={<a href='#'>詳情</a>} className='mt'>
                            <p>描述：車位續租改為按年收費</p>
                            <p className='mt'>創建者：總裁辦-張大</p>
                            <div className='mt'>
                                日期：<Tag>2024-05-20</Tag>
                            </div>
                            <div className='mt'>
                                <Tag color='blue'>常規</Tag><Tag color='blue'>物業問題</Tag>
                            </div>
                            <div className='mt'>
                                進度：
                                <Progress percent={47}/>
                            </div>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            已完成：<Badge count={9} color='green'></Badge>
                        </Card>
                        <Card title='文章發布' extra={<a href='#'>詳情</a>} className='mt'>
                            <p>描述：發布招商文章</p>
                            <p className='mt'>創建者：網推部-張樂樂</p>
                            <div className='mt'>
                                日期：<Tag>2024-04-02</Tag>
                            </div>
                            <div className='mt'>
                                <Tag color='blue'>常規</Tag><Tag color='blue'>營運問題</Tag>
                            </div>
                            <div className='mt'>
                                進度：
                                <Progress percent={100}/>
                            </div>
                        </Card>
                        <Card title='新增帳號申請' extra={<a href='#'>詳情</a>} className='mt'>
                            <p>描述：新入職員工，需要新建user帳號</p>
                            <p className='mt'>創建者：人力資源部-劉婷</p>
                            <div className='mt'>
                                日期：<Tag>2024-04-11</Tag>
                            </div>
                            <div className='mt'>
                                <Tag color='blue'>常規</Tag><Tag color='blue'>帳號問題</Tag>
                            </div>
                            <div className='mt'>
                                進度：
                                <Progress percent={100}/>
                            </div>
                        </Card>
                        <Card title='報修處理' extra={<a href='#'>詳情</a>} className='mt'>
                            <p>描述：A1幢寫字樓電梯維護</p>
                            <p className='mt'>創建者：行政部-金強</p>
                            <div className='mt'>
                                日期：<Tag>2024-04-17</Tag>
                            </div>
                            <div className='mt'>
                                <Tag color='blue'>常規</Tag><Tag color='blue'>物業問題</Tag>
                            </div>
                            <div className='mt'>
                                進度：
                                <Progress percent={100}/>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
}

export default Personal