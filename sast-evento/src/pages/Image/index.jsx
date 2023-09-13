import React, { useState } from 'react';
import { Pagination, Row, Col, Button, Upload } from '@douyinfe/semi-ui';
import { IconDelete, IconPlus } from '@douyinfe/semi-icons';


const ImageList = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [page, setPage] = useState(1);
    const imageUrls = [
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/bag.jpeg',
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/Viamaker.png',
        'https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/6fbafc2d-e3e6-4cff-a1e2-17709c680624.png',
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/bag.jpeg',
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/bag.jpeg',

        'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/Viamaker.png',
        'https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/6fbafc2d-e3e6-4cff-a1e2-17709c680624.png',
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/bag.jpeg',
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/bag.jpeg',

        'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/Viamaker.png',
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/bag.jpeg',
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/bag.jpeg',
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/Viamaker.png',
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/bag.jpeg',

        'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/Viamaker.png',
        'https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/6fbafc2d-e3e6-4cff-a1e2-17709c680624.png',
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/bag.jpeg',
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/bag.jpeg',
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/Viamaker.png',

        'https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/6fbafc2d-e3e6-4cff-a1e2-17709c680624.png',
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/bag.jpeg',
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/bag.jpeg',
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/Viamaker.png',
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/bag.jpeg',
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/bag.jpeg',
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/Viamaker.png',
    ];

    const getCurrentPageImages = () => {
        const startIndex = (page - 1) * 10;
        const endIndex = startIndex + 10;
        if (page == 1) {
            return imageUrls.slice(startIndex, endIndex - 1);
        }
        else {
            return imageUrls.slice(startIndex - 1, endIndex - 1);
        }
    };
    const handlePageChange = (page) => {
        setPage(page);
    };
    const handleDeleteImage = (url) => {
        console.log(url);
    };
    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };
    // 处理鼠标离开事件
    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    return (
        <div>
            <div className='grid'>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    图片管理
                </div>
                <br />
                <Row gutter={[4, 4]}>
                    {page==1? <Col span={4} style={{ margin: '10px' }}>
                        <Upload
                            // action={action}
                            listType="picture"
                            accept="image/*"
                            multiple
                            // defaultFileList={defaultFileList}
                            picHeight={200}
                            picWidth={200}
                        >
                            <IconPlus size="extra-large" />
                        </Upload>
                    </Col>:""}
                    {getCurrentPageImages().map((url, index) => (
                        <Col span={4} key={index} style={{ margin: '10px' }}>
                            <div
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <img src={url} alt={`Image ${index + 1}`} style={{ width: '200px', height: '200px' }} />
                                {hoveredIndex === index && (
                                    <Button
                                        type='danger' icon={<IconDelete />}
                                        style={{ position: 'absolute', top: '5px', right: '1px' }}
                                        onClick={() => handleDeleteImage(url)}
                                    />
                                )}
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Pagination
                    onChange={handlePageChange}
                    total={imageUrls.length}
                    pageSize={10}
                    currentPage={page}
                    style={{ marginTop: '10px' }}
                />
            </div>
        </div>
    );
};

export default ImageList;