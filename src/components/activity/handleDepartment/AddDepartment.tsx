import { addDepartment, getDepartments } from "@/apis/departments";
import { Button, Input, Modal } from "@douyinfe/semi-ui";
import { useState } from "react";

interface AddDepartmentProps {
  setDepartments: (
    departments: Array<{ id: number; departmentName: string }>
  ) => void;
}

const AddDepartment: React.FC<AddDepartmentProps> = ({ setDepartments }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [departmentName, setDepartmentName] = useState<string>("");

  const handleOk = () => {
    // console.log(departmentName);
    addDepartment(departmentName).then((res) => {
      console.log(res);
      if (res.success === true) {
        getDepartments().then((res) => {
          console.log(res);
          setDepartments(res.data);
          setVisible(false);
          setDepartmentName("");
        });
      }
    });
  };

  return (
    <>
      <Button onClick={() => setVisible(true)}>添加部门</Button>
      <Modal
        visible={visible}
        title={"添加部门"}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
        closeOnEsc={true}
      >
        <h4>请输入添加部门名称</h4>
        <Input value={departmentName} onChange={setDepartmentName}></Input>
      </Modal>
    </>
  );
};

export default AddDepartment;
