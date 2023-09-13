import React, { useState } from "react"
import { Modal, Button, Popover, Input } from '@douyinfe/semi-ui';
import { IconPlusStroked } from '@douyinfe/semi-icons';
import { postLocation } from "../utils/location";

function AddLocation(props) {
    const [visible, setVisible] = useState(false);
    // const [location,setLocation] = useState()
    var location
    const showDialog = () => {
        setVisible(true);
    };
    const handleOk = () => {
        setVisible(false);
        // console.log(props.id,location);
        //调用添加活动地点的接口
        postLocation(props.id,location)
        .then(res=>{
            console.log(res.data);
        })

    };
    const handleCancel = () => {
        setVisible(false);
    };
    const getlocation=(value)=>{
        // setLocation(value)
        location=value
    }

    //弹框的样式
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
            <Popover
                content={
                    <article style={{ padding: 12 }}>
                        选中添加子节点
                    </article>
                }
                position='topLeft'
            >
                <Button style={{ marginRight: 20 }} onClick={showDialog}>新增</Button>
            </Popover>
            <Modal
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={footer}
                closeOnEsc={true}
            >
                <h3 style={{ textAlign: 'center', fontSize: 20, margin: 40 }}>添加子地点</h3>
                <div style={{display:'flex',justifyContent:'center'}}>
                    <Input 
                    style={{ width: '320px' }} prefix={<IconPlusStroked />}
                    placeholder="添加地点"
                    onChange={getlocation}
                    ></Input>
                </div>
            </Modal>
        </>
    )
}

export default AddLocation