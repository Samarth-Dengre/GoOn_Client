import React from "react";
import styles from "./Stores.module.css";
import { Store } from "@/utils/dataTypes";

const SingleStore = ({ store }: { store: Store }) => {
  return (
    <div className={styles.store__container}>
      <p>{store.storeName}</p>
      <p>{store.storeAddress}</p>
      <p>{store.storeContact}</p>
      <p>{store.storeCategory[0].categoryName}</p>
      <p>{store.storeEmail}</p>
    </div>
  );
};

export default SingleStore;
