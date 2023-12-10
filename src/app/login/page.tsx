"use client";

import styles from "./page.module.scss";
import { Card, Form, Button, Input } from "@douyinfe/semi-ui";
import { IconUser, IconLock } from "@douyinfe/semi-icons";
import AuthorizedButton from "@/components/login/AuthorizedButton";
import logo from "../../../public/Logo.png";
import icon from "../../../public/eventoicon.ico";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getMyAdminPermission } from "@/apis/permission";

export default function Login() {
  const [userAccount, setUserAccount] = useState<string>();
  const [password, setPassword] = useState<string>();

  const login = () => {
    console.log(userAccount);
    console.log(password);
  };

  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [isLogoShow, setIsLogoShow] = useState<boolean>(true);

  useEffect(() => {
    // 创建一个函数来更新窗口宽度的状态
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // 添加事件监听器，当窗口大小改变时调用 handleResize 函数
    window.addEventListener("resize", handleResize);

    // 组件卸载时，移除事件监听器
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    console.log(windowWidth);
    if (windowWidth < 1100) {
      console.log("hello");
      setIsLogoShow(false);
    }
    if (windowWidth > 1100) {
      setIsLogoShow(true);
    }
  }, [windowWidth]);

  return (
    <>
      <div className={styles.main}>
        {isLogoShow && (
          <div className={styles.logoContainer}>
            <Image className={styles.logo} alt="loginLogo" src={logo} />
          </div>
        )}
        <div className={styles.loginContainer}>
          <Card style={{ width: "500px" }}>
            <div className={styles.titleContainer}>
              <strong>
                <h1>SAST EVENTO</h1>
              </strong>
            </div>
            <br></br>
            <div className={styles.inputItem}>
              <span>账号</span>
              <Input
                prefix={<IconUser />}
                showClear
                value={userAccount}
                onChange={setUserAccount}
              ></Input>
            </div>
            <div className={styles.inputItem}>
              <span>密码</span>
              <Input
                prefix={<IconLock />}
                showClear
                mode="password"
                value={password}
                onChange={setPassword}
              ></Input>
            </div>
            <div className={styles.loginButtonContainer}>
              <Button
                onClick={login}
                className={styles.loginButton}
                theme="solid"
              >
                登录
              </Button>
            </div>
            <AuthorizedButton></AuthorizedButton>
          </Card>
        </div>
      </div>
    </>
  );
}
