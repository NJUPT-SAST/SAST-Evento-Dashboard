import { getLocations } from "@/apis/location";
import { Button, SideSheet, TreeSelect } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import styles from "./HandleLocation.module.scss";
import AddLocation from "./AddLocation";
import ChangeLocation from "./ChangeLocation";
import DeleteLocation from "./DeleteLocation";
import getAdminPermission, { Permissions } from "@/utils/getAdminPermission";

const HandleLocation: React.FC = () => {
  const [treeData, setTreeData] = useState<Array<object>>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const [permissions, setPermissions] = useState<Permissions>();
  const [windowWidth, setWindowWidth] = useState<number>(0);
  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    getLocations().then((res) => {
      setTreeData(res.data);
    });
    const permissions = getAdminPermission();
    setPermissions(permissions);
  }, []);

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
        width={`${windowWidth > 1000 ? "40vw" : "100vw"}`}
      >
        <TreeSelect
          autoExpandParent={true}
          expandAll={true}
          filterTreeNode
          onChange={getLabel}
          style={{ width: "70%" }}
          treeData={treeData}
          placeholder="活动地点"
        />
        <div className={styles.divider}></div>
        <div className={styles.buttonContainer}>
          {permissions?.addLocation && (
            <AddLocation parentId={id} setTreeDate={setTreeData}></AddLocation>
          )}
          {permissions?.updateLocationName && (
            <ChangeLocation id={id} setTreeDate={setTreeData}></ChangeLocation>
          )}
          {permissions?.deleteLocation && (
            <DeleteLocation id={id} setTreeDate={setTreeData}></DeleteLocation>
          )}
        </div>
      </SideSheet>
    </>
  );
};

export default HandleLocation;
