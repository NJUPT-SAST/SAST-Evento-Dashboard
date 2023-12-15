import { Button, Modal, Transfer } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import styles from "./PutManager.module.scss";
import {
  manageTreeData,
  managerUserList,
  putManagers,
} from "@/apis/permission";
import addKeysToData from "@/utils/addKeysToData";

interface PutManagerProps {
  eventId: number;
  userId: string;
  userName: string;
}

const PutManager: React.FC<PutManagerProps> = ({
  eventId,
  userId,
  userName,
}) => {
  const [totalPermission, setTotalPermission] = useState<Array<object>>([{}]);
  const [havePermission, setHavePermission] = useState<Array<string>>([""]);

  const getNewTotalManageTreeDate = (eventId: number) => {
    manageTreeData(eventId).then((res: { data: Array<any> }) => {
      const newTreeDate = addKeysToData(res.data);
      
      const labelNewTreeDate = updateTitleToLabel(newTreeDate);
      setTotalPermission(labelNewTreeDate);
    });
  };

  const getNewMangerPermission = (eventId: number, userId: string) => {
    managerUserList(eventId, userId).then((res) => {
      setHavePermission(res.data);
    });
  };

  const showPutModal = () => {
    getNewTotalManageTreeDate(eventId);
    getNewMangerPermission(eventId, userId);
    setVisible(true);
  };

  const changeHavePermission = (value: Array<any>) => {
    setHavePermission(value);
  };

  const handleOk = () => {
    putManagers(eventId, havePermission, userId).then((res) => {
    });
    setVisible(false);
  };

  //这里后端传入的内容是title，但是组件需要的是label
  function updateTitleToLabel(data: Array<object>) {
    function updateTitle(obj: any) {
      obj.label = obj.title;
      delete obj.title;

      if (obj.children) {
        for (let i = 0; i < obj.children.length; i++) {
          updateTitle(obj.children[i]);
        }
      }
    }

    for (let i = 0; i < data.length; i++) {
      updateTitle(data[i]);
    }
    return data;
  }

  const [visible, setVisible] = useState<boolean>(false);

  const footer = (
    <div>
      <Button type="primary" theme="solid" onClick={handleOk}>
        确认
      </Button>
      <Button
        type="primary"
        theme="borderless"
        onClick={() => setVisible(false)}
      >
        取消
      </Button>
    </div>
  );

  return (
    <>
      <Button onClick={showPutModal}>编辑</Button>
      <Modal
        title={`姓名：${userName}`}
        size="medium"
        closable={false}
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={footer}
        closeOnEsc={true}
      >
        <div className={styles.transferContent}>
          <h4>权限编辑</h4>
          <Transfer
            dataSource={totalPermission}
            type="treeList"
            className={styles.transfer}
            value={havePermission}
            onChange={changeHavePermission}
          ></Transfer>
        </div>
      </Modal>
    </>
  );
};

export default PutManager;
