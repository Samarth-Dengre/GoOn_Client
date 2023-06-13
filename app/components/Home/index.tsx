import styles from "./Home.module.css";
import Category from "./Category";
import Stores from "./Stores";

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.categoryContainer}>
        <Category />
      </div>
      <div className={styles.storesContainer}>
        <Stores />
      </div>
    </div>
  );
}

export default Home;
