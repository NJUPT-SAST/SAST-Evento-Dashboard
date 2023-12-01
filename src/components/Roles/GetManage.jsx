import React, { useEffect, useState } from "react";
import { Button, SideSheet, Table, Space } from "@douyinfe/semi-ui";
import AddManager from "./AddManager";
import DeleteManager from "./DeleteManager";
import PutManager from "./PutManager";
import { getManagers } from "../../utils/event";

function GetManager(props) {
  const [visible, setVisible] = useState(false);
  const [mangerData, setMangerData] = useState([]);

  const exampleDate = [
    {
      key: "1715371988584902657",
      linkId: "b22050029",
      studentId: "b22050029",
      email: "b22050029@njupt.edu.cn",
      nickname: "Love98",
      avatar:
        "https://sast-link-1309205610.cos.ap-shanghai.myqcloud.com/avatar/110.jpg",
      organization: null,
      biography: "后端组全干人员",
      link: ["blog.love98.net", "", ""],
    },
  ];

  useEffect(() => {
    console.log(props.id);
    getManagers(props.id).then((res) => {
      console.log(res.data.data.users);
      const newDate = res.data.data.users.map((obj) => {
        const { id, ...rest } = obj;
        return {
          ...rest,
          key: obj.id,
        };
      });
      console.log(newDate);
      setMangerData(newDate);
    });
    console.log(exampleDate);
  }, []);
  const change = () => {
    setVisible(!visible);
  };

  const columns = [
    {
      title: "学号",
      dataIndex: "studentId",
      render: (text) => {
        return <span className="studentIdSpan">{text}</span>;
      },
    },
    {
      title: "权限操作",
      dataIndex: "linkId",
      render: (_, record) => {
        console.log(record);
        return (
          <Space>
            <PutManager eventid={props.id} userId={record.studentId} />
            <DeleteManager
              eventid={props.id}
              userId={record.studentId}
              setData={setMangerData}
            />
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Button theme="borderless" onClick={change}>
        活动权限
      </Button>
      <SideSheet
        title={props.title}
        visible={visible}
        onCancel={change}
        width="40wv"
      >
        <AddManager eventid={props.id} setData={setMangerData} />
        {mangerData && (
          <Table columns={columns} pagination={true} dataSource={mangerData} />
        )}
      </SideSheet>
    </>
  );
}

export default GetManager;
