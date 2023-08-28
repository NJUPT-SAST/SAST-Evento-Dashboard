import React, { useState } from 'react';
import { SideSheet, Button, Form, Col, Row, DatePicker, Select } from '@douyinfe/semi-ui';
import { TreeSelect } from 'antd';


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

const responseData=[
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

function AddEvent() {
    const searchLabel=(sugInput,option)=>{
        let label = option.label.toUpperCase();
        let sug = sugInput.toUpperCase();
        return label.includes(sug);
    }

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
                                filter={searchLabel}
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
                                filter={searchLabel}
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
                        <Col span={12}>
                            <Form.Select
                            multiple
                            maxTagCount={1}
                            filter={searchLabel}
                            field='department'
                            label="活动组别"
                            trigger='blur'
                            placeholder='选择活动组别'
                            style={{ width: '90%' }}
                            optionList={transformedData}
                            />
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