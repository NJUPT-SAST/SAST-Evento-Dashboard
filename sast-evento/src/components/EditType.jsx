import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "@douyinfe/semi-ui";


function EditType(props) {
    const [visible, setVisible] = useState(false)
    function show() {
        setVisible(true)
    }
    const handleOk = () => {
        setVisible(false);
        //添加一个接口
    };
    const handleCancel = () => {
        setVisible(false);
    };

    const handleValue = (value) => {
        if (value === '允许') { return 'true' }
        else return 'false'
    }

    return (
        <>
            <Button onClick={show}>编辑</Button>
            <Modal
                visible={visible}
                onOk={handleOk}
                // afterClose={handleAfterClose} //>=1.16.0
                onCancel={handleCancel}
                closeOnEsc={true}
            >
                <h3 style={{ textAlign: 'center', fontSize: 24, margin: 40 }}>修改活动类型</h3>
                <Form
                    style={{padding:10,width:'100%'}} 
                >
                    <Row>
                        <Col span={12} >
                            <Form.Input field="name" label='类型' style={{width:'90%'}} initValue={props.data.typeName} />
                        </Col>
                        <Col span={12}>
                            <Form.Select field="link" label='选择' style={{width:'90%'}} initValue={handleValue(props.data.allowConflict)}>
                                <Form.Select.Option value='true'>允许</Form.Select.Option>
                                <Form.Select.Option value='false'>禁止</Form.Select.Option>
                            </Form.Select>
                        </Col>
                    </Row>
                </Form>
            </Modal>

        </>
    )
}

export default EditType;