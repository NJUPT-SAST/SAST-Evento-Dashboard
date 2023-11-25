import React, { useEffect, useState } from "react";
import { SideSheet, Button, Form, Col, Row } from "@douyinfe/semi-ui";
import { postEvent, getEvent } from "../utils/event";
import { getDepartments } from "../utils/departments";
import { getLocations } from "../utils/location";
import { getTypes } from "../utils/types";
import "./AddEvent.scss";

function AddEvent(props) {
  const [visible, setVisible] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const [type, setType] = useState([]);
  const [addEventDate, setAddEventDate] = useState("");
  //获取活动组别、小组并且进行处理
  const transformedData = departments.map(({ id, departmentName }) => ({
    value: id,
    label: departmentName,
  }));

  const transformedType = type.map(({ id, typeName }) => ({
    value: id,
    label: typeName,
  }));

  //用于Select组件搜索
  const searchLabel = (sugInput, option) => {
    let label = option.label.toUpperCase();
    let sug = sugInput.toUpperCase();
    return label.includes(sug);
  };

  const change = () => {
    setVisible(!visible);
  };

  const handleSubmit = () => {
    // console.log(addEventDate);
    props.setLoading(true);
    postEvent(addEventDate)  
      .then((res) => {
        console.log(res);
        getEvent(props.currentPage).then((res) => {
          props.setTotal(res.data.data.total);
          props.setData(res.data.data.result);
        });
      })
      .then((res) => props.setLoading(false));
    // 调用发起活动的接口
    setVisible(false);
  };

  const addEventFooter = (
    <div className="addEventFooterButton">
      <Button onClick={handleSubmit} theme="solid">
        确认发起
      </Button>
    </div>
  );

  //useEffect获取初始的组织、地点、类型
  useEffect(() => {
    getDepartments().then((res) => {
      console.log(res);
      setDepartments(res.data.data);
    });
    getLocations().then((res) => {
      setTreeData(res.data.data);
    });
    getTypes().then((res) => {
      setType(res.data.data);
    });
  }, []);


  return (
    <>
      <Button theme="solid" className="button" onClick={change}>
        发起活动
      </Button>
      <SideSheet
        title="发起新的活动"
        visible={visible}
        onCancel={change}
        footer={addEventFooter}
        width="55vw"
        headerStyle={{ borderBottom: "1px solid var(--semi-color-border)" }}
        bodyStyle={{ borderBottom: "1px solid var(--semi-color-border)" }}
      >
        <Form
          onValueChange={(values) => {
            setAddEventDate(values);
          }}
        >
          <Row>
            <Col span={12}>
              <Form.Input
                field="title"
                label="标题"
                trigger="blur"
                placeholder="添加标题"
                className="formItem"
              />
            </Col>
            <Col span={12}>
              <Form.Input
                field="tag"
                label="标签"
                trigger="blur"
                placeholder="添加标签"
                className="formItem"
              />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.DatePicker
                format="yyyy-MM-dd HH:mm"
                type="dateTimeRange"
                field="EventTime"
                label="活动时间"
                trigger="blur"
                insetInput
                className="formItem"
              />
            </Col>
            <Col span={12}>
              <Form.DatePicker
                format="yyyy-MM-dd HH:mm"
                type="dateTimeRange"
                field="RegistrationTime"
                label="报名时间"
                trigger="blur"
                insetInput
                className="formItem"
              />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Select
                multiple
                maxTagCount={1}
                filter={searchLabel}
                field="departments"
                label="活动组别"
                trigger="blur"
                placeholder="选择活动组别"
                className="formItem"
                optionList={transformedData}
              />
            </Col>
            <Col span={12}>
              <Form.Select
                filter={searchLabel}
                field="typeId"
                label="活动类型"
                trigger="blur"
                placeholder="选择活动类型"
                className="formItem"
                optionList={transformedType}
              />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.TreeSelect
                filterTreeNode
                field="locationId"
                label="活动地点"
                trigger="blur"
                placeholder="选择活动地点"
                className="formItem"
                treeData={treeData}
              />
            </Col>
          </Row>
          <Row>
            <Form.TextArea
              field="description"
              label="活动介绍"
              trigger="blur"
              placeholder="请简单地描述一下活动喵"
            />
          </Row>
        </Form>
      </SideSheet>
    </>
  );
}

export default AddEvent;
