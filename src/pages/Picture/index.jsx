import React, { useEffect, useState } from "react";
import {
  Space,
  Input,
  Tabs,
  TabPane,
  Image,
  Button,
  Pagination,
} from "@douyinfe/semi-ui";
import AddHomeSlide from "../../components/AddCarousel";
import DeleteHomeSlide from "../../components/DeleteCarousel";
import PatchHomeSlide from "../../components/EditCarousel";
import { getSlide, deleteSlide } from "../../utils/homeSlide";
import "./index.scss";

function Picture() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [contentHeight, setContentHeight] = useState();
  // const [deleteLoading, setDeleteLoading] = useState(false);

  const getNewSlide = async () => {
    await getSlide(1).then((res) => {
      console.log(res);
      console.log(res.data.data.slides);
      setData(res.data.data.slides);
      setTotal(res.data.data.total);
    });
  };

  useEffect(() => {
    //这里通过利用总视口高度，来根据window大小，动态调整目录的高度的大小
    getNewSlide();
    const windowHeight = window.innerHeight;
    const newContentHeight = windowHeight - 245;
    setContentHeight(newContentHeight);
  }, []);

  const handleDeleteLoadingChange = (deleteLoading) => {
    // 在这里处理传递的 loading 值
    console.log("deleteLoading:", deleteLoading);
    if (deleteLoading === false) {
      getNewSlide();
    }
  };

  useEffect(() => {
    console.log(contentHeight);
  }, [contentHeight]);

  const columns = [
    {
      title: "标题",
      dataIndex: "title",
      align: "center",
    },
    {
      title: "链接",
      dataIndex: "link",
      align: "center",
    },
    {
      title: "图片",
      dataIndex: "url",
      align: "center",
      render: (url) => {
        return <img src={url || " "} width={60} height={30} alt=""></img>;
      },
    },
    {
      title: "操作",
      dataIndex: "operate",
      align: "center",
      render: (_, record) => (
        //两个按钮删除 编辑
        <Space>
          <PatchHomeSlide data={record} />
          <DeleteHomeSlide
            slideId={record.id}
            onDeleteLoadingChange={handleDeleteLoadingChange}
          />
        </Space>
      ),
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getSlide(page).then((res) => {
      setData(res.data.data.slides);
      console.log(res.data.data);
    });
  };

  const deletePicture = async (slideId) => {
    await deleteSlide(slideId).then(res=>{
      console.log(res);
    })
    getNewSlide();
  };

  return (
    <>
      <div className="pictureContainer">
        <div className="mainContent">
          <Tabs tabPosition="left" type="button">
            {data &&
              data.map((item, index) => (
                <TabPane
                  tab={
                    <div className="TabNavContainer">
                      <img src={item.url} alt={item.title}></img>
                      <span>{item.title}</span>
                    </div>
                  }
                  itemKey={item.id}
                  key={index}
                  className="rightContainer"
                >
                  <div className="upToolBar">
                    <span>
                      <strong>编辑幻灯片</strong>
                    </span>
                    <div className="inputContainer">
                      <Input
                        prefix="Title"
                        showClear
                        className="input"
                        value={item.title}
                      ></Input>
                      <Input
                        prefix="Link"
                        showClear
                        className="input"
                        value={item.link}
                      ></Input>
                      <Button>确认修改</Button>
                      <Button onClick={() => deletePicture(item.id)}>
                        删除幻灯片
                      </Button>
                    </div>
                  </div>
                  <Image src={item.url}></Image>
                </TabPane>
              ))}
          </Tabs>
          <div className="PaginationContainer">
            <Pagination total={total} onChange={handlePageChange}></Pagination>
          </div>
        </div>
      </div>
    </>
  );
}

export default Picture;
