import React, { useState,useEffect } from 'react';
import { SideSheet, Button, TreeSelect } from '@douyinfe/semi-ui';
import { getLocations } from '../utils/location';
import AddLocation from './AddLocation';
import UpdateLocation from './EditLocation';
import DeleteLocation from './DeleteLocation';

function ActivityLocation() {
    const [treeData, setTreeData] = useState([])

    const [visible, setVisible] = useState(false);
    const change = () => {
        setVisible(!visible);
    };
    const [id,setId]=useState(0);

    const getLabel=(value)=>{
        setId(value)
    }

    useEffect(()=>{
        getLocations()
        .then(res=>{
            setTreeData(res.data.data)
        })
    },[])

    return (
        <>
            <Button theme='solid' className='button' onClick={change}>活动地点</Button>
            <SideSheet
                title="活动地点管理" visible={visible} onCancel={change}
                width='30vw'
            >
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <AddLocation id={id} setTreeData={setTreeData}/>
                    <UpdateLocation id={id} setTreeData={setTreeData}/>
                    <DeleteLocation id={id} setTreeData={setTreeData}/>
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