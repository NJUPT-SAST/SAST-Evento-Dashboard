import React,{useState} from "react"
import { Modal, Button,Form,Col,Row,Input, Select } from '@douyinfe/semi-ui';

function AddType() {
    const [visible, setVisible] = useState(false);
    const showDialog = () => {
        setVisible(true);
    };
    const handleOk = () => {
        setVisible(false);
        //调用添加活动类型的接口
    };
    const handleCancel = () => {
        setVisible(false);
    };
    return (
        <>
            <Button style={{marginBottom:20}} onClick={showDialog}>新增</Button>
            <Modal
                title="添加活动类型"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                closeOnEsc={true}
            >
                <Form
                   style={{padding:10,width:'100%'}} 
                >
                    <Row>
                        <Col span={12}>
                            <Input placeholder={'添加活动类型'} style={{width:'90%'}}/>
                        </Col>
                        <Col span={12}>
                            <Select placeholder={'时间冲突性'} style={{width:'90%'}}>
                                <Select.Option value={'true'}>允许</Select.Option>
                                <Select.Option value={'false'}>禁止</Select.Option>
                            </Select>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}

export default AddType