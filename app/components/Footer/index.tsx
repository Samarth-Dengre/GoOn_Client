"use client";
import styles from "./Footer.module.css";
import { GitHub, Instagram, Language, LinkedIn } from "@mui/icons-material";

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.icons}>
        <a
          href="https://www.linkedin.com/in/samarth-dengre/"
          referrerPolicy="no-referrer"
          target="_blank"
          className={styles.link}
        >
          <LinkedIn />
        </a>
        <a
          href="https://www.github.com/samarth-dengre/"
          referrerPolicy="no-referrer"
          target="_blank"
          className={styles.link}
        >
          <GitHub />
        </a>
        <a
          href="https://samarthdengre.vercel.app/"
          referrerPolicy="no-referrer"
          target="_blank"
          className={styles.link}
        >
          <Language />
        </a>
        <a
          href="https://instagram.com/samarth_dengre"
          referrerPolicy="no-referrer"
          target="_blank"
          className={styles.link}
        >
          <Instagram />
        </a>
      </div>
      <div className={styles.description}>Made by Samarth Dengre</div>
    </div>
  );
}

export default Footer;
