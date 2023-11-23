import React, { useState, useEffect, useRef } from "react";
import {
  Pagination,
  Button,
  RadioGroup,
  Modal,
  Upload,
} from "@douyinfe/semi-ui";
import { getPictureList, addPictureList } from "../../utils/images";
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
  const fileInput = useRef();

  useEffect(() => {
    getPictureList(radioValue, page).then((res) => {
      console.log(res.data.data);
      const images = res.data.data.images;
      setTotal(res.data.data.total);
      const newimages = images.map((item) => item.uri);
      console.log(newimages);
      setImageUrls(newimages);
    });
  }, []);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleDeleteImage = (url) => {
    console.log(url);
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  // 处理鼠标离开事件
  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  useEffect(() => {
    console.log(hoveredIndex);
  }, [hoveredIndex]);

  const plainOptions = ["test", "Guest", "Developer", "Maintainer"];

  const ChangeRadio = (e) => {
    setRadioValue(e.target.value);
  };

  const handleClick = () => {
    fileInputRef.current.click();
    console.log(fileInputRef);
  };

  //设置modal界面
  const [visible, setVisible] = useState(false);

  const showAddPicture = () => {
    setVisible(true);
  };

  const handleOkAddPicture = () => {
    //点击OK，上传文件
    console.log(fileData);
    const dir = radioValue;
    addPictureList(fileData, dir)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("have post picture file");
    setVisible(false);
    console.log("Ok button clicked");
  };

  const handleCancelAddPicture = () => {
    setVisible(false);
    console.log("Cancel button clicked");
  };

  const handleAfterCloseAddPicture = () => {
    console.log("After Close callback executed");
  };

  const [fileData, setFileDate] = useState();

  function getFile(file) {
    console.log("fileList", file.fileList[0].fileInstance);
    console.log("current", file.currentFile);
    setFileDate(file.fileList[0].fileInstance);
    return false;
  }

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
              <div className="image" key={index}>
                <img
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
          total={imageUrls.length}
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
    </>
  );
};

export default ImageList;
