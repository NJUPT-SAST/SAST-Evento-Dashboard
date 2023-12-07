import { getLocations } from "@/apis/location";
import { Button, SideSheet, TreeSelect } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import styles from "./HandleLocation.module.scss";
import AddLocation from "./AddLocation";

const HandleLocation: React.FC = () => {
  const [treeData, setTreeData] = useState<Array<object>>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    getLocations().then((res) => {
      setTreeData(res.data);
    });
  }, []);

  //TODO: 这里的value是一个any，需要修改
  const getLabel = (value: any) => {
    const numberValue = JSON.parse(value);
    setId(numberValue);
  };

  return (
    <>
      <Button onClick={() => setVisible(true)}>活动地点</Button>
      <SideSheet
        title="活动地点管理"
        visible={visible}
        onCancel={() => setVisible(false)}
        width="30vw"
      >
        <TreeSelect
          filterTreeNode
          onChange={getLabel}
          style={{ width: "70%" }}
          treeData={treeData}
          placeholder="地点(可搜索)"
        />
        <div className={styles.buttonContainer}>
          <AddLocation></AddLocation>
          <Button>更改</Button>
          <Button>删除</Button>
        </div>
      </SideSheet>
    </>
  );
};

export default HandleLocation;
