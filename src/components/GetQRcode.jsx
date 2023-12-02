//获取签到二维码
import React, { useState, useRef } from "react";
import { Button, Modal } from "@douyinfe/semi-ui";
import { authCode } from "../utils/event";
import "./GetORcode.scss";
import QRCode from "qrcode.react";

function EventQRcodeGet(props) {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState();
  const QRcodeRef = useRef();

  const handleCancel = () => {
    setVisible(false);
  };

  const getQRcode = () => {
    setVisible(true);
    authCode(props.id).then((res) => {
      setText(res.data.data);
      console.log(res.data.data);
    });
  };

  //实现二维码的下载
  const downloadQRCode = () => {
    const link = document.createElement("a");
    link.href = QRcodeRef.current.childNodes[0].toDataURL("image/png");
    link.download = "canvas.png";
    // 模拟点击链接进行下载
    link.click();
  };

  const footer = (
    <div className="QRcodeFooter">
      <div className="QRcodeContainer" ref={QRcodeRef}>
        <QRCode value={text}></QRCode>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Button
        type="primary"
        theme="solid"
        onClick={downloadQRCode}
        style={{ width: 240 }}
      >
        下载二维码
      </Button>
      <Button
        type="primary"
        theme="borderless"
        onClick={handleCancel}
        style={{ width: 240, marginTop: 10 }}
      >
        取消
      </Button>
    </div>
  );
  return (
    <>
        <span onClick={getQRcode} className="buttonSpan">活动二维码</span>
      {/* 这里css居中出现问题，将code展示代码放在footer中,完美解决 */}
      <Modal visible={visible} onCancel={handleCancel} footer={footer}></Modal>
    </>
  );
}

export default EventQRcodeGet;
