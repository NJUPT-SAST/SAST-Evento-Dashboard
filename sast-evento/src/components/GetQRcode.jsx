//获取签到二维码
import React, { useState } from "react";
import { Button, Modal } from "@douyinfe/semi-ui";
import { QRCode } from "antd";
import { authCode } from "../utils/event";

function EventQrcodeGet(props) {
    const [visible, setVisible] = useState(false)
    const [text, setText] = useState()
    const handleCancel = () => {
        setVisible(false)
    }


    //实现二维码的下载
    const downloadQRCode = () => {
        const canvas = document.getElementById('myqrcode')?.querySelector('canvas');
        if (canvas) {
            const url = canvas.toDataURL();
            const a = document.createElement('a');
            a.download = 'QRCode.png';
            a.href = url;
            // a.text=text
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }
    const getQrcode = () => {
        setVisible(true)
        authCode(props.id)
            .then(res => setText(res.data.data))
    }
    const btnStyle = {
        width: 240,
        margin: '4px 50px',
    };
    const footer = (
        <div style={{ textAlign: 'center' }}>
            <Button type="primary" theme="solid" style={btnStyle} onClick={downloadQRCode}>
                下载二维码
            </Button>
            <Button type="primary" theme="borderless" onClick={handleCancel} style={btnStyle}>
                取消
            </Button>
        </div>
    )
    return (
        <>
            <Button theme="borderless" onClick={getQrcode}>
                活动二维码
            </Button>
            <Modal
                visible={visible}
                onCancel={handleCancel}
                footer={footer}
            >
                <div id="myqrcode" style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                    <QRCode value={text || '-'} />
                </div>
            </Modal>
        </>
    )
}

export default EventQrcodeGet