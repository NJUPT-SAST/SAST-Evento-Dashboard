import { getPictureDir, getPictureList } from "@/apis/picture";
import {
  Button,
  Modal,
  Select,
  TabPane,
  Tabs,
  Image,
  Pagination,
  Toast,
  Input,
} from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import { IconTick } from "@douyinfe/semi-icons";
import { pictureDate, slideDate } from "@/utils/commonInterface";
import styles from "./AddPicture.module.scss";
import { addSlide, getSlide } from "@/apis/slide";

interface AddPictureProps {
  setParentTotal: (total: number) => void;
  setParentData: (data: any) => void;
  setChosenTabKey: (chosenTabKey: number) => void;
}

const AddPicture: React.FC<AddPictureProps> = ({
  setParentTotal,
  setParentData,
  setChosenTabKey,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [pictureDir, setPictureDir] = useState<Array<string>>([""]);
  const [chosenPictureDir, setChosenPictureDir] = useState<string>("");
  const [imagesData, setImagesData] = useState<Array<pictureDate>>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [chosenPicture, setChosenPicture] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [link, setLink] = useState<string>("");

  const showChangeModal = () => {
    getPictureDir().then((res) => {
      setPictureDir(res.data);
      setVisible(true);
      setChosenPictureDir(res.data[0]);
    });
  };

  useEffect(() => {
    getPictureList(chosenPictureDir, currentPage, 4).then((res: any) => {
      console.log(res.data);
      setImagesData(res.data.images);
      setTotal(res.data.total);
      setChosenPicture(res.data.images[0]?.id);
    });
  }, [chosenPictureDir, currentPage]);

  const changeSelect = (value: any) => {
    setChosenPictureDir(value);
    setCurrentPage(1);
  };

  const handleOk = () => {
    console.log(chosenPicture);
    if (imagesData && title && link) {
      console.log("hello");
      const uri = imagesData.find((obj) => obj.id === chosenPicture)?.uri;
      console.log(uri);
      console.log(title);
      console.log(link);
      addSlide(uri, link, title).then((res) => {
        console.log(res);
        if (res.success === true) {
          getSlide(currentPage).then((res: any) => {
            console.log(res.data);
            console.log(res.data.slides);
            setParentData(res.data.slides);
            setParentTotal(res.data.total);
            setVisible(false);
            setChosenTabKey(res.data.slides[0].id);
            setLink("");
            setTitle("");
          });
        }
      });
    }
    if (!title) {
      Toast.info({ content: "没有title" });
    }
    if (!link) {
      Toast.info({ content: "没有link" });
    }
  };

  const changeTab = (value: string) => {
    setChosenPicture(Number(value));
  };

  const changeChosenPicture = (value: string) => {
    setChosenPicture(Number(value));
  };

  return (
    <>
      <Button onClick={showChangeModal}>添加新的幻灯片</Button>
      <Modal
        title="添加新的幻灯片"
        visible={visible}
        size="large"
        onOk={handleOk}
        onCancel={() => setVisible(false)}
        closeOnEsc={true}
      >
        <div className={styles.inputFatherContainer}>
          <div className={styles.inputContainer}>
            <Input
              prefix="Title"
              className={styles.input}
              value={title}
              onChange={setTitle}
            ></Input>
            <Input
              prefix="Link"
              className={styles.input}
              value={link}
              onChange={setLink}
            ></Input>
          </div>
        </div>
        <div className={styles.imageSelect}>
          <div>
            <h4>请从图库中选择图片</h4>
            <Select
              defaultValue={chosenPictureDir}
              style={{ width: 120 }}
              onChange={changeSelect}
            >
              {pictureDir &&
                pictureDir.map((item, index) => (
                  <Select.Option key={index} value={item}>
                    {item}
                  </Select.Option>
                ))}
            </Select>
          </div>
          <div className={styles.changeUrlTabsContainer}>
            <Tabs
              tabPosition="left"
              type="button"
              onChange={changeChosenPicture}
            >
              {imagesData &&
                imagesData.map((item, index) => (
                  <TabPane tab={item.name} itemKey={`${item.id}`} key={index}>
                    <div className={styles.tabPaneContainer}>
                      <Image
                        src={item.uri}
                        alt={item.name}
                        width={700}
                        height={500}
                      ></Image>
                    </div>
                  </TabPane>
                ))}
            </Tabs>
            <div className={styles.PaginationContainer}>
              <Pagination
                total={total}
                pageSize={4}
                onChange={setCurrentPage}
                currentPage={currentPage}
              ></Pagination>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddPicture;
