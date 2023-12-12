"use client";

import "./welcomeAnimate.scss";
import styles from "./page.module.scss";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function TypingComponent() {
  const [animate, setAnimate] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const router = useRouter();

  useEffect(() => {
    localStorage.getItem("token");
    console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token")) {
      router.push("/home");
    }
  }, [router]);

  const handleClick = () => {
    setAnimate(false);
    setTimeout(() => setAnimate(true), 1);
  };

  setTimeout(() => {
    setShowButton(true);
  }, 0);

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
          {showButton && (
            <button className={styles.button} onClick={toLogin}>
              toLogin
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default TypingComponent;
