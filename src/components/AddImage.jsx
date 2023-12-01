import React, { useState } from "react";
import { Button, Select, Modal, Tag, Avatar } from "@douyinfe/semi-ui";
import { IconUpload } from "@douyinfe/semi-icons";

function AddImage() {
  const [visible, setVisible] = useState(false);

  const list = [
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/dy.png",
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/bag.jpeg",
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/Viamaker.png",
    "https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/6fbafc2d-e3e6-4cff-a1e2-17709c680624.png",
  ];
  const newList = list.map((url, index) => {
    return {
      name: `图片${index + 1}`,
      title: url,
      avatar: url,
    };
  });

  const renderMultipleWithCustomTag2 = (optionNode, { onClose }) => {
    const content = (
      <Tag
        avatarSrc={optionNode.avatar}
        avatarShape="square"
        closable={true}
        onClose={onClose}
        size="large"
      >
        {optionNode.name}
      </Tag>
    );
    return {
      isRenderInTag: false,
      content,
    };
  };

  const renderCustomOption = (item, index) => {
    const optionStyle = {
      display: "flex",
      paddingLeft: 24,
      paddingTop: 10,
      paddingBottom: 10,
    };
    return (
      <Select.Option
        value={item.name}
        style={optionStyle}
        showTick={true}
        {...item}
        key={item.email}
      >
        <Avatar size="small" src={item.avatar} />
        <div style={{ marginLeft: 8 }}>
          <div style={{ fontSize: 14 }}>{item.name}</div>
        </div>
      </Select.Option>
    );
  };

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
      <Button theme="borderless" onClick={showDialog}>
        修改图片
      </Button>
      <Modal
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={footer}
        closeOnEsc={true}
      >
        <h3 style={{ textAlign: "center", fontSize: 20, margin: 40 }}>
          编辑活动图片(1~3张)
        </h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Select
            placeholder="请选择"
            maxTagCount={2}
            style={{ width: 280, marginTop: 20 }}
            onChange={(v) => console.log(v)}
            multiple
            renderSelectedItem={renderMultipleWithCustomTag2}
          >
            {newList.map((item, index) => renderCustomOption(item, index))}
          </Select>
        </div>
      </Modal>
    </>
  );
}

export default AddImage;
