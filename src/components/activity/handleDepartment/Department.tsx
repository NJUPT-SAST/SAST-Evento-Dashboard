import { getDepartments } from "@/apis/departments";
import { getTypes } from "@/apis/type";
import { Button, SideSheet, Space, Table, Tag } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import ChangeDepartment from "./ChangeDepartment";
import DeleteDepartments from "./DeleteDepartment";
import AddDepartment from "./AddDepartment";
import getAdminPermission from "@/utils/getAdminPermission";

const ActivityType: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [departments, setDepartments] = useState<
    Array<{ id: number; departmentName: string }>
  >([]);

  useEffect(() => {}, []);
  const showActivitySheet = () => {
    getDepartments().then((res) => {
      console.log(res);
      setDepartments(res.data);
      setVisible(true);
    });
  };

  const permissions = getAdminPermission();

  const columns: any = [
    {
      title: "序号",
      dataIndex: "id",
      align: "center",
    },
    {
      title: "组别",
      dataIndex: "departmentName",
      align: "center",
    },
    {
      title: "操作",
      dataIndex: "operate",
      align: "center",
      render: (_: any, record: { id: number; departmentName: string }) => (
        <Space>
          {permissions.putDepartment && (
            <ChangeDepartment
              id={record.id}
              departmentName={record.departmentName}
              setDepartments={setDepartments}
            ></ChangeDepartment>
          )}
          {permissions.deleteDepartment && (
            <DeleteDepartments
              id={record.id}
              departmentName={record.departmentName}
              setDepartments={setDepartments}
            ></DeleteDepartments>
          )}
        </Space>
      ),
    },
  ];
  return (
    <>
      <Button onClick={showActivitySheet}>活动组别</Button>
      <SideSheet
        title="活动组别管理"
        visible={visible}
        onCancel={() => setVisible(false)}
        width="30vw"
      >
        {permissions.addDepartment && (
          <AddDepartment setDepartments={setDepartments}></AddDepartment>
        )}
        <Table
          columns={columns}
          dataSource={departments}
          pagination={false}
        ></Table>
      </SideSheet>
    </>
  );
};

export default ActivityType;
