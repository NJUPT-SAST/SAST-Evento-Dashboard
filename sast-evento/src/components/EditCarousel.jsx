import React, { useState } from "react";
import { SideSheet, Button, Typography, Form, Upload} from "@douyinfe/semi-ui";
import { v4 as uuidv4 } from 'uuid';
import { IconUpload } from '@douyinfe/semi-icons';

function EditCarousel(props) {
    const [visible, setVisible] = useState(false)
    // const [fileList,setFileList]=useState([])
    const fileList=[
        {
            uid:uuidv4(),
            name:'test.png',
            status:'done',
            url:props.data.picture
        }
    ]
    function show() {
        setVisible(true)
    }

    const footer = (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {/* <Button style={{ marginRight: 8 }}>重置</Button> */}
            <Button onClick={() => setVisible(false)} theme="solid">确认修改</Button>
        </div>
    )
    return (
        <>
            <Button theme="borderless" onClick={show}>编辑</Button>
            <SideSheet
                title={<Typography.Title heading={4}>编辑幻灯片</Typography.Title>}
                headerStyle={{ borderBottom: '1px solid var(--semi-color-border)' }}
                bodyStyle={{ borderBottom: '1px solid var(--semi-color-border)' }}
                visible={visible}
                onCancel={() => setVisible(false)}
                footer={footer}
            >
                <Form
                    wrapperCol={{ span: 20 }}
                    labelCol={{ span: 3 }}
                    labelPosition="top"
                    labelAlign="right"
                >
                    <Form.Input field="name" label='标题' trigger='blur' style={{ width: 200 }} initValue={props.data.name} />
                    <Form.Input field="link" label='链接' trigger='blur' style={{ width: 200 }} initValue={props.data.link} />
                    <Upload
                        style={{ marginTop: 15 }}
                        limit={1}
                        fileList={fileList}
                    // uploadTrigger="custom"
                    // beforeUpload={getFile}
                    >
                        <Button icon={<IconUpload />} theme="light">
                            修改图片
                        </Button>
                    </Upload>
                </Form>
            </SideSheet>
        </>
    )
}

export default EditCarousel;