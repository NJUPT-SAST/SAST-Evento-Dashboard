import React from "react";
import { TreeSelect } from 'antd';
import { useState } from "react";
const { SHOW_CHILD } = TreeSelect;



//获取选项
function TreeRoles() {
    const [data, setData] = useState(
        [
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
                        "title": "以树结构获取所有manager权限",
                        "value": "getAllManagerPermissionsAsTree"
                    },
                    {
                        "title": "获取所有manager权限",
                        "value": "getAllManagerPermissions"
                    },
                    {
                        "title": "获取用户对某活动manager权限",
                        "value": "getUserManagerPermissions"
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
                    },
                    {
                        "title": "获取用户对某活动manager的权限(字符串)",
                        "value": "getUserManagerPermissAsList"
                    }
                ],
                "title": "default",
                "value": "default"
            }
        ]
    )
    const treeData = data
    // const getRoles = (values) => {
    //     const children = values.filter(v => treeData.find(td => td.value === v).children);
    //     console.log(children); 
    //   }

    const [value, setValue] = useState(['getUserManagerPermissAsList',"putEvent"]);
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
