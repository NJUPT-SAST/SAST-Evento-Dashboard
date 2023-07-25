import React from 'react';
import { useState, useEffect } from 'react';
import { List, Skeleton, Button, Avatar, Modal, Rating } from '@douyinfe/semi-ui';

export default function LoadMoreList() {
    const placeholder = (
        <div
            style={{
                display: 'flex',
                alignItems: 'flex-start',
                padding: 12,
                borderBottom: '1px solid var(--semi-color-border)',
            }}
        >
            <Skeleton.Avatar style={{ marginRight: 12 }} />
            <div>
                <Skeleton.Title style={{ width: 120, marginBottom: 12, marginTop: 12 }} />
                <Skeleton.Paragraph style={{ width: 600 }} rows={2} />
            </div>
        </div>
    )
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);

    const data = [];

    for (let i = 0; i < 40; i++) {
        data.push({
            title: `Title ${i}`,
            loading: false,
            color: 'gray',
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);

        const start = list.length;
        const end = start + 10;

        const newData = data.slice(start, end);

        setList(prevList => [...prevList, ...newData]);

        setLoading(false);
    };
    const [visible, setVisible] = useState(false);
    const onClose = () => {
        setVisible(false);
    };
    const [listVisible, setListVisible] = useState(false);
    const onListClose = () => {
        setListVisible(false);
    };

    const feedbackData = []
    feedbackData.push({
        feedback: '灌注前端组谢谢喵~~~',
        rating: 5,
    },
        {
            feedback: '我们前端组授课真是太强啦！！！',
            rating: 5,
        })
    function getFeedbackData() {
        //getFeedbackData
    }

    return (
        <>
            <List
                dataSource={list}
                loading={loading}
                placeholder={placeholder}
                renderItem={item => (
                    <Skeleton placeholder={placeholder} loading={item.loading}>
                        <List.Item
                            header={<Avatar color='blue' onClick={() => { setVisible(true) }}>活动</Avatar>}
                            main={
                                <div>
                                    <span style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}>{item.title}</span>
                                    <p style={{ color: 'var(--semi-color-text-2)', margin: '4px 0' }}>
                                        ...
                                        活动反馈
                                    </p>

                                </div>

                            }
                        />
                    </Skeleton>
                )
                }

            />
            <Modal title="活动反馈详情" width={500} height={650}
            maskClosable={false} visible={visible} onOk={onClose} onCancel={onClose}>
                <p>活动报名人数：{ }</p>
                <p>活动签到人数：{ }</p>
                <p>活动反馈评分平均分：{ }</p>
                <Button onClick={() => { setListVisible(true) }}>活动反馈列表</Button>
            </Modal>
            <Modal title="活动反馈列表" maskClosable={false} visible={listVisible} onOk={onListClose} onCancel={onListClose}>
                <List
                    header={<div>活动反馈详情</div>}
                    //footer={<div>Footer</div>}
                    bordered
                    dataSource={feedbackData}
                    renderItem={item => <List.Item>{
                        <>
                            <Rating defaultValue={5} value={item.rating} disabled style={{ marginRight: '1', display: 'flex' }} />
                            <span style={{ display: 'flex' }}>{item.feedback}</span>
                        </>

                    }</List.Item>}
                />
            </Modal>
        </>

    );

}