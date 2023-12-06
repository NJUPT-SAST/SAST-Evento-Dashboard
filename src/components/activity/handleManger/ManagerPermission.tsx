import { Button, SideSheet, Space, Table } from "@douyinfe/semi-ui";
import commonStyles from "../common.module.scss";
import { useEffect, useState } from "react";
import { getManagers } from "@/apis/event";
import PutManager from "./PutManager";
import DeleteManager from "./DeleteManager";
import AddManager from "./AddManager";

interface ManagerPermissionProps {
  title: string;
  eventId: number;
}

const ManagerPermission: React.FC<ManagerPermissionProps> = ({
  title,
  eventId,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [managerData, setManagerData] = useState<Array<object | any>>([]);

  useEffect(() => {
    getManagers(eventId).then((res) => {
      console.log(res.data.users);
      setManagerData(res.data.users);
    });
  }, [eventId]);

  const columns = [
    {
      title: "姓名",
      dataIndex: "nickname",
      render: (text: string) => {
        return <span className="studentIdSpan">{text}</span>;
      },
    },
    {
      title: "学号",
      dataIndex: "studentId",
      render: (text: string) => {
        return <span className="studentIdSpan">{text}</span>;
      },
    },
    {
      title: "权限操作",
      dataIndex: "linkId",
      render: (_: any, record: { id: string; nickname: string }) => {
        console.log("44行de$", record);
        return (
          <>
            <Space>
              <PutManager
                eventId={eventId}
                userId={record.id}
                userName={record.nickname}
              />
              <DeleteManager
                userName={record.nickname}
                eventId={eventId}
                userId={record.id}
                setManagerData={setManagerData}
              ></DeleteManager>
            </Space>
          </>
        );
      },
    },
  ];

  return (
    <>
      <span
        className={commonStyles.buttonSpan}
        style={{ color: "rgb(12,103,250)" }}
        onClick={() => setVisible(true)}
      >
        活动权限
      </span>
      <SideSheet
        title={title}
        width="40vw"
        visible={visible}
        onCancel={() => setVisible(false)}
      >
        <AddManager
          eventId={eventId}
          setManagerData={setManagerData}
        ></AddManager>
        <Table columns={columns} pagination={true} dataSource={managerData} />
      </SideSheet>
    </>
  );
};

export default ManagerPermission;
