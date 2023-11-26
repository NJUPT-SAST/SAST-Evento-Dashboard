import React, { useEffect, useState } from "react";
import {
  SideSheet,
  Button,
  Typography,
  Form,
  Select,
  Avatar,
} from "@douyinfe/semi-ui";
import "./EditCarousel.scss";

function PatchHomeSlide(props) {
  const [patchSliderVisible, setPatchSliderVisible] = useState(false);
  const list = [];
  //data初始化
  const data = {
    slideId: props.data.slideId,
    title: props.data.title,
    link: props.data.link,
    url: props.data.url,
  };

  const newList = list.map((url, index) => {
    return {
      name: `图片${index + 1}`,
      title: url,
      avatar: url,
    };
  });

  //渲染图片选择组件
  const renderSelectedItem = (optionNode) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Avatar src={optionNode.avatar} size="small">
        {optionNode.abbr}
      </Avatar>
      <span style={{ marginLeft: 8 }}>{optionNode.name}</span>
    </div>
  );

  const renderCustomOption = (item, index) => {
    const optionStyle = {
      display: "flex",
      paddingLeft: 24,
      paddingTop: 10,
      paddingBottom: 10,
    };
    return (
      <Select.Option
        value={item.title}
        style={optionStyle}
        showTick={true}
        {...item}
        key={item.name}
      >
        <Avatar size="small" src={item.avatar} />
        <div style={{ marginLeft: 8 }}>
          <div style={{ fontSize: 14 }}>{item.name}</div>
          <div
            style={{
              color: "var(--color-text-2)",
              fontSize: 12,
              lineHeight: "16px",
              fontWeight: "normal",
            }}
          >
            {item.email}
          </div>
        </div>
      </Select.Option>
    );
  };

  const onSubmit = () => {
    console.log(data);
    setPatchSliderVisible(false);
  };

  const handleChange = (values) => {
    data.title = values.title;
    data.link = values.link;
    data.url = values.url;
  };

  function showPatchSlider() {
    setPatchSliderVisible(true);
    console.log(props);
  }

  const footer = (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Button onClick={onSubmit} theme="solid">
        确认修改
      </Button>
    </div>
  );
  return (
    <>
      <Button theme="borderless" onClick={showPatchSlider}>
        编辑
      </Button>
      <SideSheet
        title={<Typography.Title heading={4}>编辑幻灯片</Typography.Title>}
        headerStyle={{ borderBottom: "1px solid var(--semi-color-border)" }}
        bodyStyle={{ borderBottom: "1px solid var(--semi-color-border)" }}
        visible={patchSliderVisible}
        width="30wv"
        onCancel={() => setPatchSliderVisible(false)}
        footer={footer}
      >
        <Form
          wrapperCol={{ span: 20 }}
          labelCol={{ span: 3 }}
          labelPosition="top"
          labelAlign="right"
          onValueChange={handleChange}
        >
          <Form.Input
            field="title"
            label="标题"
            trigger="blur"
            style={{ width: 200 }}
            initValue={data.title}
          />
          <Form.Input
            field="link"
            label="链接"
            trigger="blur"
            style={{ width: 200 }}
            initValue={data.link}
          />
          <Form.Select
            field="url"
            label="图片"
            trigger="blur"
            style={{ width: 250 }}
            placeholder="请选择"
            initValue={data.url}
            renderSelectedItem={renderSelectedItem}
          >
            {newList.map((item, index) => renderCustomOption(item, index))}
          </Form.Select>
        </Form>
      </SideSheet>
    </>
  );
}

export default PatchHomeSlide;
