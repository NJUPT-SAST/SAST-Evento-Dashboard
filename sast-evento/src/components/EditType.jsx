import React,{useState} from "react";
import {Button,Modal,Form} from "@douyinfe/semi-ui";


function EditType(props){
    const [visible,setVisible]=useState(false)
    function show(){
        setVisible(true)
    } 
    const handleOk = () => {
        setVisible(false);
        //添加一个接口
    };
    const handleCancel = () => {
        setVisible(false);
    };

    const handleValue=(value)=>{
        if(value==='允许'){return 'true'}
        else return 'false'
    }

    return(
        <>
            <Button onClick={show}>编辑</Button>      
            <Modal
                visible={visible}
                onOk={handleOk}
                // afterClose={handleAfterClose} //>=1.16.0
                onCancel={handleCancel}
                closeOnEsc={true}
            >
               <h3 style={{ textAlign: 'center', fontSize: 24, margin: 40 }}>修改活动类型</h3> 
               <Form
                    wrapperCol={{span:20}}
                    labelCol={{span:3}}
                    labelPosition="top"
                    labelAlign="right"
                >
                    <Form.Input field="name" label='类型'  style={{width:200}} initValue={props.data.type}/>
                    <Form.Select field="link" label='选择'  style={{width:200}} initValue={handleValue(props.data.Conflict)}>
                        <Form.Select.Option value='true'>允许</Form.Select.Option>
                        <Form.Select.Option value='false'>禁止</Form.Select.Option>
                    </Form.Select>
                </Form>
            </Modal>

        </>
    )
}

export default EditType;