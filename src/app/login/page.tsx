"use client";

import styles from "./page.module.scss";
import { Card, Form, Button, Input } from "@douyinfe/semi-ui";
import { IconUser, IconLock } from "@douyinfe/semi-icons";
import AuthorizedButton from "@/components/login/AuthorizedButton";
import logo from "../../../public/Logo.png";
import Image from "next/image";
import { useState } from "react";

export default function Login() {
  const [userAccount, setUserAccount] = useState<string>();
  const [password, setPassword] = useState<string>();

  const login = () => {
    console.log(userAccount);
    console.log(password);
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.loginContainer}>
          <Card>
            <div className={styles.logoContainer}>
              <Image className={styles.logo} alt="loginLogo" src={logo} />
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
