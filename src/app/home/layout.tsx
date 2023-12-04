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

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const { Header, Sider } = Layout;

  let PathName = window.location.href;
  PathName = PathName.split("/")[PathName.split("/").length - 1];

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
              defaultSelectedKeys={[`${PathName}`]}
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
