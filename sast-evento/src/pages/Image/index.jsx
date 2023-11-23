import React, { useState, useEffect, useRef } from "react";
import {
  Pagination,
  Button,
  RadioGroup,
  Modal,
  Upload,
} from "@douyinfe/semi-ui";
import { IconDelete, IconPlus } from "@douyinfe/semi-icons";
import { getPicturelist, addPicturelist } from "../../utils/images";
import "./index.scss";
import { IconUpload } from "@douyinfe/semi-icons";

const ImageList = () => {
  const fileInputRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [radiovalue, setRadiovalue] = useState("test");
  const [imageUrls, setImageUrls] = useState([
    // "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/bag.jpeg",
    // "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/Viamaker.png",
    // "https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/6fbafc2d-e3e6-4cff-a1e2-17709c680624.png",
    // "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/bag.jpeg",
    // "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/bag.jpeg",
    // "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/bag.jpeg",
    // "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/Viamaker.png",
    // "https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/6fbafc2d-e3e6-4cff-a1e2-17709c680624.png",
    // "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/bag.jpeg",
    // "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/bag.jpeg",
  ]);

  useEffect(() => {
    getPicturelist(radiovalue, page).then((res) => {
      console.log(res.data.data);
      const images = res.data.data.images;
      setTotal(res.data.data.total);
      const newimages = images.map((item) => item.url);
      setImageUrls(newimages);
    });
  }, []);

  useEffect(() => {
    console.log(imageUrls);
  }, [imageUrls]);

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
    setRadiovalue(e.target.value);
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
    const dir = radiovalue;
    addPicturelist(fileData, dir)
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
    console.log(file);
    setFileDate(file);
    return false;
  }

  let action = "https://evento.sast.fun/api/picture/info"

  return (
    <>
      <div className="container">
        <div className="left">
          <RadioGroup
            direction="vertical"
            options={plainOptions}
            onChange={ChangeRadio}
            value={radiovalue}
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
        请从本地选择需要添加的图片到 <strong>{radiovalue}</strong> 文件夹中
        <br />
        <div style={{ display: "flex", marginTop: 12 }}>
          <Upload
            style={{ padding: 10 }}
            limit={1}
            uploadTrigger="custom"
            action={action}
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
