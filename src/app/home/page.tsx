import styles from "./page.module.scss";

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
