import React, { useState } from "react";
import { Table,Space,Button} from "@douyinfe/semi-ui";
import AddCarousel from "../../components/AddCarousel";


function Picture(){
    const Data=[
        {
            key:'1',
            name:'test',
            link:'/packge/new/index',
            picture:'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png'
        }
    ]
    const [data,setData]=useState(Data)
    const columns=[
        {
            title:'标题',
            dataIndex:'name'
        },
        {
            title:'链接',
            dataIndex:'link'
        },
        {
            title:'图片',
            dataIndex:'picture',
            render:picture=>{
                return <img src={picture||' '} width={30} height={30} alt=''></img> 
            }
        },
        {
            title:'操作',
            dataIndex:'operate',
            render:(_,record)=>(
                //两个按钮删除 编辑 
                <Space>
                   
                </Space>
            )
        }
    ]
    return(
        //添加按钮和Table组件
        <>
            <AddCarousel/>
            <Table columns={columns} dataSource={data} pagination={false}/>
        </>
    )
}

export default Picture;