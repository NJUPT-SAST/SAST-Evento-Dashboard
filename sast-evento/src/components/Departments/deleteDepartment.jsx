import React from "react";
import { Popconfirm,Button } from "@douyinfe/semi-ui";

function DeleteDepartment(props){
    return(
        <>
        <Popconfirm content='是否确认删除' title='确认' style={{width:320}}>
            <Button size="small" >删除</Button>
        </Popconfirm>
        </>
    )
}
export default DeleteDepartment