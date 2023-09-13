import React, { useState } from 'react';
import { SideSheet, Button, Form, Col, Row, DatePicker, Select } from '@douyinfe/semi-ui';
import { TreeSelect } from 'antd';


//自定义的活动类型
const option2 = ['活动1', '活动2', '活动3']
const type = option2.map((option, index) => ({
    label: option,
    value: index + 1,
}));


//对活动组别的数据处理
const responseData = [
    {
        "id": 1,
        "departmentName": "asdasd"
    },
    {
        "id": 1097,
        "departmentName": "Song Zhiyuan"
    },
    {
        "id": 1098,
        "departmentName": "Miguel Thomas"
    },
    {
        "id": 1099,
        "departmentName": "Tam Fu Shing"
    },
    {
        "id": 1100,
        "departmentName": "Sheila Mendoza"
    },
    {
        "id": 1101,
        "departmentName": "Yokoyama Seiko"
    },
    {
        "id": 1102,
        "departmentName": "Hsuan Yu Ling"
    },
    {
        "id": 1103,
        "departmentName": "Siu Tsz Ching"
    },
    {
        "id": 1104,
        "departmentName": "Peng Ziyi"
    },
    {
        "id": 1105,
        "departmentName": "Grace Ward"
    },
    {
        "id": 1106,
        "departmentName": "Yung Hui Mei"
    }
]
const transformedData = responseData.map(({ id, departmentName }) => ({
    value: id,
    label: departmentName
}));



function PutEvent(props) {
    const initDepartment=(values)=>{
        const departments=[];
        for(var i=0;i<values.length;i++){
            departments.push(values[i].id)
        }
        return departments
    }
    var postdata

    //用于Select组件搜索
    const searchLabel = (sugInput, option) => {
        let label = option.label.toUpperCase();
        let sug = sugInput.toUpperCase();
        return label.includes(sug);
    }

    const [visible, setVisible] = useState(false);
    //活动地点(树结构)
    const [treeData, setTreeData] = useState(
        [
            {
                "children": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "label": "Curtis Silva",
                                        "value": "6",
                                        "key": "6"
                                    },
                                    {
                                        "label": "Alexander Vargas",
                                        "value": "7",
                                        "key": "7"
                                    },
                                    {
                                        "label": "Sheh Sum Wing",
                                        "value": "8",
                                        "key": "8"
                                    },
                                    {
                                        "label": "Kudo Ryota",
                                        "value": "9",
                                        "key": "9"
                                    },
                                    {
                                        "label": "Kojima Eita",
                                        "value": "10",
                                        "key": "10"
                                    }
                                ],
                                "label": "Jamie King",
                                "value": "2",
                                "key": "2"
                            },
                            {
                                "label": "Ng Wing Sze",
                                "value": "3",
                                "key": "3"
                            },
                            {
                                "label": "Wong Chieh Lun",
                                "value": "4",
                                "key": "4"
                            },
                            {
                                "label": "Kudo Akina",
                                "value": "5",
                                "key": "5"
                            }
                        ],
                        "label": "Norma Stephens",
                        "value": "1",
                        "key": "1"
                    }
                ],
                "label": "root",
                "value": "0",
                "key": "0"
            }
        ]
    )

    const change = () => {
        setVisible(!visible);
    };

    const handleSubmit = () => {
        console.log(postdata);
        //调用编辑活动的接口
        setVisible(false)
    }

    const footer = (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleSubmit} theme="solid">确认修改</Button>
        </div>
    )

    return (
        <>
            <Button theme="borderless" onClick={change}>编辑活动</Button>
            <SideSheet
                title="编辑活动信息" visible={visible} onCancel={change}
                footer={footer}
                width='40vw'
                headerStyle={{ borderBottom: '1px solid var(--semi-color-border)' }}
                bodyStyle={{ borderBottom: '1px solid var(--semi-color-border)' }}
            >
                <Form
                    onValueChange={values => { postdata = values }}>
                    <Row>
                        <Col span={12}>
                            <Form.Input
                                initValue={props.record.title}
                                field="title"
                                label="标题"
                                trigger="blur"
                                placeholder="添加标题"
                                style={{ width: '90%' }}
                            />
                        </Col>
                        <Col span={12}>
                            <Form.Input
                                initValue={props.record.tag}
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
                                initValue={[props.record.gmtEventStart, props.record.gmtEventEnd]}
                                type="dateTimeRange"
                                field="EventTime"
                                label="活动时间"
                                trigger="blur"
                                insetInput
                                style={{ width: '90%' }}
                            />
                        </Col>
                        <Col span={12}>
                            <Form.DatePicker
                                initValue={[props.record.gmtRegistrationStart,props.record.gmtRegistrationEnd]}
                                type="dateTimeRange"
                                field="RegistrationTime"
                                label="报名时间"
                                trigger="blur"
                                insetInput
                                style={{ width: '90%' }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Select
                                multiple
                                initValue={initDepartment(props.record.departments)}
                                maxTagCount={1}
                                filter={searchLabel}
                                field='departments'
                                label="活动组别"
                                trigger='blur'
                                placeholder='选择活动组别'
                                style={{ width: '90%' }}
                                optionList={transformedData}
                            />
                        </Col>
                        <Col span={12}>
                            <Form.Select
                                initValue={props.record.eventType.id}
                                filter={searchLabel}
                                field='typeId'
                                label="活动类型"
                                trigger='blur'
                                placeholder="选择活动类型"
                                style={{ width: '90%' }}
                                optionList={type} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.TreeSelect
                                filterTreeNode
                                field='locationId'
                                label="活动地点"
                                trigger='blur'
                                placeholder="选择活动地点"
                                style={{ width: '90%' }}
                                treeData={treeData} />
                        </Col>
                    </Row>
                    <Row>
                        <Form.TextArea
                            initValue={props.record.description}
                            field='description'
                            label='活动介绍'
                            trigger='blur'
                            placeholder="请简单地描述一下活动喵"
                        />
                    </Row>
                </Form>
            </SideSheet>
        </>
    );
}

export default PutEvent