import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "@douyinfe/semi-ui";
import { updataType, getTypes } from "../utils/types";


function UpdateType(props) {
    const [visible, setVisible] = useState(false)
    var updata
    function show() {
        setVisible(true)
    }
    const handleOk = () => {
        setVisible(false);
        updataType(props.data.id, updata.typeName, updata.allowConflict)
            .then(response => {
                getTypes()
                    .then((res) => {
                        props.setData(res.data.data)
                    })
            })
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
                    style={{ padding: 10, width: '100%' }}
                    onValueChange={values => { updata = values }}
                >
                    <Row>
                        <Col span={12} >
                            <Form.Input field="typeName" label='类型' style={{ width: '90%' }} initValue={props.data.typeName} />
                        </Col>
                        <Col span={12}>
                            <Form.Select field="allowConflict" label='选择' style={{ width: '90%' }} initValue={handleValue(props.data.allowConflict)}>
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

export default UpdateType;