import React, { useState } from "react";
import { Table, Space } from "@douyinfe/semi-ui";
import DeleteDepartment from "./deleteDepartment";
import EditDepartment from "./EditDepartment";


function DepartmentList() {
  const [data, setData] = useState([
    {
      "id": 1,
      "departmentName": "asdasd"
    },
    {
      "id": 1097,
      "departmentName": "Song Zhiyuan"
    },
    {
      "id": 1098,
      "departmentName": "Miguel Thomas"
    },
    {
      "id": 1099,
      "departmentName": "Tam Fu Shing"
    },
    {
      "id": 1100,
      "departmentName": "Sheila Mendoza"
    },
    {
      "id": 1101,
      "departmentName": "Yokoyama Seiko"
    },
    {
      "id": 1102,
      "departmentName": "Hsuan Yu Ling"
    },
    {
      "id": 1103,
      "departmentName": "Siu Tsz Ching"
    },
    {
      "id": 1104,
      "departmentName": "Peng Ziyi"
    },
    {
      "id": 1105,
      "departmentName": "Grace Ward"
    },
    {
      "id": 1106,
      "departmentName": "Yung Hui Mei"
    }
  ])
  const columns = [
    {
      title: '序号',
      dataIndex: 'id'
    },
    {
      title: '组别',
      dataIndex: 'departmentName'
    },
    {
      title: '操作',
      dataIndex: 'operate',
      render: (_, record) => (
        <Space>
          <EditDepartment record={record} />
          <DeleteDepartment record={record} />
        </Space>
      )
    }
  ]

  return (
    <>
      <Table columns={columns} dataSource={data} pagination={true} />
    </>
  )
}

export default DepartmentList