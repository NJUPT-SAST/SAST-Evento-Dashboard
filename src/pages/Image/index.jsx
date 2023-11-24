import React, { useState, useEffect, useRef } from "react";
import {
  Pagination,
  Button,
  RadioGroup,
  Modal,
  Upload,
  Image,
} from "@douyinfe/semi-ui";
import {
  getPictureList,
  addPictureList,
  deletePictureList,
} from "../../utils/images";
import "./index.scss";
import { IconUpload } from "@douyinfe/semi-icons";

const ImageList = () => {
  const fileInputRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [radioValue, setRadioValue] = useState("test");
  const [imageUrls, setImageUrls] = useState([]);
  const [testUpload, setTestUpload] = useState();
  const [visible, setVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [responseUrls, setResponseUrls] = useState();
  const fileInput = useRef();

  //将请求数据后的处理封装，增加复用性
  const getNewPictureList = () => {
    console.log("数据刷新了");
    getPictureList(radioValue, page).then((res) => {
      console.log(res);
      const images = res.data.data.images;
      setResponseUrls(res.data.data.images);
      setTotal(res.data.data.total);
      const newImages = images.map((item) => item.uri);
      setImageUrls(newImages);
    });
  };

  useEffect(() => {
    getNewPictureList();
  }, []);

  //当页面切换时，调用api刷新数据
  const handlePageChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    getNewPictureList();
  }, [page]);

  const handleDeleteImage = (url) => {
    console.log(url);
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  // 处理鼠标离开事件
  const handleMouseLeave = () => {
    // setHoveredIndex(null);
  };

  useEffect(() => {
    console.log(hoveredIndex);
  }, [hoveredIndex]);

  const plainOptions = ["test", "Guest", "Developer", "Maintainer"];

  //但radio的值发生变化时，请求api，调用数据
  const ChangeRadio = (e) => {
    setRadioValue(e.target.value);
  };

  useEffect(() => {
    console.log(radioValue);
    setPage(1);
    getNewPictureList();
  }, [radioValue]);

  //设置modal界面
  const showAddPicture = () => {
    setVisible(true);
  };

  //点击OK，上传文件
  const handleOkAddPicture = async () => {
    console.log(fileData);
    const dir = radioValue;
    await addPictureList(fileData, dir)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    getNewPictureList();
    setVisible(false);
  };

  const handleCancelAddPicture = () => {
    setVisible(false);
    console.log("Cancel button clicked");
  };

  const handleAfterCloseAddPicture = () => {
    console.log("After Close callback executed");
  };

  const [fileData, setFileDate] = useState();

  //当文件添加时，改变fileDate
  function getFile(file) {
    setFileDate(file.fileList[0].fileInstance);
    return false;
  }

  //这里是点击删除图片Modal的代码
  const showDeleteModal = () => {
    setDeleteVisible(true);
  };

  //设置异步，当delete完成之后，重新渲染数据
  const deleteHandleOK = async () => {
    const key = responseUrls[hoveredIndex].cosKey;
    const dir = radioValue;
    await deletePictureList(key, dir)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    setDeleteVisible(false);
    getNewPictureList();
  };

  const deleteHandleCancel = () => {
    setDeleteVisible(false);
  };
  return (
    <>
      <div className="container">
        <div className="left">
          <RadioGroup
            direction="vertical"
            options={plainOptions}
            onChange={ChangeRadio}
            value={radioValue}
            aria-label="单选组合示例"
          />
        </div>
        <div className="grid right">
          <label htmlFor="fileInput">
            <Button className="addButton" onClick={showAddPicture}>
              add images
            </Button>
          </label>
          <input
            ref={fileInputRef}
            id="fileInput"
            type="file"
            style={{ display: "none" }}
          />

          <div className="image-gallery">
            {imageUrls.map((url, index) => (
              <div className="imageContainer" key={index}>
                <Image
                  className="image"
                  src={url}
                  alt={`Image ${index + 1}`}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                />
                <Button
                  theme="solid"
                  type="danger"
                  style={{ marginRight: 8 }}
                  className="hoverButton"
                  onClick={showDeleteModal}
                >
                  X
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Pagination
          onChange={handlePageChange}
          total={total}
          pageSize={10}
          currentPage={page}
          style={{ marginTop: "10px" }}
        />
      </div>
      <Modal
        title="添加图片"
        visible={visible}
        onOk={handleOkAddPicture}
        afterClose={handleAfterCloseAddPicture} //>=1.16.0
        onCancel={handleCancelAddPicture}
        closeOnEsc={true}
      >
        请从本地选择需要添加的图片到 <strong>{radioValue}</strong> 文件夹中
        <br />
        <div style={{ display: "flex", marginTop: 12 }}>
          <Upload
            style={{ padding: 10 }}
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
      <Modal
        title="确定要删除该图片吗？"
        visible={deleteVisible}
        closeOnEsc={true}
        onOk={deleteHandleOK}
        onCancel={deleteHandleCancel}
        okText={"删除!"}
        okButtonProps={{ type: "danger" }}
      >
        <div style={{ display: "flex", marginTop: 12 }}></div>
      </Modal>
    </>
  );
};

export default ImageList;
