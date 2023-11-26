import React from "react";
import { Popconfirm, Button } from "@douyinfe/semi-ui";
import { deleteSlide } from "../utils/homeSlide";
import "./DeleteCarousel.scss";

function DeleteHomeSlide(props) {
  const handleDelete = () => {
    const slideId = props.slideId;
    //向父组件传值，设置isLoading为true
    props.onDeleteLoadingChange(true);
    deleteSlide(slideId)
      .then((res) => {
        console.log(res);
      })
      .finally(() => {
        props.onDeleteLoadingChange(false);
      });
  };

  return (
    <>
      <Popconfirm
        content="是否确认删除"
        title="确认"
        className="deletePopconfirm"
        onConfirm={handleDelete}
      >
        <Button theme="borderless" type="danger">
          删除
        </Button>
      </Popconfirm>
    </>
  );
}

export default DeleteHomeSlide;
