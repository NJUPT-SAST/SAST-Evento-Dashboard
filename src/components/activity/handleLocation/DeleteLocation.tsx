import { changeLocation, deleteLocation, getLocations } from "@/apis/location";
import { Button, Input, Modal, Popover } from "@douyinfe/semi-ui";
import { useState } from "react";
import commonStyles from "../common.module.scss";

interface DeleteLocationProps {
  id: number;
  setTreeDate: (treeData: Array<object>) => void;
}

const DeleteLocation: React.FC<DeleteLocationProps> = ({ id, setTreeDate }) => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleOk = () => {
    deleteLocation(id).then((res) => {
      if (res.success === true) {
        getLocations().then((res) => {
          setTreeDate(res.data);
          setVisible(false);
        });
      }
    });
  };
  return (
    <>
      <Popover
        content={
          <article className={commonStyles.article}>选中地点,确认删除</article>
        }
        position="topRight"
      >
        <Button onClick={() => setVisible(true)} type="danger">
          删除
        </Button>
      </Popover>
      <Modal
        title={"确定要删除此地点吗？"}
        closable={false}
        visible={visible}
        onCancel={() => setVisible(false)}
        closeOnEsc={true}
        onOk={handleOk}
      ></Modal>
    </>
  );
};

export default DeleteLocation;
