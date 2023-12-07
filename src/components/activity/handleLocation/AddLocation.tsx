import { Button, Popover } from "@douyinfe/semi-ui";
import styles from "./AddLocation.module.scss";
import { useState } from "react";

const AddLocation: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <Popover
        content={
          <article className={styles.article}>
            选中添加子节点, 未选中添加根目录
          </article>
        }
        position="topRight"
      >
        <Button>新增</Button>
      </Popover>
    </>
  );
};

export default AddLocation;
