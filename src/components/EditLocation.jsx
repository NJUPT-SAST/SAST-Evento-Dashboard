import React from "react"
import { Modal, Button, Popover, Input,Toast } from '@douyinfe/semi-ui';
import { useState } from "react";
import { updateLocation,getLocations } from "../utils/location";
import { IconEditStroked} from '@douyinfe/semi-icons';


function UpdateLocation(props) {
    const [visible, setVisible] = useState(false);
    let locationName
    const showDialog = () => {
        setVisible(true);
    };

    const handleChange=(value)=>{
        locationName=value
    }

    const handleOk = () => {
        setVisible(false);
        updateLocation(props.id,locationName)
        .then(res=>{
            Toast.success('更新成功')
            getLocations()
            .then(response=>props.setTreeData(response.data.data))
        })
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
    return (
        <>
            <Popover
                content={
                    <article style={{ padding: 12 }}>
                        选中地点,进行修改
                    </article>
                }
                position='top'
            >
                <Button style={{ marginRight: 20 }} onClick={showDialog}>更改</Button>
            </Popover>
            <Modal
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={footer}
                closeOnEsc={true}
            >
                <h3 style={{ textAlign: 'center', fontSize: 20, margin: 40 }}>修改地点</h3>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Input
                        style={{ width: '320px' }}
                        placeholder="修改地点" prefix={<IconEditStroked />}
                        onChange={handleChange}
                    ></Input>
                </div>
            </Modal>
        </>
    )
}

export default UpdateLocation