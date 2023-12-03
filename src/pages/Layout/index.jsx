import React from "react";
import { Layout, Nav, Dropdown, Avatar } from "@douyinfe/semi-ui";
import {
  IconHome,
  IconLive,
  IconSetting,
  IconImage,
  IconExit,
  IconUserCardVideo,
} from "@douyinfe/semi-icons";
import logo from "../../assets/Logo.png";
import { Outlet, Link, useLocation } from "react-router-dom";

function TheLayout() {
  const { Header, Sider } = Layout;
  const location = useLocation();
  const pathName = location.pathname;
  const upPathName = capitalizeFirstLetter(pathName.split("/")[1]);
  console.log(upPathName);
  console.log(typeof upPathName);

  function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

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
                Timetable: "/timetable",
                Activity: "/activity",
                Roles: "/roles",
                Picture: "/picture",
                Image: "/image",
              };
              return (
                <Link
                  style={{ textDecoration: "none" }}
                  to={"/console" + routerMap[props.itemKey]}
                >
                  {itemElement}
                </Link>
              );
            }}
            style={{ maxWidth: 220, height: "100%" }}
            defaultSelectedKeys={[upPathName]}
            items={[
              {
                itemKey: "Activity",
                text: "活动管理",
                icon: <IconHome size="large" />,
              },
              {
                itemKey: "Timetable",
                text: "活动时间",
                icon: <IconLive size="large" />,
              },
              {
                itemKey: "Roles",
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
