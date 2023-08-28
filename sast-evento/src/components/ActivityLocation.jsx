import React, { useState } from 'react';
import { SideSheet, Button, TreeSelect } from '@douyinfe/semi-ui';
import AddLocation from './AddLocation';
import EditLocation from './EditLocation';
import DeleteLocation from './DeleteLocation';

function ActivityLocation() {
    const [treeData, setTreeData] = useState(
        [
            {
              "children": [
                {
                  "label": "济世每",
                  "value": "9",
                  "key": "9"
                },
                {
                  "label": "己水候",
                  "value": "5",
                  "key": "5"
                }
              ],
              "label": "qwjke",
              "value": "0",
              "key": "0"
            },
            {
              "label": "们周律毛书心",
              "value": "1",
              "key": "1"
            },
            {
              "children": [
                {
                  "label": "在边基本",
                  "value": "7",
                  "key": "7"
                }
              ],
              "label": "手求来能",
              "value": "4",
              "key": "4"
            }
          ]
    )

    const [visible, setVisible] = useState(false);
    const change = () => {
        setVisible(!visible);
    };
    const [id,setId]=useState(0);
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
    
    //   const getLabel = (label) => {
    //     const newId = getValueByLabel(label,treeData);
    //     setId(newId)
    //     console.log(`Value for title "${label}": ${newId}`);
    //   };

    const getLabel=(value)=>{
        console.log(value);
        setId(value)
    }
    return (
        <>
            <Button theme='solid' className='button' onClick={change}>活动地点</Button>
            <SideSheet
                title="活动地点管理" visible={visible} onCancel={change}
            >
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <AddLocation id={id}/>
                    <EditLocation id={id}/>
                    <DeleteLocation id={id} />
                </div>
                <div>
                    <TreeSelect
                        filterTreeNode
                        onChange={getLabel}
                        style={{ width: 300 }}
                        treeData={treeData}
                        placeholder="地点(可搜索)"
                    />
                </div>
            </SideSheet>
        </>
    );
};

export default ActivityLocation