import React, { useState } from "react";
import { Modal,Button,Upload,Input,Form,Col,Row} from "@douyinfe/semi-ui";
import { IconUpload } from '@douyinfe/semi-icons';
import '../component-scss/AddCarousel.scss';

function AddCarousel(){
    const [visible,setVisible]=useState(false);
    let limit=1
    function showDialog(){
        setVisible(true)
    }
    function handleOk(){
        setVisible(false)
        //这里调用添加接口
    }
    function handleCancel(){
        setVisible(false)
    }
    function getTitle(value){
        console.log(value);
    }
    function getLink(value){
        console.log(value);
    }
    function getFile(file){
        console.log(file);
        return false
    }

    return(
        <>
            <Button theme="solid" className="button" onClick={showDialog}>添加幻灯片</Button>
            <Modal
            title='添加'
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            maskClosable={false}
            >   
                <Form
                   style={{padding:10,width:'100%'}} 
                >
                    <Row>
                        <Col span={12}>
                            <Input placeholder={'添加标题'} style={{width:'90%'}} onChange={getTitle}/>
                        </Col>
                        <Col span={12}>
                            <Input placeholder={'添加链接'} style={{width:'90%'}} onChange={getLink}/>
                        </Col>
                    </Row>
                </Form>
                <Upload
                style={{padding:10}}
                limit={limit}
                uploadTrigger="custom"
                onChange={getFile}
                >
                    <Button icon={<IconUpload/>} theme="light">
                        上传图片
                    </Button>
                </Upload>
            </Modal>
        </>
    )
}

export default AddCarousel;