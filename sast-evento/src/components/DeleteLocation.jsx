import React, { useState } from 'react';
import { Button, Popconfirm, Popover } from '@douyinfe/semi-ui';


function DeleteLocation(props) {
    // const getValueByLabel = (label, nodes) => {
    //     for (const node of nodes) {
    //       if (node.label === label) {
    //         return node.value;
    //       }
    //       if (node.children) {
    //         const value = getValueByLabel(label, node.children);
    //         if (value) {
    //           return value;
    //         }
    //       }
    //     }
    //     return undefined;
    //   };

    //   const handleGetValue = () => {
    //     const label = "101";
    //     const value = getValueByLabel(label, props.treeData);
    //     console.log(`Value for title "${label}": ${value}`);
    //   };
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
                    <Button>删除</Button>
                </Popover>
        </>
    )
}

export default DeleteLocation
