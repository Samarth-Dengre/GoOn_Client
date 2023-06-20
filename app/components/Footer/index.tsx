import Icons from "../CustomComponents/Icons";
import styles from "./Footer.module.css";

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
          <Icons name="LinkedIn" size={25} color="white" />
        </a>
        <a
          href="https://www.github.com/samarth-dengre/"
          referrerPolicy="no-referrer"
          target="_blank"
          className={styles.link}
        >
          <Icons name="GitHub" size={25} color="white" />
        </a>
        <a
          href="https://samarthdengre.vercel.app/"
          referrerPolicy="no-referrer"
          target="_blank"
          className={styles.link}
        >
          <Icons name="Language" size={25} color="white" />
        </a>
        <a
          href="https://instagram.com/samarth_dengre"
          referrerPolicy="no-referrer"
          target="_blank"
          className={styles.link}
        >
          <Icons name="Instagram" size={25} color="white" />
        </a>
      </div>
      <div className={styles.description}>Made by Samarth Dengre</div>
    </div>
  );
}

export default Footer;
