import { addPictureList, getPictureList } from "@/apis/picture";
import { IconUpload } from "@douyinfe/semi-icons";
import { Button, Modal, Upload } from "@douyinfe/semi-ui";
import { Dispatch, SetStateAction, useState } from "react";
import styles from "./AddImageButton.module.scss";

type AddImageButtonProps = {
  page: number;
  chosenDir: string;
  setImageDate: Dispatch<
    SetStateAction<Array<{ uri: string; id: number; cosKey: string }>>
  >;
  setTotal: Dispatch<SetStateAction<number>>;
};

export default function AddImageButton({
  page,
  chosenDir,
  setImageDate,
  setTotal,
}: AddImageButtonProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File>(new File([], ""));

  const handleOkAddPicture = () => {
    // addPictureList
    console.log(chosenDir);
    addPictureList(imageFile, chosenDir).then((res) => {
      console.log(res);
      getPictureList(chosenDir, page, 6).then((res) => {
        setImageDate(res.data.images);
        setTotal(res.data.total);
      });
    });
    setVisible(false);
  };

  const getFile = (value: any) => {
    //这里获得file格式的图片文件
    console.log(value?.currentFile.fileInstance);
    const imageFile = value?.currentFile.fileInstance;
    setImageFile(imageFile);
  };

  let fileLimit = ".svg,.png,.jpeg,.jpg";

  return (
    <>
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        添加图片到图库
      </Button>
      <Modal
        title="添加图片"
        visible={visible}
        onOk={handleOkAddPicture}
        onCancel={() => setVisible(false)}
        closeOnEsc={true}
      >
        请从本地选择需要添加的图片到 <strong>{chosenDir}</strong> 文件夹中
        <div className={styles.uploadContainer}>
          <Upload
            accept={fileLimit}
            className={styles.upload}
            limit={1}
            onChange={getFile}
            uploadTrigger="custom"
          >
            <Button icon={<IconUpload />} theme="light">
              上传本地图片
            </Button>
          </Upload>
        </div>
      </Modal>
    </>
  );
}
