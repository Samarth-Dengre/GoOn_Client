// This is a server side rendered component
import styles from "./page.module.css";
import Home from "@/app/components/Home";

export const metadata = {
  title: "GoOn - Home",
  description:
    "GoOn is a platform for local stores to sell their products online, and for customers to buy from their favorite local stores online.",
  keywords:
    "GoOn, goon, go-on, Go-on, goOn, go-on, go_on, Go_on, Ecommerce, onlinestore",
  robots: "index, follow",
};

export default function index() {
  return (
    <main className={styles.main}>
      <Home />
    </main>
  );
}
