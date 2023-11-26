import React from "react";
import { Layout, Nav, Dropdown, Avatar } from "@douyinfe/semi-ui";
import {
  IconHome,
  IconHistogram,
  IconLive,
  IconSetting,
  IconImage,
  IconExit,
  IconUserCardVideo
} from "@douyinfe/semi-icons";
import logo from "../../assets/Logo.png";
import { Outlet, Link } from "react-router-dom";

function TheLayout() {
  const { Header, Sider } = Layout;

  return (
    <Layout
      style={{ border: "1px solid var(--semi-color-border)", height: "100vh" }}
    >
      <Header style={{ backgroundColor: "var(--semi-color-bg-1)" }}>
        <div>
          <Nav mode="horizontal" defaultSelectedKeys={["Home"]}>
            <Nav.Header>
              <img
                src={logo}
                alt="SAST"
                style={{ width: "113.12px", height: "34.32px" }}
              />
            </Nav.Header>
            <Nav.Footer>
              <Dropdown
                trigger={"click"}
                position="bottom"
                render={
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => {}}>
                      <IconExit /> 退出登录
                    </Dropdown.Item>
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
        <Sider style={{ backgroundColor: "var(--semi-color-bg-1)" }}>
          <Nav
            renderWrapper={({ itemElement, isSubNav, isInSubNav, props }) => {
              const routerMap = {
                Home: "/activity",
                Feedback: "/feedback",
                Timetable: "/timetable",
                Activity: "/activity",
                Feedback: "/feedback",
                Setting: "/roles",
                Picture: "/picture",
                Image: "/image",
              };
              return (
                <Link
                  style={{ textDecoration: "none" }}
                  to={routerMap[props.itemKey]}
                >
                  {itemElement}
                </Link>
              );
            }}
            style={{ maxWidth: 220, height: "100%" }}
            defaultSelectedKeys={["Home"]}
            items={[
              {
                itemKey: "Home",
                text: "活动管理",
                icon: <IconHome size="large" />,
              },
              {
                itemKey: "Feedback",
                text: "活动反馈",
                icon: <IconHistogram size="large" />,
              },
              {
                itemKey: "Timetable",
                text: "活动时间",
                icon: <IconLive size="large" />,
              },
              {
                itemKey: "Setting",
                text: "用户管理",
                icon: <IconSetting size="large" />,
              },
              {
                itemKey: "Picture",
                text: "幻灯片",
                icon: <IconUserCardVideo size="large" />,
              },
              {
                itemKey: "Image",
                text: "图库",
                icon: <IconImage size="large" />,
              },
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
  );
}

export default TheLayout;
