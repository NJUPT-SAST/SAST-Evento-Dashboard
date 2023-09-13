import React, { useEffect, useState } from "react";
import { Table, Space } from "@douyinfe/semi-ui";
import DeleteDepartment from "./deleteDepartment";
import EditDepartment from "./EditDepartment";
import AddDepartment from "./AddDepartment";
import { getDepartments } from "../../utils/departments";


function DepartmentList() {
  const [data, setData] = useState([])
  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      align: "center",
    },
    {
      title: '组别',
      dataIndex: 'departmentName',
      align: "center",
    },
    {
      title: '操作',
      dataIndex: 'operate',
      align: "center",
      render: (_, record) => (
        <Space>
          <EditDepartment record={record} setData={setData}/>
          <DeleteDepartment record={record} setData={setData}/>
        </Space>
      )
    }
  ]

  useEffect(()=>{
    getDepartments()
    .then(res=>{
      setData(res.data.data)
    })
  },[])

  return (
    <>
      <AddDepartment setData={setData}/>
      <Table columns={columns} dataSource={data} pagination={true} />
    </>
  )
}

export default DepartmentList