import { deleteDepartment, getDepartments } from "@/apis/departments";
import { Button, Modal } from "@douyinfe/semi-ui";
import { useState } from "react";

interface DeleteDepartmentProps {
  id: number;
  departmentName: string;
  setDepartments: (
    departments: Array<{ id: number; departmentName: string }>
  ) => void;
}

const DeleteDepartments: React.FC<DeleteDepartmentProps> = ({
  id,
  departmentName,
  setDepartments,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  console.log(id);
  const handleOk = () => {
    deleteDepartment(id).then((res) => {
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
      <Button onClick={() => setVisible(true)} type="danger">
        删除
      </Button>
      <Modal
        visible={visible}
        title={`确定要删除 ${departmentName} 吗？`}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
        closeOnEsc={true}
      ></Modal>
    </>
  );
};

export default DeleteDepartments;
