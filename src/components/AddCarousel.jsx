import React, { useEffect, useState, useRef } from "react";
import {
  Modal,
  Button,
  Upload,
  Input,
  Form,
  Col,
  Row,
  Pagination,
  Image,
  Select,
} from "@douyinfe/semi-ui";
import { IconUpload, IconTick } from "@douyinfe/semi-icons";
import "../component-scss/AddCarousel.scss";
import { getPictureList } from "../utils/images";
import "./AddCarousel.scss";

function AddHomeSlide() {
  const [imageUrls, setImageUrls] = useState([]);
  const [total, setTotal] = useState(0);
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [hoverIndex, setHoveredIndex] = useState();
  const data = {
    url: "",
    title: "",
    link: "",
  };
  const [uploadImageVisible, setUploadImageVisible] = useState(false);
  let limit = 1;
  const [select, setSelect] = useState("test");
  const imageRef = useRef();

  //这里将api请求和数据更新的代码封装起来
  const getNewPictureList = () => {
    getPictureList(select, page, 4).then((res) => {
      console.log("数据更新了");
      setTotal(res.data.data.total);
      const images = res.data.data.images;
      const newImages = images.map((item) => item.uri);
      console.log(newImages);
      setImageUrls(newImages);
    });
  };

  useEffect(() => {}, []);

  //这里是第一个modal的逻辑代码
  function showDialog() {
    setVisible(true);
  }
  function handleOk() {
    setVisible(false);
    //这里调用添加接口
  }
  function handleCancel() {
    setVisible(false);
  }

  function getTitle(value) {
    data.title = value;
  }
  function getLink(value) {
    data.link = value;
  }

  //第二个modal的逻辑代码
  function showUploadImage() {
    setUploadImageVisible(true);
    setVisible(false);
    getNewPictureList();
  }

  function handleImageOk() {
    setUploadImageVisible(false);
    setVisible(true);
  }

  function handleImageCancel() {
    setUploadImageVisible(false);
    setVisible(true);
  }

  const handleAfterClose = () => {
    console.log("After Close callback executed");
  };

  //页面切换时的逻辑代码
  const handlePageChange = (page) => {
    setPage(page);
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

  //选中图片的代码
  //这里直接操作dom，修改了指定的button的opacity，来设置被选中的图片
  const handleSelect = () => {};

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  return (
    <>
      <Button theme="solid" className="button" onClick={showDialog}>
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
                placeholder={"添加标题"}
                style={{ width: "90%" }}
                onChange={getTitle}
              />
            </Col>
            <Col span={12}>
              <Input
                placeholder={"添加链接"}
                style={{ width: "90%" }}
                onChange={getLink}
              />
            </Col>
          </Row>
        </Form>
        <Button
          className="uploadButton"
          icon={<IconUpload />}
          theme="light"
          onClick={showUploadImage}
        >
          上传图片
        </Button>
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
        <div className="addCarouselImageContainer" ref={imageRef}>
          {imageUrls.map((url, index) => (
            <div className="addCarouselImageItem" key={index}>
              {/* 选定图片的动画没写好 */}
              <Image
                src={url}
                alt={`Image ${index + 1}`}
                className="addCarouselImage"
                onMouseEnter={() => handleMouseEnter(index)}
              />
              <button className="addCarouselButton" onClick={handleSelect}>
                <IconTick />
              </button>
            </div>
          ))}
        </div>
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
