import React from 'react';
import { useState, useEffect } from 'react';
import { List, Skeleton, Button, Avatar, Modal, Rating, Pagination } from '@douyinfe/semi-ui';

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
    const [token, setToken] = useState("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsImV4cCI6MTcyNzIwNjgzOH0.-Ea2xeeN9Un6Y_8zi22PqHPoazcyFjwKOjEvWGrxZF8")

    const data = [];

    for (let i = 0; i < 40; i++) {
        data.push({
            title: `Title ${i}`,
            loading: false,
            color: 'gray',
        });
    }

    useEffect(() => {
        getData();
    }, []);

    const pageSize = 10;
    const [page, setPage] = useState(1);
    const [thisPage, setThisPage] = useState([])
    const getData = (page) => {
        let start = (page - 1) * pageSize;
        let end = page * pageSize;


        // const params = {
        //     page: page,
        //     size: pageSize
        // }
        // fetch("url" + new URLSearchParams(params), {
        //     method: 'GET',
        //     headers: {
        //         token: token
        //     }
        // })
        // .then(response => response.json)
        // .then(data => setThisPage(data))
        // return thisPage;
        return data.slice(start, end);
    };
    // const fetchData = async () => {
    //     setLoading(true);

    //     const start = list.length;
    //     const end = start + 10;

    //     const newData = data.slice(start, end);

    //     setList(prevList => [...prevList, ...newData]);



    //     setLoading(false);
    // };
    const [visible, setVisible] = useState(false);
    const onClose = () => {
        setVisible(false);
    };
    const [listVisible, setListVisible] = useState(false);
    const onListClose = () => {
        setListVisible(false);
    };

    const feedbackList = []
    feedbackList.push({
        content: '灌注前端组谢谢喵~~~',
        score: 4.6,
        eventId: 1
    },
        {
            content: '我们前端组授课真是太强啦！！！',
            score: 5,
            eventId: 2
        })
    async function getFeedbackList() {
        //getFeedbackList
        const params = {
            page: 1,
            size: 10
        }

        fetch("url" + new URLSearchParams(params), {
            method: 'GET',
            headers: {
                token: token
            }
        })
            .then(response => response.json())
            .then(data => {
                setList(data);
                console.log(list)
            })
            .catch(error => { console.log(error) })
    }

    return (
        <>
            <List
                dataSource={getData(page)}
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
            <Pagination size='small' style={{ width: '100%', flexBasis: '100%', justifyContent: 'center' }}
                pageSize={pageSize} total={data.length} currentPage={page} onChange={cPage => setPage(cPage)} />
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
                    dataSource={feedbackList}
                    renderItem={item => <List.Item>{
                        <>
                            <Rating allowHalf defaultValue={5} value={item.score} disabled style={{ marginRight: '1', display: 'flex' }} />
                            <span style={{ display: 'flex' }}>{item.content}</span>
                        </>

                    }</List.Item>}
                />
            </Modal>
        </>

    );

}