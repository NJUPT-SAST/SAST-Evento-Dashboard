import { Button, Col, Form, Row, SideSheet } from "@douyinfe/semi-ui";
import commonStyles from "../common.module.scss";
import { useEffect, useState } from "react";
import { getDepartments } from "@/apis/departments";
import { getTypes } from "@/apis/type";
import { getLocations } from "@/apis/location";
import fixEventDate from "@/utils/formaEventData";
import { getEvent, postEvent } from "@/apis/event";
import { getEventData } from "@/utils/commonInterface";
import addKeysToData from "@/utils/addKeysToData";

interface AddActivityProps {
  setData: (date: Array<object>) => void;
  currentPage: number;
  setTotal: (total: number) => void;
  setLoading: (loading: boolean) => void;
}

const AddActivity: React.FC<AddActivityProps> = ({
  setData,
  currentPage,
  setTotal,
  setLoading,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [totalDepartments, setTotalDepartments] = useState<
    Array<{ value: number; label: string }>
  >([]);
  const [types, setTypes] = useState<Array<{ value: number; label: string }>>(
    []
  );

  const [locations, setLocations] = useState<Array<any>>([]);
  const [eventData, setEventData] = useState<getEventData>();

  const showSideSheet = () => {
    setVisible(true);
    getDepartments().then(
      (res: { data: [{ id: number; departmentName: string }] }) => {
        const transformedData = res.data.map(({ id, departmentName }) => ({
          value: id,
          label: departmentName,
        }));
        setTotalDepartments(transformedData);
      }
    );
    getTypes().then((res: { data: [{ id: number; typeName: string }] }) => {
      const transformedType = res.data.map(({ id, typeName }) => ({
        value: id,
        label: typeName,
      }));
      setTypes(transformedType);
    });
    getLocations().then((res) => {
      const addKeyLocations = addKeysToData(res.data);
      setLocations(addKeyLocations);
    });
  };

  const addOk = () => {
    const newValues = fixEventDate(eventData);
    if (newValues) {
      postEvent(newValues).then((res) => {
        if (res.success) {
          getEvent(currentPage, 20)
            .then((res) => {
              const newDate = res.data.result.map((obj: { id: number }) => {
                return {
                  ...obj,
                  key: `${obj.id}`,
                };
              });
              setData(newDate);
              setTotal(res.data.total);
              setVisible(false);
            })
            .then((res) => setLoading(false));
        }
      });
    }
  };

  const footer = (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Button theme="solid" onClick={addOk}>
        确认发起
      </Button>
    </div>
  );

  const initDepartment = (
    values: Array<{ id: number; departmentName: string }>
  ) => {
    const departments = [];
    for (var i = 0; i < values.length; i++) {
      departments.push(values[i].id);
    }

    return departments;
  };

  const initState = (value: number) => {
    switch (value) {
      case 1:
        return "1";
      case 2:
        return "2";
      case 3:
        return "3";
      case 4:
        return "4";
      case 5:
        return "5";
    }
  };

  const stateList = [
    { value: "1", label: "未开始" },
    { value: "2", label: "签到中" },
    { value: "3", label: "进行中" },
    { value: "4", label: "已取消" },
    { value: "5", label: "已结束" },
  ];

  const changeEventData = (value: any) => {
    setEventData(value.values);
  };

  return (
    <>
      <Button onClick={showSideSheet}>发起活动</Button>
      <SideSheet
        title="发起活动信息"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={footer}
        width="40vw"
        headerStyle={{ borderBottom: "1px solid var(--semi-color-border)" }}
        bodyStyle={{ borderBottom: "1px solid var(--semi-color-border)" }}
      >
        <Form onChange={changeEventData}>
          <Row>
            <Col span={12}>
              <Form.Input
                field="title"
                label="标题"
                trigger="blur"
                placeholder="添加标题"
                style={{ width: "90%" }}
              />
            </Col>
            <Col span={12}>
              <Form.Input
                field="tag"
                label="标签"
                trigger="blur"
                placeholder="添加标签"
                style={{ width: "90%" }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.DatePicker
                type="dateTimeRange"
                field="EventTime"
                label="活动时间"
                trigger="blur"
                insetInput
                style={{ width: "90%" }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.DatePicker
                type="dateTimeRange"
                field="RegistrationTime"
                label="报名时间"
                trigger="blur"
                insetInput
                style={{ width: "90%" }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Select
                multiple
                maxTagCount={1}
                field="departments"
                label="活动组别"
                trigger="blur"
                placeholder="选择活动组别"
                style={{ width: "90%" }}
                optionList={totalDepartments}
              />
            </Col>
            <Col span={12}>
              <Form.Select
                field="typeId"
                label="活动类型"
                trigger="blur"
                placeholder="选择活动类型"
                style={{ width: "90%" }}
                optionList={types}
              />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.TreeSelect
                expandAll={true}
                filterTreeNode
                field="locationId"
                label="活动地点"
                trigger="blur"
                placeholder="请选择活动地点"
                style={{ width: "90%" }}
                treeData={locations}
              />
            </Col>
          </Row>
          <Row>
            <Form.TextArea
              field="description"
              label="活动介绍"
              trigger="blur"
              placeholder="请简单地描述一下活动"
            />
          </Row>
        </Form>
      </SideSheet>
    </>
  );
};

export default AddActivity;
