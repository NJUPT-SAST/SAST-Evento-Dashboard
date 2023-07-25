import React from 'react';
import { Modal, Button } from '@douyinfe/semi-ui';
import { useState } from 'react';

export default function ActivityDetails() {
    const [visible, setVisible] = useState(false);
    const onClose = () => {
        setVisible(false);
    };
    return (
        <>
            <Modal title="全屏对话框标题" fullScreen visible={visible} onOk={onClose} onCancel={onClose}>
                <p>This is a full screen modal</p>
                <p>More content...</p>
            </Modal>
        </>
    );
};
