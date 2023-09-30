import React, { useState } from "react"
import { Modal, Button, Popover, Input,Toast } from '@douyinfe/semi-ui';
import { IconPlusStroked } from '@douyinfe/semi-icons';
import { postLocation,getLocations } from "../utils/location";

function AddLocation(props) {
    const [visible, setVisible] = useState(false);
    // const [location,setLocation] = useState()
    var location
    const showDialog = () => {
        setVisible(true);
    };
    const handleOk = () => {
        setVisible(false);
        postLocation(location,props.id===undefined?0:props.id)
        .then(res=>{
            Toast.success('添加成功')
            getLocations()
            .then(response=>props.setTreeData(response.data.data))
        })

    };
    const handleCancel = () => {
        setVisible(false);
    };
    const getlocation=(value)=>{
        // setLocation(value)
        location=value
    }

    //弹框的样式
    const btnStyle = {
        width: 240,
        margin: '4px 50px',
    };
    const footer = (
        <div style={{ textAlign: 'center' }}>
            <Button type="primary" theme="solid" onClick={handleOk} style={btnStyle}>
                确认
            </Button>
            <Button type="primary" theme="borderless" onClick={handleCancel} style={btnStyle}>
                取消
            </Button>
        </div>
    )
    return (
        <>
            <Popover
                content={
                    <article style={{ padding: 12 }}>
                        选中添加子节点,
                        未选中添加根目录
                    </article>
                }
                position='topLeft'
            >
                <Button style={{ marginRight: 20 }} onClick={showDialog}>新增</Button>
            </Popover>
            <Modal
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={footer}
                closeOnEsc={true}
            >
                <h3 style={{ textAlign: 'center', fontSize: 20, margin: 40 }}>添加子地点</h3>
                <div style={{display:'flex',justifyContent:'center'}}>
                    <Input 
                    style={{ width: '320px' }} prefix={<IconPlusStroked />}
                    placeholder="添加地点"
                    onChange={getlocation}
                    ></Input>
                </div>
            </Modal>
        </>
    )
}

export default AddLocation