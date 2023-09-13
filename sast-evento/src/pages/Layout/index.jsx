import React, { useEffect } from 'react'
import { Layout, Nav, Avatar, Dropdown } from '@douyinfe/semi-ui';
import { IconHome, IconHistogram, IconClock, IconUserCircle, IconImage,IconExit} from '@douyinfe/semi-icons';
import logo from '../../assets/Logo.png'
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom"

function TheLayout() {
    const { Header, Sider } = Layout
    useEffect(() => {
        let arr2 = [
            "addAdmin",
            "deletePicture",
            "addEvent",
            "deleteAdmin",
            "updateAction",
            "deleteHomeSlide",
            "getStates",
            "deleteType",
            "getAdmins",
            "addHomeSlide",
            "getFeedbackEvents",
            "updateLocation",
            "getLocations",
            "addLocation",
            "getFeedbacks",
            "addPicture",
            "patchHomeSlide",
            "putAdmin",
            "deleteLocation",
            "addType",
            "getActionList",
            "eventQrcodeGet",
            "getTypes",
            "updateType"
        ]
        let arr1 = [
            "addEventSlide",
            "deleteManager",
            "deleteEventSlide",
            "deleteEvent",
            "patchEvent",
            "addManager",
            "patchEventSlide",
            "putManager",
            "putEvent"
        ]
        let arr = [...arr1, ...arr2]
        let str = JSON.stringify(arr)
        localStorage.setItem('myArray', str)
    }, [])

    const navigate=useNavigate()
    const loginexit=()=>{
        navigate('/login')
    }
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
                            {/* <Avatar onClick={()=>console.log("点击头像")}  color="orange" size="small">
                                User
                            </Avatar> */}
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
                                Activity: '/activity',
                                //   Roles:'/activity-role',
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
                            {
                                itemKey: 'Activity', text: '活动', icon: <IconHome size="large" />,
                                // items:[
                                //     {itemKey:'Activity',text:'活动管理'},
                                //     {itemKey:'Roles',text:'活动权限'}
                                // ]
                            },
                            { itemKey: 'Feedback', text: '活动反馈', icon: <IconHistogram size="large" /> },
                            { itemKey: 'Timetable', text: '活动时间', icon: <IconClock size="large" /> },
                            { itemKey: 'Setting', text: '用户管理', icon: <IconUserCircle size="large" /> },
                            { itemKey: 'Picture', text: '幻灯片', icon: <IconImage size="large" /> },
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