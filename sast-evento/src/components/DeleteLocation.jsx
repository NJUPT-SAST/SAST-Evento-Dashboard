import React, { useState } from 'react';
import { Button, Popconfirm, Popover } from '@douyinfe/semi-ui';


function DeleteLocation(props) {
    const handleDelete=()=>{
        console.log(props.id);
    }
    return (
        <>

                <Popover
                    content={
                        <article style={{padding:12}}>
                            选中地点,确认删除
                        </article>
                    }
                    position='top'
                >
                    <Button onClick={handleDelete}>删除</Button>
                </Popover>
        </>
    )
}

export default DeleteLocation
