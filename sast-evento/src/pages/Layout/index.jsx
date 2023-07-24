import React from 'react'
import { Layout, Nav, Button, Breadcrumb, Skeleton, Avatar } from '@douyinfe/semi-ui';
import { IconSemiLogo, IconBell, IconHelpCircle, IconBytedanceLogo, IconHome, IconHistogram, IconLive, IconSetting } from '@douyinfe/semi-icons';
import { Outlet ,Link ,useLocation,useNavigate} from "react-router-dom"

function TheLayout(){
    const {Header,Sider}=Layout
    return(
        <Layout style={{ border: '1px solid var(--semi-color-border)',height:'100vh' }}>
            <Header style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
                <div>
                    <Nav mode="horizontal" defaultSelectedKeys={['Home']}>
                        <Nav.Header>
                            <div>SAST-Evento(picture)</div>
                        </Nav.Header>
                        <Nav.Footer>
                            <Avatar color="orange" size="small">
                                User
                            </Avatar>
                        </Nav.Footer>
                    </Nav>
                </div>
            </Header>
            <Layout>
                <Sider style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
                    <Nav
                    renderWrapper={({ itemElement, isSubNav, isInSubNav, props })=>{
                        const routerMap={
                          Home:'/',
                          Feedback:'/feedback',
                          Timetable:'/timetable',
                          Setting:'/roles',
                          Picture:'/picture' 
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
                        { itemKey: 'Picture', text: '幻灯片', icon: <IconSetting size="large" />}
                    ]}
                    footer={{
                        collapseButton: true,
                    }}
                    ></Nav>
                </Sider>
                <Layout>
                    <Outlet/>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default TheLayout