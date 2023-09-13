import React from 'react';
import { Dropdown, Button } from '@douyinfe/semi-ui';
import { IconMore } from '@douyinfe/semi-icons';
import EventQrcodeGet from '../GetQRcode';
import AddImage from '../AddImage';
import PutEvent from '../EditEvent';
import PatchEvent from '../CancelEvent';
import DeleteEvent from '../DeleteEvent';
import GetManager from '../Roles/GetManage';


function MoreOperate(props) {
    const menu=[
        {node:'item',name:<EventQrcodeGet/>},
        {node:'item',name:<AddImage/>},
        {node:'item',name:<GetManager title={props.record.name} id={props.record.eventid}/>},
        {node:'item',name:<PutEvent record={props.record} id={props.record.eventid}/>},
        {node:"item",name:<PatchEvent record={props.record} id={props.record.eventid}/>},
        {node:'item',name:<DeleteEvent record={props.record} id={props.record.eventid}/>},
    ]
    return (
        <>
            <Dropdown
                trigger={'click'}
                position={'bottom'}
                menu={menu}
                clickToHide
                keepDOM={'true'}
            >
                <IconMore/>
            </Dropdown>
        </>
    )
}

export default MoreOperate