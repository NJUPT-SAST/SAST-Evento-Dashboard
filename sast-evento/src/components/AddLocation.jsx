import React,{useState} from "react"
import { Modal, Button } from '@douyinfe/semi-ui';

function AddLocation() {
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
    return (
        <>
            <Button onClick={showDialog}>新增</Button>
            <Modal
                title="添加活动地点"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                closeOnEsc={true}
            >
                This is the content of a basic modal.
                <br />
                More content...
            </Modal>
        </>
    )
}

export default AddLocation