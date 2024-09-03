import { Card, Row, Col, Statistic, Badge } from 'antd'


function All() {
    let arr=[]
    for(let i=0;i<14;i++){
        arr.push(['萬物科技有限公司','估值:8600(萬元)'])
    }
    return <div>
        <Row gutter={16}>
            <Col span={18}>
                <Card>
                    <Row>
                        <Col span={6}>
                            <Statistic title='文章總數' value='1,588' />
                        </Col>
                        <Col span={6}>
                            <Statistic title='意向客戶(戶)' value='235' />
                        </Col>
                        <Col span={6}>
                            <Statistic title='入住企業(家)' value='766' />
                        </Col>
                        <Col span={6}>
                            <Statistic title='園區用戶(人)' value='6,988' />
                        </Col>
                    </Row>
                </Card>
                <Row gutter={16} className='mt'>
                    <Col span={12}>
                        <Card>
                            <Card title='待辦事項' extra={<a href='#'>{`更多>`}</a>}>
                                <div className='clearfix'>
                                    <Badge className='fl' color="cyan" text="契約簽訂待處理" />
                                    <p className='fr' style={{ color: 'gray' }}>2024-01-02</p>
                                </div>
                                <div className='clearfix'>
                                    <Badge className='fl' color="cyan" text="充電樁維修報修" />
                                    <p className='fr' style={{ color: 'gray' }}>2024-03-12</p>
                                </div>
                                <div className='clearfix'>
                                    <Badge className='fl' color="cyan" text="空調使用費統一徵收" />
                                    <p className='fr' style={{ color: 'gray' }}>2024-03-22</p>
                                </div>
                                <div className='clearfix'>
                                    <Badge className='fl' status="default" text="租戶物業費催繳" />
                                    <p className='fr' style={{ color: 'gray' }}>2024-04-01</p>
                                </div>
                                <div className='clearfix'>
                                    <Badge className='fl' status="default" text="潛在意向客戶跟訪" />
                                    <p className='fr' style={{ color: 'gray' }}>2024-04-07</p>
                                </div>
                                <div className='clearfix'>
                                    <Badge className='fl' status="default" text="園區保潔注意事項" />
                                    <p className='fr' style={{ color: 'gray' }}>2024-05-02</p>
                                </div>
                            </Card>
                        </Card>

                    </Col>
                    <Col span={12}>
                        <Card>
                            <Card title='最新動態' extra={<a href='#'>{`更多>`}</a>}>
                                <div className='clearfix'>
                                    <Badge className='fl' color="red" text="同心共建經濟圈，更上層樓開新..." />
                                    <p className='fr' style={{ color: 'gray' }}>2024-01-02</p>
                                </div>
                                <div className='clearfix'>
                                    <Badge className='fl' color="red" text="我區十個重大工業投資項目集中..." />
                                    <p className='fr' style={{ color: 'gray' }}>2024-03-12</p>
                                </div>
                                <div className='clearfix'>
                                    <Badge className='fl' color="red" text="新能源新政策發布，究竟是好是..." />
                                    <p className='fr' style={{ color: 'gray' }}>2024-03-22</p>
                                </div>
                                <div className='clearfix'>
                                    <Badge className='fl' status="default" text="園區內的事故究竟要如何定責任..." />
                                    <p className='fr' style={{ color: 'gray' }}>2024-04-01</p>
                                </div>
                                <div className='clearfix'>
                                    <Badge className='fl' status="default" text="關於充電樁使用的重要通知，長..." />
                                    <p className='fr' style={{ color: 'gray' }}>2024-04-07</p>
                                </div>
                                <div className='clearfix'>
                                    <Badge className='fl' status="default" text="關於充電樁使用的重要通知，長..." />
                                    <p className='fr' style={{ color: 'gray' }}>2024-05-02</p>
                                </div>
                            </Card>
                        </Card>
                    </Col>
                </Row>
            </Col>
            <Col span={6}>
                <Card title='優質企業排名'>
                    {arr.map((item,index)=>{
                    return <div
                            style={{display:'flex',flexFlow:'nowrap',justifyContent:'space-between'}}>
                                <p>{index+1}:{item[0]}</p>
                                <p>{item[1]}</p>
                            </div>
                            })}
                </Card>
            </Col>
        </Row>
    </div>
}

export default All