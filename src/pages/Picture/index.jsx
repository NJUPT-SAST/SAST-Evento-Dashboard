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

  useEffect(() => {
    getSlide(1).then((res) => {
      console.log(res.data.data.slides);
      setData(res.data.data.slides);
      setTotal(res.data.data.total);
    });
  }, []);
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
          <DeleteHomeSlide slideId={record.id} />
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

  return (
    //添加按钮和Table组件
    <>
      <div style={{ textAlign: "right" }}>
        <AddHomeSlide />
      </div>
      <div style={{ padding: "20px" }}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            currentPage,
            pageSize: 8,
            total: total,
            onPageChange: handlePageChange,
          }}
        />
      </div>
    </>
  );
}

export default Picture;
