import { deleteType, getTypes } from "@/apis/type";
import { Button, Modal } from "@douyinfe/semi-ui";
import { useState } from "react";

interface DeleteActivityTypeProps {
  id: number;
  typeName: string;
  setActivityTypes: (
    activityTypes: Array<{
      id: number;
      typeName: string;
      allowConflict: boolean;
    }>
  ) => void;
}

const DeleteActivityType: React.FC<DeleteActivityTypeProps> = ({
  id,
  typeName,
  setActivityTypes,
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleOk = () => {
    deleteType(id).then((res) => {
      console.log(res);
      if (res.success === true) {
        getTypes().then((res) => {
          setActivityTypes(res.data);
          setVisible(false);
        });
      }
    });
  };

  return (
    <>
      <Button onClick={() => setVisible(true)}>删除</Button>
      <Modal
        visible={visible}
        title={`确定要删除 ${typeName} 活动类型吗？`}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
        closeOnEsc={true}
      ></Modal>
    </>
  );
};

export default DeleteActivityType;
