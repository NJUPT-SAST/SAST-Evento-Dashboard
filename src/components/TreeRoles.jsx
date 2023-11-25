import React, { useEffect } from "react";
import { TreeSelect } from 'antd';
import { useState } from "react";
const { SHOW_CHILD } = TreeSelect;



//获取选项
function TreeRoles() {
    const [treeData, setData] = useState([])

    //请求接口
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
        console.log(newValue);
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


    return (
        <>
            <TreeSelect
                {...tProps}
            />
        </>
    )
}

export default TreeRoles
