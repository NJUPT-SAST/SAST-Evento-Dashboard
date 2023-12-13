import { deleteSlide, getSlide } from "@/apis/slide";
import { Button, Modal } from "@douyinfe/semi-ui";
import { useState } from "react";

interface DeletePictureProps {
  eventId: number;
  setData: (data: any) => void;
  currentPage: number;
  setTotal: (total: number) => void;
  setChosenTabKey: (chosenTabKey: number) => void;
}

const DeletePicture: React.FC<DeletePictureProps> = ({
  eventId,
  currentPage,
  setData,
  setTotal,
  setChosenTabKey,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const handleOk = () => {
    console.log(eventId);
    deleteSlide(String(eventId)).then((res) => {
      if (res.success === true) {
        getSlide(currentPage).then((res: any) => {
          console.log(res.data);
          console.log(res.data.slides);
          setData(res.data.slides);
          setVisible(false);
          setChosenTabKey(res.data.slides[0].id);
          setTotal(res.data.total);
        });
      }
    });
  };
  return (
    <>
      <Button onClick={() => setVisible(true)} type="danger">
        删除幻灯片
      </Button>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        title={"确定要删除这张幻灯片吗？"}
        onOk={handleOk}
      ></Modal>
    </>
  );
};

export default DeletePicture;
