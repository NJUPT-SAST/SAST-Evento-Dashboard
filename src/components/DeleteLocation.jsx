import React, { useState } from 'react';
import { Button, Popover,Toast } from '@douyinfe/semi-ui';
import { deleteLocation,getLocations } from '../utils/location';


function DeleteLocation(props) {
    const handleDelete=()=>{
        // console.log(props.id);
        deleteLocation(props.id)
        .then(res=>{
            Toast.success('删除成功')
            getLocations()
            .then(response=>props.setTreeData(response.data.data))
        })
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
