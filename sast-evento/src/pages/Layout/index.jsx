import React from 'react'
import { Layout, Nav, Button,Dropdown ,Breadcrumb, Skeleton, Avatar, Image } from '@douyinfe/semi-ui';
import {
    IconSemiLogo, IconBell, IconHelpCircle, IconBytedanceLogo,
    IconHome, IconHistogram, IconLive, IconSetting, IconImage,IconClock,IconUserCircle,IconImage,IconExit
} from '@douyinfe/semi-icons';
import logo from '../../assets/Logo.png'
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom"

function TheLayout() {
    const { Header, Sider } = Layout
    
    return (
        <Layout style={{ border: '1px solid var(--semi-color-border)', height: '100vh' }}>
            <Header style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
                <div>
                    <Nav mode="horizontal" defaultSelectedKeys={['Home']}>
                        <Nav.Header>
                            <img src={logo} alt="sast" style={{ width: '120px', height: '45px' }} />
                        </Nav.Header>
                        <Nav.Footer>
                            <Dropdown
                                trigger={'click'}
                                position='bottom'
                                render={
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={()=>loginexit()}><IconExit/> 退出登录</Dropdown.Item>
                                    </Dropdown.Menu>
                                }
                            >
                                <Avatar color="orange" size="small">
                                    User
                                </Avatar>
                            </Dropdown>
                        </Nav.Footer>
                    </Nav>
                </div>
            </Header>
            <Layout>
                <Sider style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
                    <Nav
                        renderWrapper={({ itemElement, isSubNav, isInSubNav, props }) => {
                            const routerMap = {
                                Home: '/',
                                Feedback: '/feedback',
                                Timetable: '/timetable',
                                Activity: '/activity',
                                Feedback: '/feedback',
                                Timetable: '/timetable',
                                Setting: '/roles',
                                Picture: '/picture',
                                Image: '/image'
                            };
                            return (
                                <Link
                                    style={{ textDecoration: "none" }}
                                    to={routerMap[props.itemKey]}
                                >
                                    {itemElement}
                                </Link>
                            )
                        }}
                        style={{ maxWidth: 220, height: '100%' }}
                        defaultSelectedKeys={['Home']}
                        items={[
                            { itemKey: 'Home', text: '活动管理', icon: <IconHome size="large" /> },
                            { itemKey: 'Feedback', text: '活动反馈', icon: <IconHistogram size="large" /> },
                            { itemKey: 'Timetable', text: '活动时间', icon: <IconLive size="large" /> },
                            { itemKey: 'Setting', text: '用户管理', icon: <IconSetting size="large" /> },
                            { itemKey: 'Picture', text: '幻灯片', icon: <IconImage size="large" /> }
                            { itemKey: 'Timetable', text: '活动时间', icon: <IconClock size="large" /> },
                            { itemKey: 'Image', text: '图库', icon: <IconImage size="large" /> }
                        ]}
                        footer={{
                            collapseButton: true,
                        }}
                    ></Nav>
                </Sider>
                <Layout>
                    <Outlet />
                </Layout>
            </Layout>
        </Layout>
    )
}

export default TheLayout