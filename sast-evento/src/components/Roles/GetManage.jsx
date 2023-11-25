import React,{useEffect, useState} from "react";
import { Button,SideSheet,Table,Space} from "@douyinfe/semi-ui";
import AddManager from "./AddManager";
import DeleteManager from "./DeleteManager";
import PutManager from "./PutManager";
import { getManagers } from "../../utils/event";


function GetManager(props){
    const [visible,setVisible]=useState(false)
    const [data,setData]=useState([])
    const change=()=>{
        setVisible(!visible)
    }

    const columns=[
        {
            title:'学号',
            dataIndex:'userId',
        },
        {
            title: '权限操作',
            dataIndex: 'operate',
            render: (_, record) => (
                <Space>
                   <PutManager eventid={props.id} userId={record.userId} />
                   <DeleteManager eventid={props.id} userId={record.userId} setData={setData}/>
                </Space>
            )
        }
    ]

    useEffect(()=>{
        getManagers(props.id)
        .then(res=>{setData(res.data.data)})
    },[])
    return(
        <>
            <Button theme="borderless" onClick={change}>活动权限</Button>
            <SideSheet title={props.title} visible={visible} onCancel={change} width='40wv'>
                <AddManager eventid={props.id} setData={setData}/>
                <Table columns={columns} dataSource={data} pagination={true}/>
            </SideSheet>
        </>
    )
}

export default GetManager;