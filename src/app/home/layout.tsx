"use client";

import { Dropdown, Layout, Nav, Avatar, SideSheet } from "@douyinfe/semi-ui";
import Image from "next/image";
import logo from "../../../public/Logo.png";
import {
  IconToken,
  IconBadgeStar,
  IconCarousel,
  IconCalendar,
  IconImage,
  IconCollapse,
} from "@douyinfe/semi-icons-lab";
import Link from "next/link";
import { ReactText, useEffect, useRef, useState } from "react";
import { getMyAdminPermission } from "@/apis/permission";
import { UserInfo } from "@/utils/commonInterface";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/apis/login";
import { OnSelectedData } from "@douyinfe/semi-ui/lib/es/navigation";
import styles from "./layout.module.scss";
import { IconEdit } from "@douyinfe/semi-icons";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const { Header, Sider } = Layout;

  const navRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const [userinfo, setUserinfo] = useState<UserInfo>();
  const [chosenNav, setChosenNav] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState<boolean>();
  const [sideSheetVisible, setSideSheetVisible] = useState<boolean>(false);

  const router = useRouter();

  // useEffect(() => {
  //   if (!localStorage.getItem("token")) {
  //     router.push("/login");
  //     localStorage.clear();
  //   }
  //   if (localStorage.getItem("token")) {
  //     getMyAdminPermission().then((res) => {
  //       if (
  //         (res.errCode === 1000 &&
  //           String(res.errMsg).includes("login has expired")) ||
  //         res.errCode === 1003
  //       ) {
  //         router.push("/login");
  //         localStorage.clear();
  //       }
  //     });
  //   }
  // }, [router]);

  useEffect(() => {
    const windowWidth = window.innerWidth;
    setWindowWidth(windowWidth);
    if (windowWidth < 1200) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  }, []);

  //Listener function, adaptive sidebar stowage based on screen width
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    function handleResize() {
      const newWindowWidth = window.innerWidth;
      if (newWindowWidth < 1200 && windowWidth >= 1200) {
        setIsCollapsed(true);
      }
      if (newWindowWidth >= 1200 && windowWidth < 1200) {
        setIsCollapsed(false);
      }
      setWindowWidth(newWindowWidth);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth, isCollapsed]);

  const changeNav = (data: OnSelectedData) => {
    const reactTextValue = data.itemKey;
    const stringValue = reactTextValue.toString();
    setChosenNav(stringValue);
  };

  const updatePermission = () => {
    getMyAdminPermission().then((res) => {
      if (res.success) {
        location.reload();
        localStorage.setItem("adminPermission", JSON.stringify(res.data));
      }
    });
  };

  const goLogOut = () => {
    logout().then((res) => {
      if (res.success) {
        router.push("/login");
        localStorage.clear();
      }
    });
  };

  useEffect(() => {
    if (localStorage.getItem("userinfo"))
      setUserinfo(JSON?.parse(localStorage.getItem("userinfo") ?? ""));
  }, []);

  const avatarUri = userinfo?.avatar;

  const userNickName = userinfo?.nickname;
  const pathname = usePathname();
  const newChosenNav = pathname.split("/")[pathname.split("/").length - 1];

  useEffect(() => {
    setChosenNav(newChosenNav);
  }, [newChosenNav]);

  const onCollapseChange = () => {
    setIsCollapsed(!isCollapsed);
  };

  //移动端适配导航栏跳转
  const navToPage = (value: string) => {
    router.push(`${value}`);
    setSideSheetVisible(false);
  };

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
                <IconCollapse
                  className={styles.moreIcon}
                  onClick={() => setSideSheetVisible(true)}
                />
                <Dropdown
                  trigger={"click"}
                  position="bottomRight"
                  render={
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={updatePermission}>
                        权限刷新
                      </Dropdown.Item>
                      <Dropdown.Item onClick={goLogOut}>
                        <span style={{ color: "rgb(249, 113, 90)" }}>
                          退出登录
                        </span>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  }
                >
                  <Avatar color="orange" size="small" src={avatarUri}>
                    {userNickName?.slice(-2)}
                  </Avatar>
                </Dropdown>
              </Nav.Footer>
            </Nav>
          </div>
        </Header>
        <Layout>
          <Sider
            style={{ backgroundColor: "var(--semi-color-bg-1)" }}
            className={styles.siderBar}
          >
            <Nav
              onCollapseChange={onCollapseChange}
              ref={navRef}
              isCollapsed={isCollapsed}
              renderWrapper={({ itemElement, isSubNav, isInSubNav, props }) => {
                const routerMap = {
                  Timetable: "home/timetable",
                  Activity: "home/activity",
                  Roles: "home/roles",
                  Picture: "home/picture",
                  Image: "home/image",
                  TimetableEditor: "home/timetableEditor",
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
              selectedKeys={[chosenNav]}
              onSelect={changeNav}
              items={[
                {
                  itemKey: "activity",
                  text: "活动管理",
                  icon: <IconToken size="large" />,
                },
                {
                  itemKey: "timetable",
                  text: "时间表",
                  icon: <IconCalendar size="large" />,
                },
                {
                  itemKey: "roles",
                  text: "用户管理",
                  icon: <IconBadgeStar size="large" />,
                },
                {
                  itemKey: "picture",
                  text: "幻灯片",
                  icon: <IconCarousel size="large" />,
                },
                {
                  itemKey: "image",
                  text: "媒体库",
                  icon: <IconImage size="large" />,
                },
                {
                  itemKey: "timetableEditor",
                  text: "课表编辑器",
                  icon: <IconEdit size="large" />,
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
      {/* 移动端适配的侧边栏 */}
      <SideSheet
        title="导航栏"
        style={{ width: "80%" }}
        visible={sideSheetVisible}
        onCancel={() => setSideSheetVisible(false)}
      >
        <div className={styles.navContainer}>
          <div className={styles.navItem} onClick={() => navToPage("activity")}>
            <IconToken size="large" />
            <span className={styles.navItemSpan}>活动管理</span>
          </div>
          <div
            className={styles.navItem}
            onClick={() => navToPage("timetable")}
          >
            <IconCalendar size="large" />
            <span className={styles.navItemSpan}>时间表</span>
          </div>
          <div className={styles.navItem} onClick={() => navToPage("roles")}>
            <IconBadgeStar size="large" />
            <span className={styles.navItemSpan}>用户管理</span>
          </div>
          <div className={styles.navItem} onClick={() => navToPage("picture")}>
            <IconCarousel size="large" />
            <span className={styles.navItemSpan}>幻灯片</span>
          </div>
          <div className={styles.navItem} onClick={() => navToPage("image")}>
            <IconImage size="large" />
            <span className={styles.navItemSpan}>媒体库</span>
          </div>
        </div>
      </SideSheet>
    </section>
  );
}
