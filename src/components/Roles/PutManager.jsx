import { Button, Modal, Toast } from "@douyinfe/semi-ui";
import { useState } from "react";
import React, { useEffect } from "react";
import { TreeSelect } from "antd";
import {
  manageTreeData,
  managerUserList,
  putManagers,
} from "../../utils/event";
const { SHOW_CHILD } = TreeSelect;

function PutManager(props) {
  //对多选树的管理
  const [treeData, setTreeData] = useState([]);
  const [value, setValue] = useState(["putEvent"]);
  const [visible, setVisible] = useState(false);
  //请求接口获取其初始的权限
  useEffect(() => {
    manageTreeData(props.eventid).then((res) => setTreeData(res.data.data));
    managerUserList(props.eventid, props.userId).then((res) =>
      setValue(res.data.data)
    );
  }, []);
  // const treeData = data
  const onChange = (newValue) => {
    // console.log(newValue);
    setValue(newValue);
  };
  const tProps = {
    maxTagCount: 1,
    treeData,
    value,
    onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_CHILD,
    placeholder: "Please select",
    style: {
      width: 300,
    },
  };

  const showDialog = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setVisible(false);
    console.log(value);
    const formData = new FormData();
    formData.append("userId", props.userId);
    formData.append("methodNames", value);
    putManagers(props.eventid, formData).then((res) => {
      // Toast.success("修改成功");
    });
    //调用添加活动地点的接口
  };
  const handleCancel = () => {
    setVisible(false);
  };

  const btnStyle = {
    width: 240,
    margin: "4px 50px",
  };
  const footer = (
    <div style={{ textAlign: "center" }}>
      <Button type="primary" theme="solid" onClick={handleOk} style={btnStyle}>
        确认
      </Button>
      <Button
        type="primary"
        theme="borderless"
        onClick={handleCancel}
        style={btnStyle}
      >
        取消
      </Button>
    </div>
  );
  return (
    <>
      <Button onClick={showDialog}>编辑</Button>
      <Modal
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={footer}
        closeOnEsc={true}
      >
        <h3 style={{ textAlign: "center", fontSize: 20, margin: 40 }}>
          编辑权限
        </h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TreeSelect {...tProps} />
        </div>
      </Modal>
    </>
  );
}

export default PutManager;
