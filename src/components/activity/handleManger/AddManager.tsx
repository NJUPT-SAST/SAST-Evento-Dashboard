import { Button, Input, Modal, Transfer } from "@douyinfe/semi-ui";
import styles from "./AddManager.module.scss";
import { useState } from "react";
import { addManagers, manageTreeData } from "@/apis/permission";
import { getManagers } from "@/apis/event";

interface AddManagerProps {
  eventId: number;
  setManagerData: (managerDate: Array<object | any>) => void;
}

const AddManager: React.FC<AddManagerProps> = ({ eventId, setManagerData }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [totalPermission, setTotalPermission] = useState<Array<object>>([{}]);
  const [havePermission, setHavePermission] = useState<Array<string>>([""]);
  const [studentId, setStudentId] = useState<string>("");

  const getNewTotalManageTreeDate = (eventId: number) => {
    manageTreeData(eventId).then((res: { data: Array<any> }) => {
      console.log(res.data);
      const newTreeDate = addKeysToData(res.data);
      const labelNewTreeDate = updateTitleToLabel(newTreeDate);
      console.log(labelNewTreeDate);
      setTotalPermission(labelNewTreeDate);
    });
  };

  //   TODO: 封装hook时，将这个数据修改封装在一个工具里面
  //这里后端传入的数据不含有key，在这个函数中给每一个树形结构加上一个key，用来渲染
  function addKeysToData(
    data: Array<{ children: any }>,
    prefix = ""
  ): Array<{ children: Array<object> }> {
    if (data !== null) {
      return data.map((item, index) => {
        const key = prefix + index.toString(); // 生成当前节点的key

        // 判断当前节点是否有子节点
        if (item.children && item.children.length > 0) {
          // 递归调用addKeysToData函数为子节点添加key，并将当前节点的key作为前缀传递下去
          const children: any = addKeysToData(item.children, key + "-");

          // 返回带有key的当前节点及其子节点
          return {
            ...item,
            key,
            children,
          };
        }

        // 返回带有key的当前节点（无子节点）
        return {
          ...item,
          key,
        };
      });
    }

    return []; // 添加默认的返回结果，当data为null时返回空数组
  }

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
  };

  const addManager = () => {
    console.log("hello");
    addManagers(eventId, studentId, havePermission).then((res) => {
      console.log(res);
      getManagers(eventId).then((res) => {
        console.log(res.data.users);
        setManagerData(res.data.users);
      });
    });
    setHavePermission([""]);
    setVisible(false);
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
          <h4>需要添加管理者学号：</h4>
          <Input className={styles.input} onChange={setStudentId}></Input>
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
