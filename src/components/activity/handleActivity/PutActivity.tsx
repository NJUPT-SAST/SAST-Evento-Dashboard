import { Button, Col, Form, Row, SideSheet } from "@douyinfe/semi-ui";
import commonStyles from "../common.module.scss";
import { useEffect, useState } from "react";
import { getDepartments } from "@/apis/departments";
import { getTypes } from "@/apis/type";
import { getLocations } from "@/apis/location";
import { getEventData } from "@/utils/commonInterface";
import formaEventData from "@/utils/formaEventData";
import { getEvent, putEvent } from "@/apis/event";

interface PutActivityProps {
  setData: (date: Array<object>) => void;
  setTotal: (total: number) => void;
  setLoading: (loading: boolean) => void;
  currentPage: number;
  title: string;
  tag: string;
  eventStart: string;
  eventEnd: string;
  registrationStart: string;
  registrationEnd: string;
  departments: Array<{ id: number; departmentName: string }>;
  eventType: { allowConflict: boolean; id: number; typeName: string };
  location: string;
  state: number;
  description: string;
  id: number;
}

//TODO:修改请求未做，需要与后端交流，接口出现问题
//FIXING

const PutActivity: React.FC<PutActivityProps> = ({
  title,
  tag,
  eventStart,
  eventEnd,
  registrationStart,
  registrationEnd,
  departments,
  eventType,
  location,
  state,
  description,
  id,
  setData,
  setLoading,
  setTotal,
  currentPage,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [totalDepartments, setTotalDepartments] = useState<
    Array<{ value: number; label: string }>
  >([]);
  const [types, setTypes] = useState<Array<{ value: number; label: string }>>(
    []
  );
  console.log(location);
  console.log("state", state);

  const [locations, setLocations] = useState<Array<any>>([]);
  const [eventData, setEventData] = useState<getEventData>();

  console.log(state);

  const showSideSheet = (event: any) => {
    event.stopPropagation();
    setVisible(true);
    getDepartments().then(
      (res: { data: [{ id: number; departmentName: string }] }) => {
        console.log(res);
        const transformedData = res.data.map(({ id, departmentName }) => ({
          value: id,
          label: departmentName,
        }));
        setTotalDepartments(transformedData);
      }
    );
    getTypes().then((res: { data: [{ id: number; typeName: string }] }) => {
      console.log(res);
      const transformedType = res.data.map(({ id, typeName }) => ({
        value: id,
        label: typeName,
      }));
      setTypes(transformedType);
    });
    getLocations().then((res) => {
      console.log(res.data);
      const addKeyLocations = addKeysToData(res.data);
      console.log(addKeyLocations);
      setLocations(addKeyLocations);
    });
  };

  //TODO: 封装hook时，将这个数据修改封装在一个工具里面
  //这里后端传入的数据不含有key，在这个函数中给每一个树形结构加上一个key，用来渲染
  function addKeysToData(
    data: Array<{ children: any }>,
    prefix = ""
  ): Array<{ children: Array<object> }> {
    if (data !== null) {
      return data.map((item, index) => {
        const key = prefix + index.toString(); // 生成当前节点的key

        // 判断当前节点是否有子节点
        if (item.children && item.children.length > 0) {
          // 递归调用addKeysToData函数为子节点添加key，并将当前节点的key作为前缀传递下去
          const children: any = addKeysToData(item.children, key + "-");

          // 返回带有key的当前节点及其子节点
          return {
            ...item,
            key,
            children,
          };
        }

        // 返回带有key的当前节点（无子节点）
        return {
          ...item,
          key,
        };
      });
    }

    return []; // 添加默认的返回结果，当data为null时返回空数组
  }

  const changeOk = () => {
    console.log(eventData);
    const newValue = formaEventData(eventData);
    console.log(id);
    if (newValue) {
      console.log(id);
      putEvent(id, newValue).then((res) => {
        console.log(res);
        if (res.success) {
          getEvent(currentPage, 20)
            .then((res) => {
              console.log(res);
              console.log(res.data);
              const newDate = res.data.result.map((obj: { id: number }) => {
                return {
                  ...obj,
                  key: `${obj.id}`,
                };
              });
              console.log(newDate);
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
      <Button theme="solid" onClick={changeOk}>
        确认修改
      </Button>
    </div>
  );

  const initDepartment = (
    values: Array<{ id: number; departmentName: string }>
  ) => {
    const departments = [];
    for (var i = 0; i < values?.length; i++) {
      departments.push(values[i].id);
    }
    console.log(departments);

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
    { value: "2", label: "报名中" },
    { value: "3", label: "进行中" },
    { value: "4", label: "已取消" },
    { value: "5", label: "已结束" },
  ];

  const changeEventData = (value: any) => {
    console.log(value);
    setEventData(value.values);
  };

  return (
    <>
      <span
        className={commonStyles.buttonSpan}
        style={{ color: "rgb(12,103,250)" }}
        onClick={showSideSheet}
      >
        编辑活动
      </span>
      <SideSheet
        title="编辑活动信息"
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
                initValue={title}
                field="title"
                label="标题"
                trigger="blur"
                placeholder="添加标题"
                style={{ width: "90%" }}
              />
            </Col>
            <Col span={12}>
              <Form.Input
                initValue={tag}
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
                initValue={[eventStart, eventEnd]}
                type="dateTimeRange"
                field="EventTime"
                label="活动时间"
                trigger="blur"
                insetInput
                style={{ width: "90%" }}
              />
            </Col>
            <Col span={12}>
              <Form.DatePicker
                initValue={[registrationStart, registrationEnd]}
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
                initValue={initDepartment(departments)}
                maxTagCount={1}
                // filter={searchLabel}
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
                initValue={eventType.id}
                // filter={searchLabel}
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
                filterTreeNode
                field="locationId"
                label="活动地点"
                trigger="blur"
                placeholder="请选择活动地点"
                style={{ width: "90%" }}
                initValue={location}
                treeData={locations}
              />
            </Col>
          </Row>
          <Row>
            <Form.TextArea
              initValue={description}
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

export default PutActivity;
