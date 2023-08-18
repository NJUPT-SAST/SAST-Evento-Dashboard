import React, { useState } from 'react';
import { SideSheet, Button } from '@douyinfe/semi-ui';
import AddLocation from './AddLocation';

function ActivityLocation() {
    const [visible, setVisible] = useState(false);
    const change = () => {
        setVisible(!visible);
    };
    return (
        <>
            <Button theme='solid' className='button' onClick={change}>活动地点</Button>
            <SideSheet
                title="活动地点管理" visible={visible} onCancel={change}
            >
                <AddLocation />
            </SideSheet>
        </>
    );
};

export default ActivityLocation