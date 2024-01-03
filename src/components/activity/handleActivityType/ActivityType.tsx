import { getTypes } from "@/apis/type";
import { Button, SideSheet, Space, Table, Tag } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import ChangeActivityType from "./ChangeActivityType";
import DeleteActivityType from "./DeleteActivityType";
import AddActivityType from "./AddActivityType";
import styles from "./ActivityType.module.scss";
import getAdminPermission, { Permissions } from "@/utils/getAdminPermission";

const ActivityType: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [activityTypes, setActivityTypes] = useState<
    Array<{ id: number; typeName: string; allowConflict: boolean }>
  >([]);
  const [permissions, setPermissions] = useState<Permissions>();
  const [windowWidth, setWindowWidth] = useState<number>(0);
  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  const showActivitySheet = () => {
    getTypes().then((res) => {
      setActivityTypes(res.data);
      setVisible(true);
    });
  };

  useEffect(() => {
    const permissions = getAdminPermission();
    setPermissions(permissions);
  }, []);

  const columns: any = [
    {
      title: "类型",
      dataIndex: "typeName",
      align: "center",
    },
    {
      title: "能否冲突",
      dataIndex: "allowConflict",
      align: "center",
      render: function (allowConflict: boolean) {
        if (allowConflict) {
          return <Tag color="green">允许</Tag>;
        } else {
          return <Tag color="red">禁止</Tag>;
        }
      },
    },
    {
      title: "操作",
      dataIndex: "operate",
      align: "center",
      render: (
        _: any,
        record: { id: number; typeName: string; allowConflict: boolean }
      ) => (
        <Space>
          {permissions?.updateType && (
            <ChangeActivityType
              setActivityTypes={setActivityTypes}
              id={record.id}
              typeName={record.typeName}
              allowConflict={record.allowConflict}
            ></ChangeActivityType>
          )}
          {permissions?.deleteType && (
            <DeleteActivityType
              setActivityTypes={setActivityTypes}
              id={record.id}
              typeName={record.typeName}
            ></DeleteActivityType>
          )}
        </Space>
      ),
    },
  ];
  return (
    <>
      <Button onClick={showActivitySheet}>活动类型</Button>
      <SideSheet
        title="活动类型管理"
        visible={visible}
        onCancel={() => setVisible(false)}
        width={`${windowWidth > 1000 ? "40vw" : "100vw"}`}
      >
        <div className={styles.tableContainer}>
          <Table
            columns={columns}
            dataSource={activityTypes}
            pagination={false}
            className={styles.table}
          ></Table>
        </div>
        {permissions?.addType && (
          <div className={styles.mainContainer}>
            <div className={styles.divider}></div>
            <div className={styles.addActivityContainer}>
              <AddActivityType
                setActivityTypes={setActivityTypes}
              ></AddActivityType>
            </div>
          </div>
        )}
      </SideSheet>
    </>
  );
};

export default ActivityType;
