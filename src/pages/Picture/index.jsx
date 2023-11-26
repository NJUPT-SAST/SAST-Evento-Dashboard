import React, { useEffect, useState } from "react";
import {
  Input,
  Tabs,
  TabPane,
  Image,
  Button,
  Pagination,
  Modal,
  Card,
} from "@douyinfe/semi-ui";
import AddHomeSlide from "../../components/AddCarousel";
import { getSlide, deleteSlide } from "../../utils/homeSlide";
import "./index.scss";

function Picture() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [patchVisible, setPatchVisible] = useState(false);
  const [chosenSlide, setChosenSlide] = useState();

  const getNewSlide = async () => {
    await getSlide(currentPage).then((res) => {
      console.log(res);
      console.log(res.data.data.slides);
      setData(res.data.data.slides);
      setTotal(res.data.data.total);
    });
  };

  useEffect(() => {
    //这里通过利用总视口高度，来根据window大小，动态调整目录的高度的大小
    getNewSlide();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getNewSlide();
  };

  const deletePicture = async () => {
    await deleteSlide(chosenSlide.id).then((res) => {
      console.log(res);
    });
    getNewSlide();
  };

  const changePictureMessage = async (slideId) => {
    console.log("hello");
    console.log(slideId);
  };

  //delete Modal框相关代码
  const showDeleteModal = (slideId) => {
    const newChosenSlide = data.find((obj) => obj.id === slideId);
    setChosenSlide(newChosenSlide);
    setDeleteVisible(true);
  };

  const handleDeleteOk = () => {
    setDeleteVisible(false);
    console.log("Ok button clicked");
    // console.log();
    deletePicture();
  };

  const handleDeleteCancel = () => {
    setDeleteVisible(false);
    console.log("Cancel button clicked");
  };

  const handleDeleteAfterClose = () => {
    console.log("After Close callback executed");
  };

  return (
    <>
      <div className="pictureContainer">
        <div className="mainContent">
          <Tabs tabPosition="left" type="button">
            {data &&
              data.map((item, index) => (
                <TabPane
                  tab={
                    <div className="TabNavContainer">
                      <img src={item.url} alt={item.title}></img>
                      <span>{item.title}</span>
                    </div>
                  }
                  itemKey={item.id}
                  key={index}
                  className="rightContainer"
                >
                  <div className="upToolBar">
                    <span>
                      <strong>编辑幻灯片</strong>
                    </span>
                    <div className="inputContainer">
                      <Input
                        prefix="Title"
                        showClear
                        className="input"
                        value={item.title}
                      ></Input>
                      <Input
                        prefix="Link"
                        showClear
                        className="input"
                        value={item.link}
                      ></Input>
                      <Button onClick={() => changePictureMessage(item.id)}>
                        确认修改
                      </Button>
                      <Button onClick={() => showDeleteModal(item.id)}>
                        删除幻灯片
                      </Button>
                    </div>
                  </div>
                  <Image src={item.url}></Image>
                </TabPane>
              ))}
          </Tabs>
          <div className="PaginationContainer">
            <Pagination total={total} onChange={handlePageChange}></Pagination>
          </div>
        </div>
        <Modal
          title="删除幻灯片"
          visible={deleteVisible}
          onOk={handleDeleteOk}
          afterClose={handleDeleteAfterClose} //>=1.16.0
          onCancel={handleDeleteCancel}
          closeOnEsc={true}
        >
          <span>
            <strong> 确定要删除该张幻灯片吗？</strong>
          </span>
          {chosenSlide && (
            <>
              <Card
                style={{ width: "100%" }}
                cover={<img alt="example" src={chosenSlide.url} />}
              >
                <span>
                  <strong>Title: {chosenSlide.title}</strong>
                </span>
              </Card>
            </>
          )}
        </Modal>
      </div>
    </>
  );
}

export default Picture;
