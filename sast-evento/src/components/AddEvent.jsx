import React, { useState } from 'react';
import { SideSheet, Button, Form, Col, Row, DatePicker, Select } from '@douyinfe/semi-ui';
import { TreeSelect } from 'antd';





const treeData = [
    {
        value: 'parent 1',
        title: 'parent 1',
        children: [
            {
                value: 'parent 1-0',
                title: 'parent 1-0',
                children: [
                    {
                        value: 'leaf1',
                        title: 'leaf1',
                    },
                    {
                        value: 'leaf2',
                        title: 'leaf2',
                    },
                ],
            },
            {
                value: 'parent 1-1',
                title: 'parent 1-1',
                children: [
                    {
                        value: 'leaf3',
                        title: (
                            <b
                                style={{
                                    color: '#08c',
                                }}
                            >
                                leaf3
                            </b>
                        ),
                    },
                ],
            },
        ],
    },
];

const option1 = ['教学楼', '大活会客厅', '大活中区']
const option2 = ['活动1', '活动2', '活动3']

const location = option1.map((option, index) => ({
    label: option,
    value: index + 1,
}));

const type = option2.map((option, index) => ({
    label: option,
    value: index + 1,
}));


function AddEvent() {

    const treeData = [{ "label": "test0", "key": "0", "children": [{ "label": "test4", "key": "4", "children": [{ "label": "test1", "key": "1", "value": "1" }, { "label": "test2", "key": "2", "value": "2" }, { "label": "test3", "key": "3", "value": "3" }], "value": "4" }, { "label": "test5", "key": "5", "value": "5" }], "value": "0" }]

    const [value, setValue] = useState();

    const onChange = (newValue) => {
        console.log(newValue);
        setValue(newValue);
    };

    const [visible, setVisible] = useState(false);
    const change = () => {
        setVisible(!visible);
    };

    const getLocation = (value) => {
        console.log(value);
    }

    const getType = (value) => {
        console.log(value);
    }

    const getDescription = (value) => {
        console.log(value);
    }

    const footer = (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={() => setVisible(false)} theme="solid">确认发起</Button>
        </div>
    )

    return (
        <>
            <Button theme='solid' className='button' onClick={change}>发起活动</Button>
            <SideSheet
                title="发起新的活动" visible={visible} onCancel={change}
                footer={footer}
                headerStyle={{ borderBottom: '1px solid var(--semi-color-border)' }}
                bodyStyle={{ borderBottom: '1px solid var(--semi-color-border)' }}
            >
                <Form
                >
                    <Row>
                        <Col span={12}>
                            <Form.Input
                                field="title"
                                label="标题"
                                trigger="blur"
                                placeholder="添加标题"
                                style={{ width: '90%' }}
                            />
                        </Col>
                        <Col span={12}>
                            <Form.Input
                                field="tag"
                                label="标签"
                                trigger="blur"
                                placeholder="添加标签"
                                style={{ width: '90%' }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.DatePicker
                                type="dateRange"
                                field="活动时间"
                                trigger="blur"
                                // placeholder="选择日期"
                                style={{ width: '90%' }}
                            />
                        </Col>
                        <Col span={12}>
                            <Form.DatePicker
                                type="dateRange"
                                field="报名时间"
                                trigger="blur"
                                // placeholder="选择日期"
                                style={{ width: '90%' }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Select
                                field='location'
                                label="活动地点"
                                trigger='blur'
                                placeholder="选择活动地点"
                                style={{ width: '90%' }}
                                onChange={getLocation}
                                optionList={location} />
                        </Col>
                        <Col span={12}>
                            <Form.Select
                                field='type'
                                label="活动类型"
                                trigger='blur'
                                placeholder="选择活动类型"
                                style={{ width: '90%' }}
                                onChange={getType}
                                optionList={type} />
                        </Col>
                    </Row>
                    <Row>
                        <Form.TextArea
                            field='description'
                            label='活动介绍'
                            trigger='blur'
                            placeholder="请简单地描述一下活动喵"
                            onChange={getDescription}
                        />
                    </Row>
                </Form>
            </SideSheet>
        </>
    );
}

export default AddEvent