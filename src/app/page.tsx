"use client";

import "./welcomeAnimate.scss";
import styles from "./page.module.scss";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMyInfo } from "@/apis/user";

function TypingComponent() {
  const [animate, setAnimate] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getMyInfo().then((res) => {
        if (res.success) {
          router.push("/home");
        }
      });
    }
  }, [router]);

  const handleClick = () => {
    setAnimate(false);
    setTimeout(() => setAnimate(true), 1);
  };

  const toLogin = () => {
    router.push("/login", { scroll: false });
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.container}>
          <div
            className={`typing ${animate ? "animate" : ""}`}
            onClick={handleClick}
          ></div>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={toLogin}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              toLogin
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

export default TypingComponent;
