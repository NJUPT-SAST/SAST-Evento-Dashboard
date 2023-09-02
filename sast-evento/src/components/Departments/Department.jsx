import React, { useState } from 'react';
import { SideSheet, Button } from '@douyinfe/semi-ui';
import DepartmentList from './DepartmentList';

function Department(){
    const [visible, setVisible] = useState(false);
    const change = () => {
        setVisible(!visible);
    };
    return (
        <>
            <Button theme='solid' className='button' onClick={change}>活动组别</Button>
            <SideSheet 
            title="活动组别管理" visible={visible} onCancel={change}
            width='30vw'
            >
                <DepartmentList/>
            </SideSheet>
        </>
    );
};

export default Department