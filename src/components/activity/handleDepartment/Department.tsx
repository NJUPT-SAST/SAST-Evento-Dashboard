import { getDepartments } from "@/apis/departments";
import { getTypes } from "@/apis/type";
import { Button, SideSheet, Space, Table, Tag } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import ChangeDepartment from "./ChangeDepartment";
import DeleteDepartments from "./DeleteDepartment";
import AddDepartment from "./AddDepartment";
import getAdminPermission, { Permissions } from "@/utils/getAdminPermission";
import styles from "./Department.module.scss";

const ActivityType: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [departments, setDepartments] = useState<
    Array<{ id: number; departmentName: string }>
  >([]);
  const [permissions, setPermissions] = useState<Permissions>();
  const [windowWidth, setWindowWidth] = useState<number>(0);
  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {}, []);
  const showActivitySheet = () => {
    getDepartments().then((res) => {
      setDepartments(res.data);
      setVisible(true);
    });
  };

  useEffect(() => {
    const permissions = getAdminPermission();
    setPermissions(permissions);
  }, []);

  const columns: any = [
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
          {permissions?.putDepartment && (
            <ChangeDepartment
              id={record.id}
              departmentName={record.departmentName}
              setDepartments={setDepartments}
            ></ChangeDepartment>
          )}
          {permissions?.deleteDepartment && (
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
        width={`${windowWidth > 1000 ? "40vw" : "100vw"}`}
      >
        <div className={styles.tableContainer}>
          <Table
            columns={columns}
            dataSource={departments}
            pagination={false}
          ></Table>
        </div>
        {permissions?.addDepartment && (
          <div className={styles.mainContainer}>
            <div className={styles.divider}></div>
            <div className={styles.addDepartmentContainer}>
              <AddDepartment setDepartments={setDepartments}></AddDepartment>
            </div>
          </div>
        )}
      </SideSheet>
    </>
  );
};

export default ActivityType;
