import { Button, Modal, Tag } from "@douyinfe/semi-ui";
import styles from "./ShowPermission.module.scss";
import { useEffect, useState } from "react";
import { getUserPermission } from "@/apis/permission";

type ShowPermissionProps = { studentId: string };

export const ShowPermission = ({ studentId }: ShowPermissionProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [havePermission, setHavePermission] = useState<Array<string>>([]);

  const showMore = () => {
    console.log("hello");
    console.log(studentId);

    setVisible(true);
    getUserPermission(studentId, "").then((res) => {
      setHavePermission(res.data);
    });
  };

  useEffect(() => {
    console.log(havePermission);
  }, [havePermission]);

  return (
    <>
      <Button onClick={showMore}>权限详情</Button>
      <Modal
        title="权限详情"
        maskClosable={false}
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={
          <Button type="primary" onClick={() => setVisible(false)}>
            关闭
          </Button>
        }
      >
        <div className={styles.havePermissionShow}>
          {havePermission &&
            havePermission.map((item, index) => {
              return (
                <Tag size="small" color="cyan" key={index}>
                  {item}
                </Tag>
              );
            })}
        </div>
      </Modal>
    </>
  );
};
