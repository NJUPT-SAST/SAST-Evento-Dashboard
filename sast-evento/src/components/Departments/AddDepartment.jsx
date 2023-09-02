import React,{useState} from "react";
import { Button,Input,Modal } from "@douyinfe/semi-ui";
import { IconPlusStroked } from '@douyinfe/semi-icons';

function AddDepartment(){
    const [visible, setVisible] = useState(false);
    let departmentName
    const showDialog = () => {
        setVisible(true);
    };
    const handleOk = () => {
        setVisible(false);
        console.log(departmentName);
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

    const getdepartment=(value)=>{
        departmentName=value
    }
    return(
        <>
        <Button onClick={showDialog}>添加组别</Button>
        <Modal
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={footer}
                closeOnEsc={true}
            >
                <h3 style={{ textAlign: 'center', fontSize: 20, margin: 40 }}>请输入组别名称</h3>
                <div style={{display:'flex',justifyContent:'center'}}>
                    <Input 
                    style={{ width: '320px' }} prefix={<IconPlusStroked />}
                    placeholder="添加小组"
                    onChange={getdepartment}
                    ></Input>
                </div>
            </Modal>
        </>
    )
}

export default AddDepartment