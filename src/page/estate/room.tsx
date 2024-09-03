import { Card, Row, Col, Image, Radio, Spin } from "antd"
import { useEffect, useState } from "react";
import { getRoomList } from "../../api/room";
import './index.scss'
import { RadioChangeEvent } from "antd/lib";
import roomPic from '../../assets/roomPic.jpg'

interface RoomType {
    roomNumber: number,
    decorationType: '毛坯' | '精裝',
    area: number,
    unitPrice: number,
    src: string
}

function Room() {
    const [visible, setVisible] = useState<boolean>(false)
    //image組件的效果和彈窗差不多，都要寫在組件裡，平時隱藏起來
    const [room, setRoom] = useState<RoomType[]>([])
    const [src, setSrc] = useState<string>(roomPic)
    const [loading,setLoading]=useState<boolean>(false)

    const loadRoom = async (roomid: string) => {
        setLoading(true)
        const { data: { rooms } } = await getRoomList(roomid)
        setLoading(false)
        setRoom(rooms)
    }

    useEffect(() => { loadRoom('a1') }, [])

    const handleChange = (e: RadioChangeEvent) => {
        const roomid: string = e.target.value;
        loadRoom(roomid)
    }

    const showImage = (src: string) => {
        setSrc(src)
        setVisible(true)
    }
    return <div className="room">
        <Image
            width={200}
            style={{ display: 'none' }}
            preview={{
                visible,
                src,  //把點擊到的圖加載到此圖片彈窗
                onVisibleChange: (value) => {
                    setVisible(value);
                },
            }}
        />
        <Card className="mb">
            <Radio.Group defaultValue='a1' optionType="button" buttonStyle="solid" onChange={handleChange}>
                <Radio.Button value='a1'>A1幢寫字樓</Radio.Button>
                <Radio.Button value='a2'>A2幢寫字樓</Radio.Button>
                <Radio.Button value='b1'>B1幢寫字樓</Radio.Button>
                <Radio.Button value='b2'>B2幢寫字樓</Radio.Button>
                <Radio.Button value='c1'>C1幢寫字樓</Radio.Button>
                <Radio.Button value='c2'>C2幢寫字樓</Radio.Button>
                <Radio.Button value='d1'>天匯國際大廈</Radio.Button>
                <Radio.Button value='d2'>時代金融廣場</Radio.Button>

            </Radio.Group>
        </Card>
        <Spin spinning={loading /* 包住的部份在spining為true的時候會轉圈*/}>
            <Row gutter={16}>
                {/* <Col span={6} className="item">
                <Card title='房間號' extra={<a onClick={() => setVisible(true)}>戶型圖</a>}>
                    <h1>201</h1>
                    <div className="clearfix mt">
                        <p className="fl">裝修狀況：</p>
                        <p className="fr">毛坯</p>
                    </div>
                    <div className="clearfix mt">
                        <p className="fl">房間面積</p>
                        <p className="fr">100</p>
                    </div>
                    <div className="clearfix mt">
                        <p className="fl">出租單價</p>
                        <p className="fr">100</p>
                    </div>
                </Card>
            </Col> */}
                {
                    room.map((item) => {
                        return <>
                            <Col span={6} className="item">
                                <Card title='房間號' extra={<a onClick={() => showImage(item.src)}>戶型圖</a>}>
                                    <h1>{item.roomNumber}</h1>
                                    <div className="clearfix mt">
                                        <p className="fl">裝修狀況：</p>
                                        <p className="fr">{item.decorationType}</p>
                                    </div>
                                    <div className="clearfix mt">
                                        <p className="fl">房間面積</p>
                                        <p className="fr">{item.area}㎡</p>
                                    </div>
                                    <div className="clearfix mt">
                                        <p className="fl">出租單價</p>
                                        <p className="fr">{item.unitPrice}元/坪/日</p>
                                    </div>
                                </Card>
                            </Col>
                        </>
                    })
                }
            </Row>
        </Spin>
    </div>
}

export default Room