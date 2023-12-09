import { Button, Modal, Transfer } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import styles from "./PutManager.module.scss";
import {
  manageTreeData,
  managerUserList,
  putManagers,
} from "@/apis/permission";

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
      console.log(res.data);
      const newTreeDate = addKeysToData(res.data);
      const labelNewTreeDate = updateTitleToLabel(newTreeDate);
      console.log(labelNewTreeDate);
      setTotalPermission(labelNewTreeDate);
    });
  };

  const getNewMangerPermission = (eventId: number, userId: string) => {
    managerUserList(eventId, userId).then((res) => {
      console.log(res);
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
    console.log("hello");
    putManagers(eventId, havePermission, userId).then((res) => {
      console.log(res);
    });
    setVisible(false);
  };

  //   TODO: 封装hook时，将这个数据修改封装一个工具里面
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
