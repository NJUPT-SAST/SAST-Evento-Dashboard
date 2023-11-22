import React, { useState, useEffect, useRef } from "react";
import {
  Pagination,
  Image,
  Button,
  Upload,
  RadioGroup,
  Radio,
} from "@douyinfe/semi-ui";
import { IconDelete, IconPlus } from "@douyinfe/semi-icons";
import { getPicturelist } from "../../utils/images";
import "./index.scss";

const ImageList = () => {
  const fileInputRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [page, setPage] = useState(1);
  const [radiovalue, setRadiovalue] = useState("test");
  const [imageUrls, setImageUrls] = useState([
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/bag.jpeg",
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/Viamaker.png",
    "https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/6fbafc2d-e3e6-4cff-a1e2-17709c680624.png",
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/bag.jpeg",
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/bag.jpeg",

    "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/bag.jpeg",
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/Viamaker.png",
    "https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/6fbafc2d-e3e6-4cff-a1e2-17709c680624.png",
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/bag.jpeg",
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/bag.jpeg",
  ]);

  useEffect(() => {
    getPicturelist(radiovalue, page).then((res) => {
      const images = res.data.data.images;
      console.log(images);
      const newimages = images.map((item) => item.uri);
      console.log(newimages);
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
    console.log(e.target.value);
  };

  const handleClick = () => {
    fileInputRef.current.click();
    console.log(fileInputRef);
  };


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
            <Button className="addButton" onClick={handleClick}>add images</Button>
          </label>
          <input ref={fileInputRef} id="fileInput" type="file" style={{ display: "none" }} />

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
    </>
  );
};

export default ImageList;
