//获取签到二维码
import React, { useState, useRef, useEffect, LegacyRef } from "react";
import { Button, Modal } from "@douyinfe/semi-ui";
import { authCode } from "@/apis/event";
import QRCode from "qrcode.react";

type EventQRcodeGetProps = {
  eventId: number;
};

function EventQRcodeGet({ eventId }: EventQRcodeGetProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const [text, setText] = useState<string>("0");
  const QRcodeRef = useRef<HTMLDivElement>(null);

  const handleCancel = () => {
    setVisible(false);
  };

  const getQRcode = () => {
    setVisible(true);
    authCode(eventId).then((res: { data: string }) => {
      setText(res.data);
    });
  };

  useEffect(() => {
    console.log(text);
  }, [text]);

  //实现二维码的下载;
  const downloadQRCode = () => {
    const link = document.createElement("a");
    link.href = (
      QRcodeRef.current?.childNodes[0] as HTMLCanvasElement
    )?.toDataURL("image/png");
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
      <span onClick={getQRcode} className="buttonSpan">
        活动二维码
      </span>
      {/* 这里css居中出现问题，将code展示代码放在footer中,完美解决 */}
      <Modal visible={visible} onCancel={handleCancel} footer={footer}></Modal>
    </>
  );
}

export default EventQRcodeGet;
