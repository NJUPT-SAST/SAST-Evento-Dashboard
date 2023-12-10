import { changeLocation, getLocations } from "@/apis/location";
import { Button, Input, Modal, Popover } from "@douyinfe/semi-ui";
import { useState } from "react";
import commonStyles from "../common.module.scss";

interface ChangeLocationProps {
  id: number;
  setTreeDate: (treeData: Array<object>) => void;
}

const ChangeLocation: React.FC<ChangeLocationProps> = ({ id, setTreeDate }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [location, setLocation] = useState<string>("");
  const handleOk = () => {
    console.log(location);
    console.log(id);
    changeLocation(id, location).then((res) => {
      console.log(res);
      if (res.success === true) {
        getLocations().then((res) => {
          console.log(res);
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
          <article className={commonStyles.article}>选中地点,确认修改</article>
        }
        position="top"
      >
        <Button onClick={() => setVisible(true)} type="warning">
          修改
        </Button>
      </Popover>
      <Modal
        title={"更改地点"}
        closable={false}
        visible={visible}
        onCancel={() => setVisible(false)}
        closeOnEsc={true}
        onOk={handleOk}
      >
        <h4>请输入修改后的部门名称</h4>
        <Input value={location} onChange={setLocation}></Input>
      </Modal>
    </>
  );
};

export default ChangeLocation;
