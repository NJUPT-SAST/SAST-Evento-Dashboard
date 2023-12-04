"use client";

import "./welcomeAnimate.scss";
import styles from "./page.module.scss";
import React, { useState } from "react";

function TypingComponent() {
  const [animate, setAnimate] = useState(true);
  const [showButton, setShowButton] = useState(false);

  const handleClick = () => {
    setAnimate(false);
    setTimeout(() => setAnimate(true), 1);
  };

  setTimeout(() => {
    setShowButton(true);
  }, 9500);

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
          {showButton && <button className={styles.button}>toLogin</button>}
        </div>
      </div>
    </>
  );
}

export default TypingComponent;
