import React, { useEffect, useState } from "react";
import ActivityType from "../../components/ActivityType";
import ActivityLocation from "../../components/ActivityLocation";
import AddImage from "../../components/AddImage";
import AddEvent from "../../components/AddEvent";
import { Table, Avatar, Space, Tag, Descriptions } from "@douyinfe/semi-ui";
import PatchEvent from "../../components/CancelEvent";
import DeleteEvent from "../../components/DeleteEvent";
import PutEvent from "../../components/EditEvent";
import Department from "../../components/Departments/Department";
import AuthPermission from "../../components/AuthPermission";
import EventQrcodeGet from "../../components/GetQRcode";
import GetManager from "../../components/Roles/GetManage";
import MoreOperate from "../../components/Activity/MoreOperate";
import { getEvent } from "../../utils/event";
import "./index.scss";

function Home() {
  const [data, setData] = useState([]);
  const [currentPage, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      title: "标题",
      dataIndex: "title",
      align: "center",
      render: (title, record, index) => {
        return (
          <span>
            {/* <Avatar
                            size="small"
                            shape="square"
                            src={record.nameIconSrc}
                            style={{ marginRight: 12 }}
                        ></Avatar> */}
            {title}
          </span>
        );
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
    // {
    //     title: '二维码',
    //     dataIndex: ' QRcode',
    //     align: "center",
    //     render: (_, record) => (
    //         <Space>
    //             <EventQrcodeGet record={record} />
    //         </Space>
    //     )
    // },
    // {
    //     title:'活动图片',
    //     dataIndex:'picture',
    //     align:'center',
    //     render:(_,record)=>(
    //         <Space>
    //             <AddImage record={record}/>
    //         </Space>
    //     )
    // },
    // {
    //     title: '操作',
    //     dataIndex: 'operate',
    //     align: "center",
    //     render: (_, record) => (
    //         <Space>
    //             <AuthPermission>
    //                 <PutEvent record={record} id={record.eventid} />
    //             </AuthPermission>
    //             <GetManager title={record.name} id={record.eventid} />
    //             <AuthPermission>
    //                 <PatchEvent record={record} id={record.eventid} />
    //             </AuthPermission>
    //             <AuthPermission>
    //                 <DeleteEvent record={record} id={record.eventid} />
    //             </AuthPermission>
    //         </Space>
    //     )
    // },
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
  ];
  // const data =
  //     [
  //         {
  //             "id": 1,
  //             "title": "后端联合授课",
  //             "description": "描述",
  //             "gmtEventStart": "2023-08-08 22:38:44",
  //             "gmtEventEnd": "2023-08-08 22:38:49",
  //             "gmtRegistrationStart": "2023-08-08 22:38:51",
  //             "gmtRegistrationEnd": "2023-08-08 22:38:53",
  //             "eventType": {
  //                 "id": 2,
  //                 "typeName": "日常授课",
  //                 "allowConflict": true
  //             },
  //             "location": "9",
  //             "tag": "标签",
  //             "state": "IN_PROGRESS",
  //             "departments": [
  //                 {
  //                     "id": 1,
  //                     "departmentName": "后端组"
  //                 },
  //                 {
  //                     "id": 2,
  //                     "departmentName": "前端组"
  //                 },
  //                 {
  //                     "id": 3,
  //                     "departmentName": "运维组"
  //                 }
  //             ]
  //         },
  //         {
  //             "id": 2,
  //             "title": "前端联合授课",
  //             "description": "描述",
  //             "gmtEventStart": "2023-08-09 10:30:49",
  //             "gmtEventEnd": "2023-08-09 10:30:52",
  //             "gmtRegistrationStart": "2023-08-09 10:30:54",
  //             "gmtRegistrationEnd": "2023-08-09 10:30:58",
  //             "eventType": {
  //                 "id": 2,
  //                 "typeName": "日常授课",
  //                 "allowConflict": true
  //             },
  //             "location": "4",
  //             "tag": "标签",
  //             "state": "IN_PROGRESS",
  //             "departments": [
  //                 {
  //                     "id": 1,
  //                     "departmentName": "后端组"
  //                 },
  //                 {
  //                     "id": 2,
  //                     "departmentName": "前端组"
  //                 },
  //                 {
  //                     "id": 3,
  //                     "departmentName": "运维组"
  //                 }
  //             ]
  //         },
  //         {
  //             "id": 3,
  //             "title": "运维组授课",
  //             "description": "描述",
  //             "gmtEventStart": "2023-08-09 10:31:19",
  //             "gmtEventEnd": "2023-08-09 10:31:22",
  //             "gmtRegistrationStart": "2023-08-09 10:31:25",
  //             "gmtRegistrationEnd": "2023-08-09 10:31:28",
  //             "eventType": {
  //                 "id": 2,
  //                 "typeName": "日常授课",
  //                 "allowConflict": true
  //             },
  //             "location": "10",
  //             "tag": "标签",
  //             "state": "NOT_STARTED",
  //             "departments": []
  //         },
  //         {
  //             "id": 4,
  //             "title": "游戏组授课",
  //             "description": "描述",
  //             "gmtEventStart": "2023-08-09 10:31:47",
  //             "gmtEventEnd": "2023-08-09 10:31:50",
  //             "gmtRegistrationStart": "2023-08-09 10:31:52",
  //             "gmtRegistrationEnd": "2023-08-09 10:31:54",
  //             "eventType": {
  //                 "id": 2,
  //                 "typeName": "日常授课",
  //                 "allowConflict": true
  //             },
  //             "location": "11",
  //             "tag": "标签",
  //             "state": "CHECKING_IN",
  //             "departments": []
  //         },
  //         {
  //             "id": 5,
  //             "title": "后端组授课",
  //             "description": "描述",
  //             "gmtEventStart": "2023-08-10 19:25:38",
  //             "gmtEventEnd": "2023-08-10 19:25:42",
  //             "gmtRegistrationStart": "2023-08-10 19:25:45",
  //             "gmtRegistrationEnd": "2023-08-10 19:25:47",
  //             "eventType": {
  //                 "id": 2,
  //                 "typeName": "日常授课",
  //                 "allowConflict": true
  //             },
  //             "location": "9",
  //             "tag": "标签",
  //             "state": "ENDED",
  //             "departments": [
  //                 {
  //                     "id": 1,
  //                     "departmentName": "后端组"
  //                 }
  //             ]
  //         }
  //     ];

  const getdepartment = (values) => {
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
      { key: "活动小组", value: getdepartment(msg.departments) },
      { key: "活动描述", value: msg.description },
    ];
  });

  useEffect(() => {
    setLoading(true);
    getEvent(currentPage)
      .then((res) => {
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
      <div className="activity-header">
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
    </>
  );
}

export default Home;
