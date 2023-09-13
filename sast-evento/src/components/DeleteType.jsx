import React from "react";
import { Popconfirm,Button,Toast } from "@douyinfe/semi-ui";
import { deleteType,getTypes } from "../utils/types";


function DeleteType(props){
    const onConfirm = () => {
        deleteType(props.typeId)
        .then(response=>{
            Toast.success('删除成功')
            getTypes()
            .then((res) => {
                props.setData(res.data.data)
            })
        })
        .catch(err=>{Toast.error('删除失败')})
    };
    return(
        <>
        <Popconfirm 
        content='是否确认删除' title='确认' style={{width:320}}
        onConfirm={onConfirm}
        >
            <Button  type='danger'>删除</Button>
        </Popconfirm>
        </>
    )
}

export default DeleteType;