"use client";

import styles from "./page.module.scss";
import { Card, Form, Button, Input } from "@douyinfe/semi-ui";
import { IconUser, IconLock } from "@douyinfe/semi-icons";
import AuthorizedButton from "@/components/login/AuthorizedButton";
import logo from "../../../public/Logo.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { passwordLogin } from "@/apis/login";
import { useRouter } from "next/navigation";
import { getMyAdminPermission } from "@/apis/permission";
import { getMyInfo } from "@/apis/user";
import { md5 } from "js-md5";

export default function Login() {
  const [userAccount, setUserAccount] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const login = () => {
    const md5Password = md5(password);
    console.log(md5Password);

    passwordLogin(userAccount, md5Password).then((res) => {
      if (res.success) {
        router.push("/home");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userinfo", JSON.stringify(res.data.userInfo));
        getMyAdminPermission().then((res) => {
          if (res.success) {
            localStorage.setItem("adminPermission", JSON.stringify(res.data));
          }
        });
      }
    });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getMyInfo().then((res) => {
        if (res.success) {
          router.push("/home");
        }
      });
    }
  }, [router]);

  const [isLogoShow, setIsLogoShow] = useState<boolean>(true);

  const handleEnterKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === "Enter") {
      // Trigger a click event on the button
      login();
    }
  };

  return (
    <>
      <div className={styles.main}>
        {isLogoShow && (
          <div className={styles.logoContainer}>
            <Image className={styles.logo} alt="loginLogo" src={logo} />
          </div>
        )}
        <div className={styles.loginContainer}>
          <Card className={styles.cardContainer}>
            <div className={styles.titleContainer}>
              <strong>
                <h1>SAST EVENTO</h1>
              </strong>
            </div>
            <br></br>
            <div className={styles.inputItem}>
              <span>学号</span>
              <Input
                prefix={<IconUser />}
                showClear
                value={userAccount}
                onChange={setUserAccount}
                onKeyPress={handleEnterKeyPress}
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
                onKeyPress={handleEnterKeyPress}
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
