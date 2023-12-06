"use client";

import { Descriptions, Table, Tag } from "@douyinfe/semi-ui";
import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.scss";
import { getEvent } from "@/apis/event";
import MoreOperate from "@/components/activity/MoreOperate";
import ActivityType from "@/components/activity/handleActivityType/ActivityType";
import Department from "@/components/activity/handleDepartment/Department";

export default function Activity() {
  const [data, setData] = useState<Array<object>>([{}]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [total, setTotal] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);

  const windowHeight = window.innerHeight;
  console.log(windowHeight);
  const tableHeight = windowHeight - 60 - 40 - 0.1 * windowHeight;

  //TODO: 这里有大量的typeScript类型问题,都已经设置为any，保证能正常运行
  const columns: any = useMemo(
    () => [
      {
        title: "标题",
        dataIndex: "title",
        align: "center",
        render: (title: string, record: object, index: number) => {
          return <span>{title}</span>;
        },
      },
      {
        title: "活动类型",
        dataIndex: "eventType",
        align: "center",
        render: (
          eventType: { typeName: string },
          record: object,
          index: number
        ) => {
          return <div>{eventType?.typeName}</div>;
        },
      },
      {
        title: "状态",
        dataIndex: "state",
        align: "center",
        render: (state: string, record: object, index: number) => {
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
        dataIndex: "operate",
        render: (
          _: any,
          record: {
            title: string;
            tag: string;
            gmtEventStart: string;
            gmtEventEnd: string;
            gmtRegistrationStart: string;
            gmtRegistrationEnd: string;
            departments: Array<{ id: number; departmentName: string }>;
            eventType: { allowConflict: boolean; id: number; typeName: string };
            location: string;
            state: string;
            description: string;
            id: number;
          }
        ) => {
          return (
            <MoreOperate
              setDate={setData}
              setTotal={setTotal}
              currentPage={currentPage}
              record={record}
            />
          );
        },
      },
    ],
    [currentPage]
  );

  const getDepartment = (values: Array<{ departmentName: string }>) => {
    const departments = [];
    for (var i = 0; i < values?.length; i++) {
      departments.push(values[i]?.departmentName + " ");
    }
    return departments;
  };

  const expandData = data?.map((msg: any, _index: number) => {
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
      })
      .then((res) => setLoading(false));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setLoading(true);
    setCurrentPage(page);
    getEvent(page, 20)
      .then((res) => {
        setData(res.data.result);
        setTotal(res.data.total);
      })
      .then((res) => setLoading(false));
  };

  const expandRowRender: any = (record: object, index: number) => {
    return <Descriptions align="center" data={expandData[index]} />;
  };

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  useEffect(() => {
    console.log("columns", columns);
  }, [columns]);

  const y = 300;

  const scroll = useMemo(() => ({ y: tableHeight }), [tableHeight]);

  return (
    <>
      <div className={styles.main}>
        <div className="activityContainer">
          <div className="activityHeader">
            {/* <AddEvent
            setLoading={setLoading}
            setTotal={setTotal}
            setData={setData}
            currentPage={currentPage}
          />
          <ActivityType />
          <ActivityLocation />
          <Department /> */}
            <Department></Department>
            <ActivityType></ActivityType>
          </div>

          {/* TODO :app-index.js:32  Warning: CustomExpandIcon: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.目前不影响使用 */}
          <Table
            className={styles.table}
            scroll={scroll}
            rowKey="id"
            columns={columns}
            dataSource={data}
            expandedRowRender={expandRowRender}
            loading={loading}
            pagination={{
              currentPage,
              pageSize: 20,
              total,
              onChange: handlePageChange,
            }}
          />
        </div>
      </div>
    </>
  );
}
