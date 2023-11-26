import React, { useState, useEffect } from "react";
import {
  Pagination,
  Button,
  Modal,
  Upload,
  Image,
  Tabs,
  TabPane,
} from "@douyinfe/semi-ui";
import {
  getPictureList,
  getPictureDir,
  addPictureList,
  deletePictureList,
} from "../../utils/images";
import "./index.scss";
import { IconUpload } from "@douyinfe/semi-icons";

const ImageList = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [tabValue, setTabValue] = useState("Developer");
  const [imageUrls, setImageUrls] = useState([]);
  const [visible, setVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [responseUrls, setResponseUrls] = useState();
  const [pictureDir, setPictureDir] = useState();

  //将请求数据后的处理封装，增加复用性
  const getNewPictureList = async () => {
    await getPictureList(tabValue, page, 6).then((res) => {
      console.log(res);
      const images = res.data.data.images;
      setResponseUrls(res.data.data.images);
      setTotal(res.data.data.total);
      const newImages = images.map((item) => item.uri);
      setImageUrls(newImages);
    });
  };

  const getNewPictureDir = async () => {
    await getPictureDir().then((res) => {
      console.log(res);
      setPictureDir(res.data.data);
    });
  };

  useEffect(() => {
    getNewPictureList();
    getNewPictureDir();
  }, []);

  //当页面切换时，调用api刷新数据
  const handlePageChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    getNewPictureList();
  }, [page]);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  // 处理鼠标离开事件
  const handleMouseLeave = () => {
    // setHoveredIndex(null);
  };

  //但radio的值发生变化时，请求api，调用数据
  const changeTab = (activeKey) => {
    setTabValue(activeKey);
  };

  useEffect(() => {
    setPage(1);
    getNewPictureList();
    //当tab切换时，页面上次渲染的图片未清除，这里设置重置imageUrls数组里面的内容
    setImageUrls([]);
  }, [tabValue]);

  //设置modal界面
  const showAddPicture = () => {
    setVisible(true);
  };

  //点击OK，上传文件
  const handleOkAddPicture = async () => {
    const dir = tabValue;
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
    const dir = tabValue;
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
        <div className="addButtonContainer">
          <Button className="addButton" onClick={showAddPicture}>
            添加图片到图库
          </Button>
        </div>
        <div className="mainContentContainer">
          <Tabs tabPosition="left" type="button" onChange={changeTab}>
            {pictureDir &&
              pictureDir.map((item, index) => (
                <TabPane
                  tab={<span>{item}</span>}
                  itemKey={item}
                  className="tabPane"
                  key={index}
                >
                  <div style={{ padding: "0 24px" }}>
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
                          <button
                            className="hoverButton"
                            onClick={showDeleteModal}
                          >
                          {/* 这里的叉号的居中有问题需要修改 */}
                            X
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabPane>
              ))}
          </Tabs>
          <div className="bottomPagination">
            <Pagination
              onChange={handlePageChange}
              total={total}
              pageSize={6}
              currentPage={page}
            />
          </div>
        </div>
      </div>
      <Modal
        title="添加图片"
        visible={visible}
        onOk={handleOkAddPicture}
        onCancel={handleCancelAddPicture}
        closeOnEsc={true}
      >
        请从本地选择需要添加的图片到 <strong>{tabValue}</strong> 文件夹中
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
      ></Modal>
    </>
  );
};

export default ImageList;
