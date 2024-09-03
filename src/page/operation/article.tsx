import { Modal, Row, Col, Form, Input, Radio, message, Card, DatePicker,Button } from "antd"

function Articles() {
    const [form] = Form.useForm()
    const config = {
        rules: [{ type: 'object' as const, required: true, message: 'Please select time!' }],
    };
    return <div>
        <Card>
            <Form
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label='文章標題'
                            name='title'
                            rules={[{ required: true, message: '文章標題不能為空' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label='副標題'
                            name='subTitle'
                            rules={[{ required: true, message: '副標題不能為空' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="date-picker"
                            label="發布時間"
                            rules={[{ type: 'object' as const, required: true, message: '請選擇日期' }]}
                        >
                            <DatePicker />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label='可見範圍'
                            name='visible'
                            rules={[{ required: true, message: '可見範圍不能為空' }]}
                        >
                            <Radio.Group>
                                <Radio value='1'>所有</Radio>
                                <Radio value='2'>物業</Radio>
                                <Radio value='3'>公司</Radio>
                            </Radio.Group>

                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="bio" label="文章內容" rules={[{ required: true }]}>
                            <Input.TextArea rows={6} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Card>
    </div>
}

export default Articles