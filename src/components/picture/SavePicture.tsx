import { getSlide, patchSlide } from "@/apis/slide";
import { Button, Modal } from "@douyinfe/semi-ui";
import { useState } from "react";
import { slideDate } from "@/utils/commonInterface";

interface SavePictureProps {
  url: string;
  title: string;
  link: string;
  slideId: number;
  setData: (data: any) => void;
  currentPage: number;
}

const SavePicture: React.FC<SavePictureProps> = ({
  url,
  title,
  link,
  slideId,
  setData,
  currentPage,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const handleOk = () => {
    patchSlide(url, link, title, String(slideId)).then((res) => {
      if (res.success === true) {
        getSlide(currentPage).then((res: any) => {
          setData(res.data.slides);
          setVisible(false);
        });
      }
    });
  };
  return (
    <>
      <Button onClick={() => setVisible(true)} type="warning">
        保存修改
      </Button>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        title={"确定要保存修改吗？"}
        onOk={handleOk}
      ></Modal>
    </>
  );
};

export default SavePicture;
