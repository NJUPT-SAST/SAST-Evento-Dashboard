"use client";

import { useEffect } from "react";
import styles from "./page.module.scss";
import { getMyAdminPermission } from "@/apis/permission";

export default function Home() {
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
