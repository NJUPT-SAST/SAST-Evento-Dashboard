import { Button, Input, Modal, Toast, Transfer } from "@douyinfe/semi-ui";
import styles from "./AddManager.module.scss";
import { useEffect, useState } from "react";
import { addManagers, getAdminsList, manageTreeData } from "@/apis/permission";
import { getManagers } from "@/apis/event";
import addKeysToData from "@/utils/addKeysToData";

interface AddManagerProps {
  eventId: number;
  setManagerData: (managerDate: Array<object | any>) => void;
}

const AddManager: React.FC<AddManagerProps> = ({ eventId, setManagerData }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [totalPermission, setTotalPermission] = useState<Array<object>>([{}]);
  const [havePermission, setHavePermission] = useState<Array<string>>([""]);
  const [studentNickname, setStudentNickname] = useState<string>("");
  const [adminList, setAdminList] =
    useState<Array<{ nickname: string; id: string }>>();

  const getNewTotalManageTreeDate = (eventId: number) => {
    manageTreeData(eventId).then((res: { data: Array<any> }) => {
      console.log(res.data);
      const newTreeDate = addKeysToData(res.data);
      const labelNewTreeDate = updateTitleToLabel(newTreeDate);
      console.log(labelNewTreeDate);
      setTotalPermission(labelNewTreeDate);
    });
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

  const changeHavePermission = (value: Array<any>) => {
    console.log(value);
    setHavePermission(value);
  };

  const showAddManager = () => {
    setVisible(true);
    getNewTotalManageTreeDate(eventId);
    getAdminsList("", "").then((res) => {
      console.log(res.data);
      setAdminList(res.data.users);
    });
  };

  const addManager = () => {
    console.log("hello");
    console.log(studentNickname);
    const isActive = adminList?.find((obj) => obj.nickname === studentNickname);
    console.log(isActive);
    if (isActive) {
      addManagers(eventId, isActive?.id, havePermission).then((res) => {
        console.log(res);
        getManagers(eventId).then((res) => {
          console.log(res.data.users);
          setManagerData(res.data.users);
        });
      });
      setHavePermission([""]);
      setVisible(false);
    } else {
      Toast.info({ content: "此成员不存在" });
    }
  };

  const footer = (
    <div>
      <Button type="primary" theme="solid" onClick={addManager}>
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
      <Button className={styles.button} onClick={showAddManager}>
        添加管理员
      </Button>
      <Modal
        title={"添加管理员"}
        size="medium"
        closable={false}
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={footer}
        closeOnEsc={true}
      >
        <div className={styles.studentIdContent}>
          <h4>需要添加管理者姓名：</h4>
          <Input className={styles.input} onChange={setStudentNickname}></Input>
        </div>
        <div className={styles.permissionContent}>
          <h4>确定添加权限</h4>
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

export default AddManager;
