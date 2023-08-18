import React from "react";
import { Popconfirm,Button } from "@douyinfe/semi-ui";


function CancelEvent(){
    return(
        <>
        <Popconfirm content='是否确认取消' title='确认' style={{width:320}}>
            <Button theme="borderless" type='warning'>取消</Button>
        </Popconfirm>
        </>
    )
}

export default CancelEvent;