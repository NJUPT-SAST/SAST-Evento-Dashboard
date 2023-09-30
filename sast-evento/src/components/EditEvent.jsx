import React, { useState,useEffect } from 'react';
import { SideSheet, Button, Form, Col, Row, DatePicker, Select } from '@douyinfe/semi-ui';
import { getDepartments } from '../utils/departments';
import { getLocations } from '../utils/location';
import { getTypes } from '../utils/types';
import { TreeSelect } from 'antd';


//自定义的活动类型
const option2 = ['活动1', '活动2', '活动3']
const type = option2.map((option, index) => ({
    label: option,
    value: index + 1,
}));





function PutEvent(props) {

    const [visible, setVisible] = useState(false);
    //活动地点(树结构)
    const [treeData, setTreeData] = useState([])
    const [departments,setDepartments]=useState([])
    const [type,setType]=useState([])


    //获取活动组别、小组并且进行处理
    const transformedData = departments.map(({ id, departmentName }) => ({
        value: id,
        label: departmentName
      }));

      const transformedType=type.map(({id,typeName})=>({
        value:id,
        label:typeName
      }))


    //组别的初始值
    const initDepartment=(values)=>{
        const departments=[];
        for(var i=0;i<values.length;i++){
            departments.push(values[i].id)
        }
        return departments
    }
    var editdata

    //用于Select组件搜索
    const searchLabel = (sugInput, option) => {
        let label = option.label.toUpperCase();
        let sug = sugInput.toUpperCase();
        return label.includes(sug);
    }

    const change = () => {
        setVisible(!visible);
    };

    const handleSubmit = () => {
        console.log(editdata);
        //调用编辑活动的接口
        setVisible(false)
    }

    const footer = (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleSubmit} theme="solid">确认修改</Button>
        </div>
    )

    //useEffect获取初始的组织、地点、类型
    useEffect(()=>{
        getDepartments()
        .then(res=>{
           setDepartments(res.data.data)
        })
        getLocations()
        .then(res=>{
            setTreeData(res.data.data)
        })
        getTypes()
        .then(res=>{
            setType(res.data.data)
        })
    },[])


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
                    onValueChange={values => { editdata = values }}>
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
                                optionList={transformedType} />
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