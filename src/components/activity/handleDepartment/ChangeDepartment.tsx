import { Button, Input, Modal } from "@douyinfe/semi-ui";
import { useState } from "react";
import styles from "./ChangeDepartment.module.scss";
import { getDepartments, putDepartment } from "@/apis/departments";
import { VALID_LOADERS } from "next/dist/shared/lib/image-config";

interface ChangeDepartmentProps {
  id: number;
  departmentName: string;
  setDepartments: (
    departments: Array<{ id: number; departmentName: string }>
  ) => void;
}

const ChangeDepartment: React.FC<ChangeDepartmentProps> = ({
  id,
  departmentName,
  setDepartments,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [changeDepartmentName, setChangeDepartmentName] =
    useState<string>(departmentName);

  const handleOk = () => {
    putDepartment(id, changeDepartmentName).then((res) => {
      console.log(res);
      if (res.success === true) {
        getDepartments().then((res) => {
          console.log(res);
          setDepartments(res.data);
          setVisible(false);
        });
      }
    });
  };

  return (
    <>
      <Button onClick={() => setVisible(true)}>修改</Button>
      <Modal
        title={`修改部门名称`}
        visible={visible}
        onCancel={() => setVisible(false)}
        closeOnEsc={true}
        onOk={handleOk}
      >
        <h4>部门名称</h4>
        <Input
          className={styles.input}
          value={changeDepartmentName}
          onChange={setChangeDepartmentName}
        ></Input>
      </Modal>
    </>
  );
};

export default ChangeDepartment;
