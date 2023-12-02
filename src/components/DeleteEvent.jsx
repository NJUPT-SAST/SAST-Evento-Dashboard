import React, { useState } from "react";
import { Modal, Button, Toast } from "@douyinfe/semi-ui";
import { deleteEvent, getEvent } from "../utils/event";

function DeleteEvent(props) {
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    //调用删除活动接口
    deleteEvent(props.id).then((res) => {
      getEvent(props.currentPage).then((res) => {
        props.setData(res.data.data.result);
        props.setTotal(res.data.data.total);
        // Toast.success('删除成功')
      });
    });
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <>
      <span
        onClick={showModal}
        className="buttonSpan"
        style={{ color: "rgb(249,57,32)" }}
      >
        删除活动
      </span>
      <Modal
        title="删除活动"
        maskClosable={false}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <span>你确定要删除活动嘛？</span>
      </Modal>
    </>
  );
}

export default DeleteEvent;
