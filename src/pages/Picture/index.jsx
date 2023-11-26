import React, { useEffect, useState, useMemo } from "react";
import { Table, Space } from "@douyinfe/semi-ui";
import AddHomeSlide from "../../components/AddCarousel";
import DeleteHomeSlide from "../../components/DeleteCarousel";
import PatchHomeSlide from "../../components/EditCarousel";
import { getSlide } from "../../utils/homeSlide";

function Picture() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [contentHeight, setContentHeight] = useState();
  // const [deleteLoading, setDeleteLoading] = useState(false);

  const getNewSlide = async () => {
    await getSlide(1).then((res) => {
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

  // const scroll = useMemo(() => ({ y: 500 }), []);
  const scroll = useMemo(() => ({ y: contentHeight }), [contentHeight]);

  return (
    //添加按钮和Table组件
    <>
      <div style={{ textAlign: "right", height: "45px" }}>
        <AddHomeSlide />
      </div>
      <div style={{ padding: "20px" }}>
        <Table
          columns={columns}
          dataSource={data}
          scroll={scroll}
          pagination={{
            currentPage,
            pageSize: 10,
            total: total,
            onPageChange: handlePageChange,
          }}
        />
      </div>
    </>
  );
}

export default Picture;
