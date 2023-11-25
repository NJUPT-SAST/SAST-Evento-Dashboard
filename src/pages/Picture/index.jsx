import React, { useEffect, useState } from "react";
import { Table, Space } from "@douyinfe/semi-ui";
import AddHomeSlide from "../../components/AddCarousel";
import DeleteHomeSlide from "../../components/DeleteCarousel";
import PatchHomeSlide from "../../components/EditCarousel";
import { getSlide } from "../../utils/homeSlide";




function Picture() {  
    const [data, setData] = useState([])
    const [total,setTotal] = useState()
    useEffect(()=>{
        getSlide(1)
        .then(res=>{
            setData(res.data.data.slides)
            setTotal(res.data.data.total)
        })
        // setData(
        //     [
        //         {
        //             slideId: '1',
        //             title: 'test',
        //             link: '/packge/new/index',
        //             url: 'https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/6fbafc2d-e3e6-4cff-a1e2-17709c680624.png'
        //         },
        //         {
        //             slideId: '2',
        //             title: 'test',
        //             link: '/packge/new/index',
        //             url: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/dy.png'
        //         },
        //     ]
        // )
    },[])
    const columns = [
        {
            title: '标题',
            dataIndex: 'title',
            align: "center"
        },
        {
            title: '链接',
            dataIndex: 'link',
            align: "center"
        },
        {
            title: '图片',
            dataIndex: 'url',
            align: "center",
            render: url => {
                return <img src={url || ' '} width={60} height={30} alt=''></img>
            }
        },
        {
            title: '操作',
            dataIndex: 'operate',
            align: "center",
            render: (_, record) => (
                //两个按钮删除 编辑 
                <Space>
                    <PatchHomeSlide data={record} />
                    <DeleteHomeSlide slideId={record.slideId}/>
                </Space>
            )
        }
    ]
    return (
        //添加按钮和Table组件
        <>
            <div style={{textAlign:'right'}}>
                <AddHomeSlide/>
            </div>
            <Table columns={columns} dataSource={data} pagination={true} />
        </>
    )
}

export default Picture;