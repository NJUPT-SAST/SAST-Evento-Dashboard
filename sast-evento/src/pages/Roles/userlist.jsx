import React from 'react';
import { useState, useEffect } from 'react';
import { List, Skeleton, Button, Avatar, Modal, Select, Input } from '@douyinfe/semi-ui';
const Option = Select.Option;

export default function Userlist() {
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

    for (let i = 0; i < 10; i++) {
        data.push({
            id: `${i}`,
            name: '小学生',
            loading: false,
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);

        setList(data);

        setLoading(false);
    };
    const [visible, setVisible] = useState(false);
    const onClose = () => {
        setVisible(false);
    };
    const [auth, setAuth] = useState(false);
    const [authorization, setAuthorization] = useState(false);
    const [stuId, setStuId] = useState("B22011111");

    const onOk = () => {
        const authValue = auth;
        setAuthorization(authValue);
        setVisible(false);
        console.log(authValue);
    }

    const [current, setCurrent] = useState(0);
    const addStu = () => {
        //添加用户后台管理
    }

    return (
        <>
            <Input placeholder={"添加用户后台管理"} showClear={true} style={{ width: '20%' }} onChange={value => setStuId(value)} />
            <Button onClick={addStu}>添加</Button>
            <List
                dataSource={list}
                loading={loading}
                placeholder={placeholder}
                renderItem={item => (
                    <Skeleton placeholder={placeholder} loading={item.loading}>
                        <List.Item
                            header={<Avatar color='blue' onClick={() => { setVisible(true); setCurrent(item.id) }}>{item.name.slice(-2)}</Avatar>}
                            main={
                                <div>
                                    <span style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}>学号：{item.id}</span>
                                    <p style={{ color: 'var(--semi-color-text-2)', margin: '4px 0' }}>
                                        权限
                                    </p>

                                </div>

                            }
                        />
                    </Skeleton>
                )
                }

            />
            <Modal title="权限详情" maskClosable={false} visible={visible} onOk={onOk} onCancel={onClose}>
                用户：{current}
                <br />
                权限：
                <br />
                允许修改他人权限：
                <Select defaultValue="false" onChange={value => setAuth(value)} style={{ width: 120 }}>
                    <Select.Option label="允许" value="true" />
                    <Select.Option label="拒绝" value="false" />
                </Select>
                <br />
                允许修改活动：
                <Select defaultValue="true" style={{ width: 120 }}>
                    <Select.Option label="允许" value="true" />
                    <Select.Option label="拒绝" value="false" />
                </Select>
            </Modal>
        </>

    );

}