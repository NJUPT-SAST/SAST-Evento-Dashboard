import React from "react";
import { Popconfirm,Button,Toast} from "@douyinfe/semi-ui";
import { getDepartments,deleteDepartment } from "../../utils/departments";

function DeleteDepartment(props){
    const handleDelete=()=>{
        deleteDepartment(props.record.id)
        .then(response=>{
            Toast.success('删除成功')
            getDepartments()
            .then(res=>{props.setData(res.data.data)})
        }).catch(err=>Toast.error('删除失败'))
    }
    return(
        <>
        <Popconfirm content='是否确认删除' title='确认' style={{width:320}}
        onConfirm={handleDelete}
        >
            <Button size="small">删除</Button>
        </Popconfirm>
        </>
    )
}
export default DeleteDepartment