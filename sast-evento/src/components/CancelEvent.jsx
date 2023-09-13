import React,{useState} from "react";
import { Modal, Button } from "@douyinfe/semi-ui";


function PatchEvent() {
    const [visible, setVisible] = useState(false)
    const showMoadl = () => {
        setVisible(true)
    }

    const handleOk = () => {
        //调用取消活动接口
        setVisible(false);
    }

    const handleCancel = () => {
        setVisible(false);
    }
    return (
        <>
            <Button onClick={showMoadl} theme="borderless" type='warning'>取消活动</Button>
            <Modal
                title="取消活动" 
                maskClosable={false}
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <span>你确定要取消活动嘛？</span>
            </Modal> 
        </>
    )
}

export default PatchEvent;