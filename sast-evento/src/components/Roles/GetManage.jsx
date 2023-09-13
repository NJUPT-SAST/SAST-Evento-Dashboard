import React,{useState} from "react";
import { Button,SideSheet,Table,Space} from "@douyinfe/semi-ui";
import AddManager from "./AddManager";
import DeleteManager from "./DeleteManager";
import PutManager from "./PutManager";


function GetManager(props){
    const [visible,setVisible]=useState(false)
    const [eventid,setEventid]=useState(props.id)
    const [data,setData]=useState(
        [
            {
              "userId": null,
              "studentId": "B2207xxxx",
              "openId": null
            },
            {
              "userId": null,
              "studentId": "B22011111",
              "openId": null
            }
          ]
    )
    const change=()=>{
        setVisible(!visible)
    }

    const columns=[
        {
            title:'学号',
            dataIndex:'studentId',
        },
        {
            title: '权限操作',
            dataIndex: 'operate',
            render: (_, record) => (
                <Space>
                   <PutManager eventid={eventid} userId={record.studentId}/>
                   <DeleteManager eventid={eventid} userId={record.studentId}/>
                </Space>
            )
        }
    ]
    return(
        <>
            <Button theme="borderless" onClick={change}>活动权限</Button>
            <SideSheet title={props.title} visible={visible} onCancel={change} width='40wv'>
                <AddManager eventid={eventid}/>
                <Table columns={columns} dataSource={data} pagination={true}/>
            </SideSheet>
        </>
    )
}

export default GetManager;