import { Button, Input, Modal, Popover } from "@douyinfe/semi-ui";
import { useState } from "react";
import { getLocations, postLocation } from "@/apis/location";
import commonStyles from "../common.module.scss";

interface AddLocationProps {
  parentId: number;
  setTreeDate: (treeData: Array<object>) => void;
}

const AddLocation: React.FC<AddLocationProps> = ({ parentId, setTreeDate }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [location, setLocation] = useState<string>("");
  const handleOk = () => {
    postLocation(location, parentId).then((res) => {
      if (res.success === true) {
        getLocations().then((res) => {
          setTreeDate(res.data);
          setVisible(false);
          setLocation("");
        });
      }
    });
  };
  return (
    <>
      <Popover
        content={
          <article className={commonStyles.article}>
            选中添加子节点, 未选中添加根目录
          </article>
        }
        position="topRight"
      >
        <Button onClick={() => setVisible(true)}>新增</Button>
      </Popover>
      <Modal
        visible={visible}
        title={"添加地点"}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
        closeOnEsc={true}
      >
        <h4>请输入添加部门名称</h4>
        <Input value={location} onChange={setLocation}></Input>
      </Modal>
    </>
  );
};

export default AddLocation;
