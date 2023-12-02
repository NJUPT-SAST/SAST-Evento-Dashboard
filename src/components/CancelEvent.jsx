import React, { useState } from "react";
import { Modal, Button, Toast } from "@douyinfe/semi-ui";
import { patchEvent, getEvent } from "../utils/event";

function PatchEvent(props) {
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    //调用取消活动接口
    patchEvent(props.id).then((res) => {
      getEvent(props.currentPage).then((res) => {
        props.setData(res.data.data.result);
        props.setTotal(res.data.data.total);
        // Toast.success("取消成功");
      });
    });
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <>
      {/* <Button onClick={showModal} theme="borderless" type="warning"> */}
      <span
        onClick={showModal}
        className="buttonSpan"
        style={{ color: "rgb(255,174,67)" }}
      >
        取消活动
      </span>
      {/* </Button> */}
      <Modal
        title="取消活动"
        maskClosable={false}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <span> 你确定要取消活动嘛？</span>
      </Modal>
    </>
  );
}

export default PatchEvent;
