import { Button, Modal, Tag, Toast } from "@douyinfe/semi-ui";
import styles from "./ShowPermission.module.scss";
import React, { useEffect, useState } from "react";
import { getUserPermission } from "@/apis/permission";
import test, { it } from "node:test";

interface ShowPermissionProps {
  studentId: string;
}

export const ShowPermission: React.FC<ShowPermissionProps> = ({
  studentId,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [havePermission, setHavePermission] = useState<Array<string>>([]);

  const showMore = () => {
    setVisible(true);
    getUserPermission(studentId, "").then((res) => {
      setHavePermission(res.data);
    });
  };

  const copyText = async (item: string) => {
    try {
      await navigator.clipboard.writeText(item);
      Toast.info("copy!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button onClick={showMore}>
        <span style={{ color: "rgb(0,100,250)" }}>权限详情</span>
      </Button>
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
                <Tag
                  size="small"
                  color="cyan"
                  key={index}
                  onClick={() => copyText(item)}
                >
                  <span className={styles.tagSpan}>{item}</span>
                </Tag>
              );
            })}
        </div>
      </Modal>
    </>
  );
};
