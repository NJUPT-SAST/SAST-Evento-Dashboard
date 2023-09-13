import React, { useState } from 'react';
import { SideSheet, Button, TreeSelect } from '@douyinfe/semi-ui';
import AddLocation from './AddLocation';
import UpdateLocation from './EditLocation';
import DeleteLocation from './DeleteLocation';

function ActivityLocation() {
    const [treeData, setTreeData] = useState(
      [
        {
            "children": [
                {
                    "children": [
                        {
                            "children": [
                                {
                                    "label": "Curtis Silva",
                                    "value": "6",
                                    "key": "6"
                                },
                                {
                                    "label": "Alexander Vargas",
                                    "value": "7",
                                    "key": "7"
                                },
                                {
                                    "label": "Sheh Sum Wing",
                                    "value": "8",
                                    "key": "8"
                                },
                                {
                                    "label": "Kudo Ryota",
                                    "value": "9",
                                    "key": "9"
                                },
                                {
                                    "label": "Kojima Eita",
                                    "value": "10",
                                    "key": "10"
                                }
                            ],
                            "label": "Jamie King",
                            "value": "2",
                            "key": "2"
                        },
                        {
                            "label": "Ng Wing Sze",
                            "value": "3",
                            "key": "3"
                        },
                        {
                            "label": "Wong Chieh Lun",
                            "value": "4",
                            "key": "4"
                        },
                        {
                            "label": "Kudo Akina",
                            "value": "5",
                            "key": "5"
                        }
                    ],
                    "label": "Norma Stephens",
                    "value": "1",
                    "key": "1"
                }
            ],
            "label": "root",
            "value": "0",
            "key": "0"
        }
    ]
    )

    const [visible, setVisible] = useState(false);
    const change = () => {
        setVisible(!visible);
    };
    const [id,setId]=useState(0);

    const getLabel=(value)=>{
        setId(value)
    }
    return (
        <>
            <Button theme='solid' className='button' onClick={change}>活动地点</Button>
            <SideSheet
                title="活动地点管理" visible={visible} onCancel={change}
                width='30vw'
            >
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <AddLocation id={id}/>
                    <UpdateLocation id={id}/>
                    <DeleteLocation id={id}/>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center',marginTop:'20px' }}>
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