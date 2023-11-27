import React, { useEffect, useState, useRef } from "react";
import {
  Modal,
  Button,
  Input,
  Form,
  Col,
  Row,
  Pagination,
  Image,
  Select,
  Tabs,
  TabPane,
  Notification,
} from "@douyinfe/semi-ui";
import { IconUpload, IconTick } from "@douyinfe/semi-icons";
import "../component-scss/AddCarousel.scss";
import { getPictureList } from "../utils/images";
import "./AddCarousel.scss";
import { addSlide } from "../utils/homeSlide";

function AddHomeSlide({ onValueChange }) {
  const titleRef = useRef();
  const [data, setData] = useState();
  const [total, setTotal] = useState(0);
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [uploadImageVisible, setUploadImageVisible] = useState(false);
  const [select, setSelect] = useState("test");
  const [title, setTitle] = useState();
  const [link, setLink] = useState();
  const [isSelect, setIsSelect] = useState(false);
  const [chosenPicture, setChosenPicture] = useState();
  const [activePicture, setActivePicture] = useState();
  const [isAddPicture, setIsAddPicture] = useState();
  let opts = {
    title: "图片详情",
    content: "请点击图片放大查看",
    duration: 3,
    position: "top",
  };

  const handleChange = (e) => {
    setIsAddPicture(e);
    onValueChange(e); // 调用父组件的回调函数，将值传递给父组件
  };
  //这里将api请求和数据更新的代码封装起来
  const getNewPictureList = () => {
    getPictureList(select, page, 4).then((res) => {
      console.log("数据更新了");
      setTotal(res.data.data.total);
      setData(res.data.data);
      const images = res.data.data.images;
      setActivePicture(images[0]);
    });
  };

  useEffect(() => {
    if (data !== undefined) {
      console.log(data.images);
    }
  }, [data]);

  //这里是第一个modal的逻辑代码
  function showDialog() {
    setVisible(true);
  }
  async function handleOk() {
    setVisible(false);
    //这里调用添加接口
    const url = chosenPicture.uri;
    if (url === undefined && title === undefined && link === undefined) {
      //如果url和title和link都是空的，直接退出，不进行调用接口
    } else {
      await addSlide(url, link, title).then((res) => {
        console.log(res);
        handleChange(true);
        setTitle("");
        setLink("");
        setChosenPicture("");
      });
    }
  }
  function handleCancel() {
    setVisible(false);
  }

  function getTitle(value) {
    setTitle(value);
  }
  function getLink(value) {
    setLink(value);
  }

  //第二个modal的逻辑代码
  function showUploadImage() {
    setUploadImageVisible(true);
    setVisible(false);
    getNewPictureList();
    setIsSelect(false);
  }

  function handleImageOk() {
    setUploadImageVisible(false);
    setVisible(true);
    console.log("chosenPicture", chosenPicture);
  }

  function handleImageCancel() {
    setUploadImageVisible(false);
    setVisible(true);
    console.log(title);
  }

  const handleAfterClose = () => {
    console.log("After Close callback executed");
  };

  //页面切换时的逻辑代码
  const handlePageChange = (page) => {
    setPage(page);
    setIsSelect(false);
  };
  useEffect(() => {
    getNewPictureList();
  }, [page]);

  //select切换时的逻辑代码
  const handleSelectChange = (value) => {
    setSelect(value);
  };

  useEffect(() => {
    console.log(select);
    getNewPictureList();
  }, [select]);

  const selectPicture = (value) => {
    setIsSelect(value);
  };

  useEffect(() => {
    if (isSelect === true) {
      console.log(activePicture);
      setChosenPicture(activePicture);
    } else {
      setChosenPicture("");
    }
  }, [isSelect]);

  const tabChange = (key) => {
    setIsSelect(false);
    const findPicture = data.images.find((obj) => {
      return `${obj.id}` === key;
    });
    setActivePicture(findPicture);
  };

  useEffect(() => {
    console.log(chosenPicture);
  }, [chosenPicture]);

  return (
    <>
      <Button
        theme="borderless"
        className="button"
        onClick={showDialog}
        style={{ padding: "0", margin: "0" }}
      >
        添加首页图
      </Button>
      <Modal
        title="添加"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
      >
        <Form className="addCarouselForm">
          <Row>
            <Col span={12}>
              <Input
                ref={titleRef}
                placeholder={"添加标题"}
                style={{ width: "90%" }}
                onChange={getTitle}
                value={title}
              />
            </Col>
            <Col span={12}>
              <Input
                placeholder={"添加链接"}
                style={{ width: "90%" }}
                onChange={getLink}
                value={link}
              />
            </Col>
          </Row>
        </Form>
        <Button
          className="uploadButton"
          icon={<IconUpload />}
          theme="light"
          onClick={() => {
            showUploadImage();
            Notification.info(opts);
          }}
        >
          选择上传图片
        </Button>
        <div className="chosenPictureShowContainer">
          {chosenPicture && (
            <Image
              src={chosenPicture.uri}
              className="chosenPictureShow"
            ></Image>
          )}
        </div>
      </Modal>
      <Modal
        title="从图库中调用图片"
        visible={uploadImageVisible}
        onOk={handleImageOk}
        onCancel={handleImageCancel}
        afterClose={handleAfterClose}
        closeOnEsc={true}
        maskClosable={false}
      >
        <div className="selectContainer">
          <h3>请选择图库目录</h3>
          <Select
            defaultValue={select}
            style={{ width: 120 }}
            onChange={handleSelectChange}
          >
            <Select.Option value="test">test</Select.Option>
            <Select.Option value="Guest">Guest</Select.Option>
            <Select.Option value="Developer">Developer</Select.Option>
            <Select.Option value="Maintainer">Maintainer</Select.Option>
          </Select>
        </div>
        <Tabs
          tabPosition="left"
          type="button"
          className="TabContent"
          onChange={tabChange}
        >
          {data &&
            data.images.map((item, index) => (
              <TabPane
                tab={<span>{item.name}</span>}
                itemKey={`${item.id}`}
                key={item.id}
              >
                <div className="tabPaneContainer">
                  <div className="addCarouselImageContainer">
                    <Image src={data && item.uri}></Image>
                  </div>
                  {/* 这里设置了两个button，随着选定而跳转 */}
                  {!isSelect && (
                    <Button
                      onClick={() => selectPicture(true)}
                      style={{ marginRight: 14 }}
                    >
                      选定
                    </Button>
                  )}
                  {isSelect && (
                    <Button
                      icon={<IconTick />}
                      onClick={() => selectPicture(false)}
                      style={{ marginRight: 14 }}
                    >
                      选定
                    </Button>
                  )}
                </div>
              </TabPane>
            ))}
        </Tabs>
        <div className="paginationContainer">
          <Pagination
            total={total}
            pageSize={4}
            onChange={handlePageChange}
          ></Pagination>
        </div>
      </Modal>
    </>
  );
}

export default AddHomeSlide;
