import { Button,Modal } from "@douyinfe/semi-ui"
import { useState } from "react";
import React, { useEffect } from "react";
import { TreeSelect } from 'antd';
const { SHOW_CHILD } = TreeSelect;


function PutManager(props){
    //对多选树的管理
    const [treeData, setData] = useState([])

    //请求接口获取其初始的权限
    useEffect(()=>{
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
    },[])
    // const treeData = data
    const [value, setValue] = useState(["putEvent"]);
    const onChange = (newValue) => {
        // console.log(newValue);
        setValue(newValue);
    };
    const tProps = {
        maxTagCount:1,
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




    const [visible, setVisible] = useState(false);
    const showDialog = () => {
        setVisible(true);
    };
    const handleOk = () => {
        setVisible(false);
        console.log(props.eventid,value,props.userId);
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
            <Button onClick={showDialog}>编辑</Button>
            <Modal
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={footer}
                closeOnEsc={true}
            >
                <h3 style={{ textAlign: 'center', fontSize: 20, margin: 40 }}>编辑权限</h3>
                <div style={{display:'flex',justifyContent:'center'}}>
                <TreeSelect
                {...tProps}
            />
                </div>
            </Modal>
        </>
    )
}

export default PutManager