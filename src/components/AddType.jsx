import React, { useState } from "react"
import { Modal, Button, Form, Col, Row } from '@douyinfe/semi-ui';
import { addType, getTypes } from "../utils/types";



function AddType(props) {
    var postdata
    const [visible, setVisible] = useState(false);
    const showDialog = () => {
        setVisible(true);
    };
    const handleOk = () => {
        setVisible(false);
        addType(postdata)
            .then((response) => {
                getTypes()
                    .then((res) => {
                        props.setData(res.data.data)
                    })
            })
        //调用添加活动类型的接口
    };
    const handleCancel = () => {
        setVisible(false);
    };

    const list = [
        { value: 'true', label: "允许" },
        { value: 'false', label: "禁止" }
    ]
    return (
        <>
            <Button style={{ marginBottom: 20 }} onClick={showDialog}>新增</Button>
            <Modal
                title="添加活动类型"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                closeOnEsc={true}
            >
                <Form
                    onValueChange={values => { postdata = values }}
                    style={{ padding: 10, width: '100%' }}
                >
                    <Row>
                        <Col span={12}>
                            <Form.Input
                                label="类型名"
                                field="typeName"
                                style={{ width: '90%' }}
                                trigger="blur"
                                placeholder={'添加活动类型'}
                            />
                            {/* <Input placeholder={'添加活动类型'} style={{width:'90%'}}/> */}
                        </Col>
                        <Col span={12}>
                            <Form.Select
                                label="能否冲突"
                                field="allowConflict"
                                style={{ width: '90%' }}
                                trigger="blur"
                                placeholder={'是否允许冲突'}
                                optionList={list}
                            />
                            {/* <Select placeholder={'时间冲突性'} style={{width:'90%'}}>
                                <Select.Option value={'true'}>允许</Select.Option>
                                <Select.Option value={'false'}>禁止</Select.Option>
                            </Select> */}
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}

export default AddType