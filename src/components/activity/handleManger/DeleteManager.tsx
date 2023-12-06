import { Button, Modal } from "@douyinfe/semi-ui";
import { useState } from "react";
import { IconDelete } from "@douyinfe/semi-icons";
import styles from "./DeleteManager.module.scss";

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
  return (
    <>
      {/* TODO:这里的删除未调接口，等待增加管理员做好后，再调删除管理员接口*/}
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
        // footer={footer}
        closeOnEsc={true}
      ></Modal>
    </>
  );
};

export default DeleteManager;
