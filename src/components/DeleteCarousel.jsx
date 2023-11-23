import React from "react";
import { Popconfirm, Button } from "@douyinfe/semi-ui";

function DeleteHomeSlide(props) {
  const handledelete = () => {
    console.log(props.slideId);
  };
  return (
    <>
      <Popconfirm
        content="是否确认删除"
        title="确认"
        style={{ width: 320 }}
        onConfirm={handledelete}
      >
        <Button theme="borderless" type="danger">
          删除
        </Button>
      </Popconfirm>
    </>
  );
}

export default DeleteHomeSlide;
