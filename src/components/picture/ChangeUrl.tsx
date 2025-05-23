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
} from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import { IconTick } from "@douyinfe/semi-icons";
import { pictureDate } from "@/utils/commonInterface";
import styles from "./ChangeUrl.module.scss";
import { Value } from "sass";

interface ChangeUrlProps {
  setUrl: (url: string) => void;
}

const ChangeUrl: React.FC<ChangeUrlProps> = ({ setUrl }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [pictureDir, setPictureDir] = useState<Array<string>>([""]);
  const [chosenPictureDir, setChosenPictureDir] = useState<string>("");
  const [imagesData, setImagesData] = useState<Array<pictureDate>>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [chosenPicture, setChosenPicture] = useState<number>(0);

  const showChangeModal = () => {
    getPictureDir().then((res) => {
      setPictureDir(res.data);
      setVisible(true);
      setChosenPictureDir(res.data[0]);
    });
  };

  useEffect(() => {
    getPictureList(chosenPictureDir, currentPage, 4).then((res: any) => {
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
    const newPictureData = imagesData.find((obj) => obj.id === chosenPicture);
    if (newPictureData) {
      setUrl(newPictureData.uri);
      setVisible(false);
    }
  };

  const changeTab = (value: string) => {
    setChosenPicture(Number(value));
  };


  return (
    <>
      <Button onClick={showChangeModal} type="warning">
        更换图片
      </Button>
      <Modal
        title="是否要更换图片"
        visible={visible}
        size="large"
        onOk={handleOk}
        onCancel={() => setVisible(false)}
        closeOnEsc={true}
      >
        <div className={styles.selectContainer}>
          <h4>请选择图库目录</h4>
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
          <Tabs tabPosition="left" type="button" onChange={changeTab}>
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
      </Modal>
    </>
  );
};

export default ChangeUrl;
