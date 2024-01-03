import { Button, Modal, Toast } from "@douyinfe/semi-ui";
import { useState } from "react";
import { IconDelete } from "@douyinfe/semi-icons";
import styles from "./DeleteManager.module.scss";
import { deleteEventManager } from "@/apis/permission";
import { getManagers } from "@/apis/event";

interface DeleteManagerProps {
  userName: string;
  eventId: number;
  userId: string;
  setManagerData: (managerDate: Array<object | any>) => void;
}

const DeleteManager: React.FC<DeleteManagerProps> = ({
  userName,
  eventId,
  userId,
  setManagerData,
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  const deleteManager = () => {
    deleteEventManager(String(eventId), String(userId)).then((res) => {
      if (res.success) {
        getManagers(eventId).then((res) => {
          setManagerData(res.data.users);
          setVisible(false);
        });
      }
    });
  };
  return (
    <>
      <Button onClick={() => setVisible(true)} className={styles.danger}>
        删除
      </Button>
      <Modal
        title={
          <div className={styles.content}>
            <IconDelete className={styles.danger} size="large" />
            <span>确定要删除管理员：{userName} 吗？</span>
          </div>
        }
        size="medium"
        closable={false}
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={deleteManager}
        closeOnEsc={true}
      ></Modal>
    </>
  );
};

export default DeleteManager;
