import React,{useState} from "react";
import { Modal,Button } from "@douyinfe/semi-ui";


function DeleteEvent(){
    const [visible,setVisible]=useState(false)
    const showMoadl=()=>{
        setVisible(true)
    }

    const handleOk=()=>{
        //调用删除活动接口
        setVisible(false);
    }

    const handleCancel=()=>{
        setVisible(false);
    }
    return(
        <>

            <Button onClick={showMoadl} theme="borderless" type="danger">删除活动</Button>
            <Modal
                title="删除活动" 
                maskClosable={false}
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <span>你确定要删除活动嘛？</span>
            </Modal> 
        </>
    )
}

export default DeleteEvent;