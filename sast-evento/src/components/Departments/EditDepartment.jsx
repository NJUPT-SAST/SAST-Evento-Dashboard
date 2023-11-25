import React from "react"
import { Modal, Button, Input } from '@douyinfe/semi-ui';
import { useState } from "react";
import { IconEditStroked } from '@douyinfe/semi-icons';
import { putDepartment,getDepartments } from "../../utils/departments";


function EditDepartment(props) {
    const [visible, setVisible] = useState(false);
    const showDialog = () => {
        setVisible(true);
    };
    const handleOk = () => {
        setVisible(false);
        
        putDepartment(props.record.id,props.record.departmentName)
        .then(response=>{
            getDepartments()
            .then(res=>{props.setData(res.data.data)})
        })
    };
    const handleCancel = () => {
        setVisible(false);
    };

    const getdepartment=(value)=>{
        props.record.departmentName=value
    }

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

            <Button size="small" theme="solid" onClick={showDialog}>修改</Button>
            <Modal
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={footer}
                closeOnEsc={true}
            >
                <h3 style={{ textAlign: 'center', fontSize: 20, margin: 40 }}>修改组别</h3>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Input
                        style={{ width: '320px' }}
                        placeholder="输入新组别" prefix={<IconEditStroked />}
                        onChange={getdepartment}
                    ></Input>
                </div>
            </Modal>
        </>
    )
}

export default EditDepartment 