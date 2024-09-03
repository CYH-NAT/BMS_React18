import { Modal, Row, Col, Form, Input, Radio, message } from "antd"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { editUser } from "../../api/users"

interface FormProps {  //這個組件可以接收的屬性
    visible: boolean,
    hideModal: () => void,
    title: string,
    loadData:()=>void
}

function UserForm(props: FormProps) {
    const { visible, hideModal, title,loadData } = props
    // 由父組件來決定是否開啟彈窗
    //需在父組件設計關閉彈窗的方法，由子組件接收

    const [form]=Form.useForm()
    
    const {userData}=useSelector((state:any)=>state.userSlice) //切片中的數據導出

    const handleOk=()=>{
        form.validateFields().then(async(res)=>{   //表單校驗也是個pormise
            const {data}= await editUser(res)
            message.success(data)
            hideModal() //點ok之後要關閉視窗
            loadData()
        }).catch((err)=>{console.log(err)})
    }

    useEffect(() => {
        console.log('彈窗組件更新囉')
        //子組件無法直接追縱props是否更新，預設是只要父組件有變動就會更新
        
        title=='新增企業'?form.resetFields():form.setFieldsValue(userData)
        //判斷點擊的按鈕是什麼，點新增企業的話要先清空表單
    },[visible])

    return <>
        <Modal
            title={title}
            open={visible}
            onCancel={hideModal}
            width={800}
            onOk={handleOk}
        >
            <Form
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label='客戶名稱'
                            name='name'
                            rules={[{ required: true, message: '客戶名稱不能為空' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label='聯絡電話'
                            name='tel'
                            rules={[{ required: true, message: '聯絡電話不能為空' }, { pattern: /^1[3-9]\d{9}$/, message: '請輸入有效的手機號碼' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label='經營狀態'
                            name='status'
                            rules={[{ required: true, message: '經營狀態不能為空' }]}
                        >
                            <Radio.Group>
                                <Radio value='1'>營業中</Radio>
                                <Radio value='2'>暫停營業</Radio>
                                <Radio value='3'>已關閉</Radio>
                            </Radio.Group>

                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label='所屬行業'
                            name='business'
                            rules={[{ required: true, message: '所屬行業不能為空' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label='電郵'
                            name='email'
                            rules={[{ required: true, message: '電子郵件不能為空' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label='統一信用代碼'
                            name='creditCode'
                            rules={[{ required: true, message: '統一信用代碼不能為空' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label='工商註冊號'
                            name='industryNum'
                            rules={[{ required: true, message: '工商註冊號不能為空' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label='組織機構代碼'
                            name='organizationCode'
                            rules={[{ required: true, message: '組織機構代碼不能為空' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label='法人名'
                            name='legalPerson'
                            rules={[{ required: true, message: '法人名不能為空' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    </>
}

export default UserForm