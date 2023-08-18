import React from "react";
import { Table,Space } from "@douyinfe/semi-ui";
import DeleteType from "./DeleteType";
import EditType from "./EditType";

function TypeList(){
    const columns=[
        {
          title:'类型',
          dataIndex:'type'  
        },
        {
            title:'冲突与否',
            dataIndex:'Conflict'
        },
        {
            title: '操作',
            dataIndex: 'operate',
            render: (_, record) => (
                //两个按钮删除 编辑 
                <Space>
                    <EditType data={record} />
                    <DeleteType />
                </Space>
            )
        }
    ]

    const data=[
        {
            key:'1',
            type:'软研部前端组',
            Conflict:'允许',
        },
        {
            key:'2',
            type:'软研部后端组',
            Conflict:'允许',
        },
    ]

    return(
        <>
           <Table columns={columns} dataSource={data} pagination={false}/> 
        </>
    )
}

export default TypeList