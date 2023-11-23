import React, { useState } from "react";
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
} from "@douyinfe/semi-ui";
import { IconUpload } from "@douyinfe/semi-icons";
import "../component-scss/AddCarousel.scss";

function AddHomeSlide() {
  const [imageUrls, setImageUrls] = useState([
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/bag.jpeg",
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/Viamaker.png",
    "https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/6fbafc2d-e3e6-4cff-a1e2-17709c680624.png",
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/bag.jpeg",
  ]);
  const [visible, setVisible] = useState(false);
  const data = {
    url: "",
    title: "",
    link: "",
  };
  const [uploadImageVisible, setUploadImageVisible] = useState(false);
  let limit = 1;
  function showDialog() {
    setVisible(true);
  }
  function handleOk() {
    setVisible(false);
    console.log(data);
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
  function getFile(file) {
    data.url = file;
    return false;
  }

  function showUploadImage() {
    setUploadImageVisible(true);
    setVisible(false);
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
        <Form style={{ padding: 10, width: "100%" }}>
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
        {/* <Upload
          style={{ padding: 10 }}
          limit={limit}
          uploadTrigger="custom"
          onChange={getFile}
        > */}
        <Button icon={<IconUpload />} theme="light" onClick={showUploadImage}>
          上传图片
        </Button>
        {/* </Upload> */}
      </Modal>
      <Modal
        title="添加图片"
        visible={uploadImageVisible}
        onOk={handleImageOk}
        onCancel={handleImageCancel}
        afterClose={handleAfterClose}
        closeOnEsc={true}
      >
        <h3>图库</h3>
        <div
          style={{
            width: 400,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "5px",
          }}
        >
          {imageUrls.map((url, index) => (
            <div className="image" key={index}>
              <img
                src={url}
                alt={`Image ${index + 1}`}
                style={{ width: "100%" }}
              />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", marginTop: 5 }}>
          <Pagination total={20} pageSize={4}></Pagination>
        </div>
        <div style={{ display: "flex", marginTop: 12 }}>
          <Upload
            style={{ padding: 10 }}
            limit={limit}
            uploadTrigger="custom"
            onChange={getFile}
          >
            <Button
              icon={<IconUpload />}
              theme="light"
              onClick={showUploadImage}
            >
              上传本地图片
            </Button>
          </Upload>
        </div>
      </Modal>
    </>
  );
}

export default AddHomeSlide;
