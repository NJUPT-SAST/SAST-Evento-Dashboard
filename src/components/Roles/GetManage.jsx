import React, { useEffect, useState } from "react";
import { Button, SideSheet, Table, Space } from "@douyinfe/semi-ui";
import AddManager from "./AddManager";
import DeleteManager from "./DeleteManager";
import PutManager from "./PutManager";
import { getManagers } from "../../utils/event";
import "./GetManage.scss";

function GetManager(props) {
  const [visible, setVisible] = useState(false);
  const [managerData, setManagerData] = useState([]);

  useEffect(() => {
    console.log(props);
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
      setManagerData(newDate);
    });
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
        console.log("44行de$", record);
        return (
          <Space>
            <PutManager eventid={props.id} userId={record.key} />
            <DeleteManager
              eventid={props.id}
              userId={record.key}
              setData={setManagerData}
            />
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <div className="buttonSpan" onClick={change}>
        活动权限
      </div>
      <SideSheet
        title={props.title}
        visible={visible}
        onCancel={change}
        width="40wv"
      >
        <AddManager
          eventid={props.id}
          setData={setManagerData}
          managerDate={managerData}
        />
        {managerData && (
          <Table columns={columns} pagination={true} dataSource={managerData} />
        )}
      </SideSheet>
    </>
  );
}

export default GetManager;
