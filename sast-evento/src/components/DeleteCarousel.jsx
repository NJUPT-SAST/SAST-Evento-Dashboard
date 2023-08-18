import React from "react";
import { Tooltip,Popconfirm,Button } from "@douyinfe/semi-ui";


function DeleteCarousel(){
    return(
        <>
        <Popconfirm content='是否确认删除' title='确认' style={{width:320}}>
            <Button theme="borderless" type='danger'>删除</Button>
        </Popconfirm>
        </>
    )
}

export default DeleteCarousel;