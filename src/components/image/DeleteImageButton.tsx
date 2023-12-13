import {
  deletePictureList,
  getPictureDir,
  getPictureList,
} from "@/apis/picture";
import { Button, Modal } from "@douyinfe/semi-ui";
import { useState } from "react";
import styles from "./DeleteImageButton.module.scss";
import { IconDelete } from "@douyinfe/semi-icons";

interface DeleteImagesButtonProps {
  cosKey: string;
  dir: string;
  setTotal: (total: number) => void;
  setImageData: (
    imageData: Array<{ uri: string; id: number; cosKey: string }>
  ) => void;
}

const DeleteImagesButton: React.FC<DeleteImagesButtonProps> = ({
  cosKey,
  dir,
  setTotal,
  setImageData,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const deleteImg = () => {
    console.log(dir);
    deletePictureList(cosKey, dir).then((res) => {
      if (res.success === true) {
        getPictureList(dir, 1, 6).then((res: any) => {
          setImageData(res.data.images);
          setTotal(res.data.total);
          setVisible(false);
        });
      }
    });
  };
  return (
    <>
      <Button
        style={{ backgroundColor: "rgb(249,113,90)" }}
        icon={<IconDelete size="large" />}
        onClick={() => setVisible(true)}
        type="tertiary"
      />
      <Modal
        visible={visible}
        title={"确定要删除这张图片吗？"}
        onCancel={() => setVisible(false)}
        onOk={deleteImg}
      ></Modal>
    </>
  );
};

export default DeleteImagesButton;
