import React, { useEffect, useState, useMemo } from "react";
import ActivityType from "../../components/ActivityType";
import ActivityLocation from "../../components/ActivityLocation";
import AddEvent from "../../components/AddEvent";
import { Table, Tag, Descriptions } from "@douyinfe/semi-ui";
import Department from "../../components/Departments/Department";
import MoreOperate from "../../components/Activity/MoreOperate";
import { getEvent } from "../../utils/event";
import "./index.scss";

function Home() {
  const [data, setData] = useState([]);
  const [currentPage, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [loading, setLoading] = useState(false);

  // 空数组作为依赖项，确保只在组件挂载时进行初始化
  const columns = useMemo(
    () => [
      {
        title: "标题",
        dataIndex: "title",
        align: "center",
        render: (title, _record, index) => {
          return <span>{title}</span>;
        },
      },
      {
        title: "活动类型",
        dataIndex: "eventType",
        align: "center",
        render: (eventType, record, index) => {
          return <div>{eventType.typeName}</div>;
        },
      },
      {
        title: "状态",
        dataIndex: "state",
        align: "center",
        render: (state, record, index) => {
          if (state === "IN_PROGRESS") {
            return <Tag color="green">进行中</Tag>;
          } else if (state === "NOT_STARTED") {
            return <Tag color="blue">未开始</Tag>;
          } else if (state === "ENDED") {
            return <Tag color="grey">已结束</Tag>;
          } else if (state === "CHECKING_IN") {
            return <Tag color="yellow">报名中</Tag>;
          } else {
            return <Tag color="red">已取消</Tag>;
          }
        },
      },
      {
        title: "",
        dataIndex: "openrate",
        render: (_, record) => {
          return (
            <MoreOperate
              setData={setData}
              setTotal={setTotal}
              currentPage={currentPage}
              record={record}
            />
          );
        },
      },
    ],
    []
  );

  const getDepartment = (values) => {
    const departments = [];
    for (var i = 0; i < values?.length; i++) {
      departments.push(values[i]?.departmentName + " ");
    }
    return departments;
  };
  const expandData = data.map((msg, index) => {
    return [
      { key: "活动开始时间", value: msg.gmtEventStart },
      { key: "活动结束时间", value: msg.gmtEventEnd },
      { key: "报名开始时间", value: msg.gmtRegistrationStart },
      { key: "报名结束时间", value: msg.gmtRegistrationEnd },
      { key: "活动标签", value: msg.tag },
      { key: "活动地点", value: msg.location },
      { key: "活动小组", value: getDepartment(msg.departments) },
      { key: "活动描述", value: msg.description },
    ];
  });

  useEffect(() => {
    setLoading(true);
    getEvent(currentPage)
      .then((res) => {
        console.log(res);
        console.log(res.data.data);
        setData(res.data.data.result);
        setTotal(res.data.data.total);
      })
      .then((res) => setLoading(false));
  }, []);

  const handlePageChange = (page) => {
    setLoading(true);
    setPage(page);
    getEvent(page)
      .then((res) => {
        setData(res.data.data.result);
        setTotal(res.data.data.total);
      })
      .then((res) => setLoading(false));
  };

  const expandRowRender = (record, index) => {
    return <Descriptions align="center" data={expandData[index]} />;
  };

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  useEffect(() => {
    console.log("columns", columns);
  }, [columns]);

  return (
    <>
      <div className="activityContainer">
        <div className="activityHeader">
          <AddEvent
            setLoading={setLoading}
            setTotal={setTotal}
            setData={setData}
            currentPage={currentPage}
          />
          <ActivityType />
          <ActivityLocation />
          <Department />
        </div>
        <Table
          className="activityTable"
          rowKey="id"
          columns={columns}
          dataSource={data}
          expandedRowRender={expandRowRender}
          loading={loading}
          pagination={{
            currentPage,
            pageSize: 10,
            total,
            onChange: handlePageChange,
          }}
        />
      </div>
    </>
  );
}

export default Home;
