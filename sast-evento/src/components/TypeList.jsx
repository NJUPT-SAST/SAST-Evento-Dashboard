import React from "react";
import { Table,Space,Tag} from "@douyinfe/semi-ui";
import DeleteType from "./DeleteType";
import UpdateType from "./EditType";
import AddType from "./AddType";

function TypeList(){
    const columns=[
        {
          title:'类型',
          dataIndex:'typeName',
          align: "center",  
        },
        {
            title:'能否冲突',
            dataIndex:'allowConflict',
            align: "center",
            render: function (allowConflict) {
                if (allowConflict) { return <Tag color='green'>允许</Tag> }
                else {
                  return <Tag color='red'>禁止</Tag>
                }
              }
        },
        {
            title: '操作',
            dataIndex: 'operate',
            align: "center",
            render: (_, record) => (
                //两个按钮删除 编辑 
                <Space>
                    <UpdateType data={record} />
                    <DeleteType typeId={record.typeId}/>
                </Space>
            )
        }
    ]

    const data=[
        {
            "id": 1,
            "typeName": "红能国给民打色",
            "allowConflict": false
        }
    ]

    return(
        <>
                <AddType/>
           <Table columns={columns} dataSource={data} pagination={false}/> 
        </>
    )
}

export default TypeList