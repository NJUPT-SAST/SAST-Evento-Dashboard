import React from "react"
import { Modal, Button, Popover, Input } from '@douyinfe/semi-ui';
import { useState } from "react";
import { IconEditStroked} from '@douyinfe/semi-icons';


function EditLocation(props) {
    const [visible, setVisible] = useState(false);
    const showDialog = () => {
        setVisible(true);
    };
    const handleOk = () => {
        setVisible(false);
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
                    ></Input>
                </div>
            </Modal>
        </>
    )
}

export default EditLocation 