//获取签到二维码
import React, { useState, useRef, useEffect, LegacyRef } from "react";
import { Button, Modal } from "@douyinfe/semi-ui";
import { authCode } from "@/apis/event";
import QRCode from "qrcode.react";
import styles from "./EventQRcodeGet.module.scss";
import commonStyles from "./common.module.scss";

interface EventQRcodeGetProps {
  eventId: number;
}

const EventQRcodeGet: React.FC<EventQRcodeGetProps> = ({ eventId }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [text, setText] = useState<string>("0");
  const QRcodeRef = useRef<HTMLDivElement>(null);

  const getQRcode = () => {
    setVisible(true);
    authCode(eventId).then((res: { data: string }) => {
      setText(res.data);
    });
  };

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
    <div className={styles.QRcodeFooter}>
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
        onClick={() => setVisible(false)}
        style={{ width: 240, marginTop: 10 }}
      >
        取消
      </Button>
    </div>
  );
  return (
    <>
      <span
        onClick={getQRcode}
        className={commonStyles.buttonSpan}
        style={{ color: "rgb(12,103,250)" }}
      >
        活动二维码
      </span>
      {/* 这里css居中出现问题，将code展示代码放在footer中,完美解决 */}
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={footer}
        maskClosable={true}
      ></Modal>
    </>
  );
};

export default EventQRcodeGet;
