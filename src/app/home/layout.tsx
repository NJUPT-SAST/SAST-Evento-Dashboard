"use client";

import { Dropdown, Layout, Nav, Avatar } from "@douyinfe/semi-ui";
import Image from "next/image";
import logo from "../../../public/Logo.png";
import {
  IconHome,
  IconImage,
  IconLive,
  IconSetting,
  IconUserCardVideo,
} from "@douyinfe/semi-icons";
import Link from "next/link";
import { ButtonHTMLAttributes, useEffect, useRef, useState } from "react";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const { Header, Sider } = Layout;

  const navRef = useRef(null);
  //这里通过随着宽度的变化点击收起按钮来实现sider的自适应
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [eventTriggered, setEventTriggered] = useState(false);

  useEffect(() => {
    const CollapsedButton: any = document.getElementsByClassName(
      "semi-navigation-collapse-btn"
    )[0].childNodes[0];

    // 监听窗口大小改变事件
    window.addEventListener("resize", handleResize);

    // 处理窗口大小改变事件
    function handleResize() {
      const newWindowWidth = window.innerWidth;

      // 检查窗口宽度是否经过 1200
      if (newWindowWidth < 1200 && windowWidth >= 1200 && !eventTriggered) {
        // 在窗口宽度从大于等于 1200 变为小于 1200 时触发事件
        // 执行你想要的操作
        console.log("窗口宽度小于 1200");
        CollapsedButton.click();
        setEventTriggered(true);
      }

      if (newWindowWidth >= 1200 && windowWidth < 1200 && eventTriggered) {
        // 在窗口宽度从小于 1200 变为大于等于 1200 时触发事件
        // 执行你想要的操作
        console.log("窗口宽度大于等于 1200");
        CollapsedButton.click();
        setEventTriggered(false);
      }

      console.log("old", windowWidth);
      console.log("new", newWindowWidth);

      // 更新 windowWidth 的值
      setWindowWidth(newWindowWidth);
    }

    // 在组件卸载时清除事件监听器
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [eventTriggered, windowWidth]);

  let PathName = window.location.href;
  PathName = PathName.split("/")[PathName.split("/").length - 1];
  //TODO: 刷新时，无法正常显示活动的sidebar标签
  return (
    <section>
      <Layout
        style={{
          border: "1px solid var(--semi-color-border)",
          height: "100vh",
        }}
      >
        <Header style={{ backgroundColor: "var(--semi-color-bg-1)" }}>
          <div>
            <Nav mode="horizontal" defaultSelectedKeys={["Home"]}>
              <Nav.Header>
                <Image
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
                      <Dropdown.Item onClick={() => {}}>退出登录</Dropdown.Item>
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
              ref={navRef}
              defaultIsCollapsed={false}
              renderWrapper={({ itemElement, isSubNav, isInSubNav, props }) => {
                const routerMap = {
                  Timetable: "home/timetable",
                  Activity: "home/activity",
                  Roles: "home/roles",
                  Picture: "home/picture",
                  Image: "home/image",
                };
                return (
                  <Link
                    style={{ textDecoration: "none" }}
                    href={`/home/${props.itemKey}`}
                  >
                    {itemElement}
                  </Link>
                );
              }}
              style={{ maxWidth: 220, height: "100%" }}
              defaultSelectedKeys={[PathName]}
              items={[
                {
                  itemKey: "activity",
                  text: "活动管理",
                  icon: <IconHome size="large" />,
                },
                {
                  itemKey: "timetable",
                  text: "活动时间",
                  icon: <IconLive size="large" />,
                },
                {
                  itemKey: "roles",
                  text: "用户管理",
                  icon: <IconSetting size="large" />,
                },
                {
                  itemKey: "picture",
                  text: "幻灯片",
                  icon: <IconUserCardVideo size="large" />,
                },
                {
                  itemKey: "image",
                  text: "图库",
                  icon: <IconImage size="large" />,
                },
              ]}
              footer={{
                collapseButton: true,
              }}
            ></Nav>
          </Sider>
          <Layout>{children}</Layout>
        </Layout>
      </Layout>
    </section>
  );
}
