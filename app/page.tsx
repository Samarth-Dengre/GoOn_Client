// This is a server side rendered component
import styles from "./page.module.css";
import Home from "@/app/components/Home";

export default function index() {
  return (
    <main className={styles.main}>
      <Home />
    </main>
  );
}
