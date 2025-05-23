"use client";

import { Descriptions, Table, Tag } from "@douyinfe/semi-ui";
import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.scss";
import { getEvent } from "@/apis/event";
import MoreOperate from "@/components/activity/MoreOperate";
import ActivityType from "@/components/activity/handleActivityType/ActivityType";
import Department from "@/components/activity/handleDepartment/Department";
import HandleLocation from "@/components/activity/handleLocation/HandleLocation";
import AddActivity from "@/components/activity/handleActivity/AddActivity";
import getAdminPermission, { Permissions } from "@/utils/getAdminPermission";

export default function Activity() {
  const [data, setData] = useState<Array<object>>([{}]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [total, setTotal] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [tableHeight, setTableHeight] = useState<number>(0);
  const [permissions, setPermissions] = useState<Permissions>();

  useEffect(() => {
    const windowHeight = window.innerHeight;
    const tableHeight = windowHeight - 60 - 40 - 32 - 0.12 * windowHeight;
    setTableHeight(tableHeight);
  }, []);

  useEffect(() => {
    const permissions = getAdminPermission();
    setPermissions(permissions);
  }, []);

  const columns: any = useMemo(
    () => [
      {
        title: "标题",
        dataIndex: "title",
        align: "center",
        render: (title: string, record: object, index: number) => {
          return <span className={styles.titleSpan}>{title}</span>;
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
          return (
            <div className={styles.eventTypeSpan}>{eventType?.typeName}</div>
          );
        },
      },
      {
        title: "状态",
        dataIndex: "state",
        align: "center",
        render: (state: number, record: object, index: number) => {
          if (state === 1) {
            return <Tag color="yellow">未开始</Tag>;
          } else if (state === 2) {
            return <Tag color="green">报名中</Tag>;
          } else if (state === 3) {
            return <Tag color="blue">进行中</Tag>;
          } else if (state === 4) {
            return <Tag color="red">已取消</Tag>;
          } else {
            return <Tag color="grey">已结束</Tag>;
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
            state: number;
            description: string;
            id: number;
          }
        ) => {
          return (
            <div className={styles.moreOperate}>
              <MoreOperate
                setLoading={setLoading}
                setData={setData}
                setTotal={setTotal}
                currentPage={currentPage}
                record={record}
              />
            </div>
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
      { key: "活动开始时间", value: msg.gmtEventStart?.slice(0, -3) },
      { key: "活动结束时间", value: msg.gmtEventEnd?.slice(0, -3) },
      { key: "报名开始时间", value: msg.gmtRegistrationStart?.slice(0, -3) },
      { key: "报名结束时间", value: msg.gmtRegistrationEnd?.slice(0, -3) },
      { key: "活动标签", value: msg.tag },
      { key: "活动地点", value: msg.location },
      { key: "活动组别", value: getDepartment(msg.departments) },
      { key: "活动描述", value: msg.description },
    ];
  });

  const gewNewEvent = () => {
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
      })
      .then((res) => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
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
      })
      .then((res) => setLoading(false));
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

  const y = 300;

  const scroll = useMemo(() => ({ y: tableHeight }), [tableHeight]);

  return (
    <>
      <div className={styles.main}>
        <div className="activityContainer">
          <div className={styles.activityHeader}>
            {permissions?.addEvent && (
              <AddActivity
                setData={setData}
                currentPage={currentPage}
                setTotal={setTotal}
                setLoading={setLoading}
              ></AddActivity>
            )}
            <HandleLocation></HandleLocation>
            <Department></Department>
            <ActivityType></ActivityType>
          </div>
          <Table
            expandRowByClick={true}
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
