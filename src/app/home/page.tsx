"use client";

import { useEffect } from "react";
import styles from "./page.module.scss";
import { getMyAdminPermission } from "@/apis/permission";

export default function Home() {
  //这里获得个人自身的权限用来渲染
  useEffect(() => {
    getMyAdminPermission().then((res) => {
      console.log(res);
      localStorage.setItem("adminPermission", JSON.stringify(res.data));
    });
  }, []);

  return (
    <>
      <div className={styles.main}>
        <div className={styles.container}>
          <span className={styles.title}>Welcome to SAST EVENTO</span>
        </div>
      </div>
    </>
  );
}
