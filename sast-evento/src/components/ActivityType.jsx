import React, { useState } from 'react';
import { SideSheet, Button } from '@douyinfe/semi-ui';
import TypeList from './TypeList';

function ActivityType(){
    const [visible, setVisible] = useState(false);
    const change = () => {
        setVisible(!visible);
    };
    return (
        <>
            <Button theme='solid' className='button' onClick={change}>活动类型</Button>
            <SideSheet 
            title="活动类型管理" visible={visible} onCancel={change}
            width='30vw'
            >
                <TypeList/>
            </SideSheet>
        </>
    );
};

export default ActivityType