import {
  changeUserPermission,
  getAdminTreeDate,
  getUserPermission,
} from "@/apis/permission";
import addKeysToData from "@/utils/addKeysToData";
import { Button, Modal, Transfer } from "@douyinfe/semi-ui";
import React, { useState } from "react";

interface ShowPermissionProps {
  userId: string;
}

export const ChangePermission: React.FC<ShowPermissionProps> = ({ userId }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [treeData, setTreeDate] = useState<Array<object>>([]);
  const [havePermission, setHavePermission] = useState<Array<string>>([]);

  const onChangeOk = () => {
    changeUserPermission(userId, havePermission).then((res) => {
    });
    setVisible(false);
  };

  const showChange = () => {
    getUserPermission("", userId).then((res) => {
      setHavePermission(res.data);
    });
    getAdminTreeDate().then((res) => {
      const newTreeDate = addKeysToData(res.data);
      const labelNewTreeDate = updateTitleToLabel(newTreeDate);
      setTreeDate(labelNewTreeDate);
    });
    setVisible(true);
  };

  function changeHavePermission(value: Array<any>): void {
    setHavePermission(value);
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
      <Button onClick={showChange}>
        <span style={{ color: "rgb(252,136,63)" }}>权限修改</span>
      </Button>
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
