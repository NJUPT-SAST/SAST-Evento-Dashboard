import {
  changeUserPermission,
  getAdminTreeDate,
  getUserPermission,
} from "@/apis/permission";
import { Button, Modal, Transfer } from "@douyinfe/semi-ui";
import { useState } from "react";

type ShowPermissionProps = { userId: string };

export const ChangePermission = ({ userId }: ShowPermissionProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [treeData, setTreeDate] = useState<Array<object>>([]);
  const [havePermission, setHavePermission] = useState<Array<string>>([]);

  const onChangeOk = () => {
    changeUserPermission(userId, havePermission).then((res) => {
      console.log(res);
    });
    setVisible(false);
  };

  const showChange = () => {
    getUserPermission("", userId).then((res) => {
      setHavePermission(res.data);
    });
    getAdminTreeDate().then((res) => {
      console.log(res);
      const newTreeDate = addKeysToData(res.data);
      const labelNewTreeDate = updateTitleToLabel(newTreeDate);
      console.log(labelNewTreeDate);
      setTreeDate(labelNewTreeDate);
    });
    setVisible(true);
  };

  function changeHavePermission(value: Array<any>): void {
    setHavePermission(value);
  }

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

  return (
    <>
      <Button onClick={showChange}>权限修改</Button>
      <Modal
        title="权限修改"
        maskClosable={false}
        visible={visible}
        onOk={onChangeOk}
        onCancel={() => setVisible(false)}
        size="medium"
      >
        <Transfer
          dataSource={treeData}
          type="treeList"
          value={havePermission}
          onChange={changeHavePermission}
        ></Transfer>
      </Modal>
    </>
  );
};
