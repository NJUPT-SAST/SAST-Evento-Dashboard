import React from "react";
import { Popconfirm, Button } from "@douyinfe/semi-ui";
import { deleteSlide } from "../utils/homeSlide";

function DeleteHomeSlide(props) {
  const handleDelete = () => {
    const slideId = props.slideId;
    deleteSlide(slideId).then((res) => {
      console.log(res);
    });
  };
  return (
    <>
      <Popconfirm
        content="是否确认删除"
        title="确认"
        style={{ width: 320 }}
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
