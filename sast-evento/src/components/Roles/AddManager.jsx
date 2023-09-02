import { Button, Modal, Input } from "@douyinfe/semi-ui"
import { useState, useEffect } from "react";
import React from "react";
import { TreeSelect } from 'antd';
import { IconPlusStroked } from '@douyinfe/semi-icons';
const { SHOW_CHILD } = TreeSelect;

function AddManager(props) {
    const [visible, setVisible] = useState(false)
    const [treeData, setData] = useState([])
    const [userId,setUserId] = useState()
    const [value, setValue] = useState([]);
    //获取userId
    const getuserId=(value)=>{
        setUserId(value)
    }

    //控制弹窗
    const showDialog = () => {
        setVisible(true);
    };

    //对多选树状选择的管理
    const onChange = (newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        setData([
            {
                "children": [
                    {
                        "title": "添加活动幻灯片",
                        "value": "addEventSlide"
                    },
                    {
                        "title": "删除活动管理者",
                        "value": "deleteManager"
                    },
                    {
                        "title": "删除活动幻灯片",
                        "value": "deleteEventSlide"
                    },
                    {
                        "title": "删除活动",
                        "value": "deleteEvent"
                    },
                    {
                        "title": "取消活动（部分修改活动信息）",
                        "value": "patchEvent"
                    },
                    {
                        "title": "添加活动管理者",
                        "value": "addManager"
                    },
                    {
                        "title": "编辑活动幻灯片",
                        "value": "patchEventSlide"
                    },
                    {
                        "title": "编辑活动管理者权限",
                        "value": "putManager"
                    },
                    {
                        "title": "修改活动",
                        "value": "putEvent"
                    }
                ],
                "title": "default",
                "value": "default"
            }
        ])
    }, [])
    const tProps = {
        maxTagCount: 1,
        treeData,
        value,
        onChange,
        treeCheckable: true,
        showCheckedStrategy: SHOW_CHILD,
        placeholder: 'Please select',
        style: {
            width: 300
        },
    };


    //对底边确认栏的布局

    const handleOk = () => {
        setVisible(false);
        console.log(props.eventid, value,userId);
        //调用添加活动地点的接口
    };
    const handleCancel = () => {
        setVisible(false);
    };
    const btnStyle = {
        width: 240,
        margin: '4px 50px',
    };
    const footer = (
        <div style={{ textAlign: 'center' }}>
            <Button type="primary" theme="solid" onClick={handleOk} style={btnStyle}>
                确认
            </Button>
            <Button type="primary" theme="borderless" onClick={handleCancel} style={btnStyle}>
                取消
            </Button>
        </div>
    )

    return (
        <>
            <Button onClick={showDialog}>添加管理员</Button>
            <Modal
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={footer}
                closeOnEsc={true}
            >
                <h3 style={{ textAlign: 'center', fontSize: 20, margin: 40 }}>添加管理员</h3>
                <div style={{ display: 'flex', justifyContent: 'center',marginBottom:'20px' }}>
                <Input
                        style={{ width: '300px' }} prefix={<IconPlusStroked />}
                        placeholder='请输入学号'
                        onChange={getuserId}
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <TreeSelect
                        {...tProps}
                    />
                </div>
            </Modal>
        </>
    )
}

export default AddManager