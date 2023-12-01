import React, { useEffect, useState } from "react";
import { Table, Space, Tag } from "@douyinfe/semi-ui";
import DeleteType from "./DeleteType";
import UpdateType from "./EditType";
import AddType from "./AddType";
import { getTypes } from "../utils/types";

function TypeList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      title: "类型",
      dataIndex: "typeName",
      align: "center",
    },
    {
      title: "能否冲突",
      dataIndex: "allowConflict",
      align: "center",
      render: function (allowConflict) {
        if (allowConflict) {
          return <Tag color="green">允许</Tag>;
        } else {
          return <Tag color="red">禁止</Tag>;
        }
      },
    },
    {
      title: "操作",
      dataIndex: "operate",
      align: "center",
      render: (_, record) => (
        //两个按钮删除 编辑
        <Space>
          <UpdateType data={record} setData={setData} />
          <DeleteType typeId={record.id} setData={setData} />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    setLoading(true);
    getTypes()
      .then((res) => {
        setData(res.data.data);
      })
      .then((res) => setLoading(false));
  }, []);

  return (
    <>
      <AddType setData={setData} />
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        loading={loading}
      />
    </>
  );
}

export default TypeList;
