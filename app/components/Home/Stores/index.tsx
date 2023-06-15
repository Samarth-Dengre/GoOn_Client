// This is a server side rendered component

import React from "react";
import { fetch_stores_url } from "@/utils/routes";
import SingleStore from "./SingleStore";
import styles from "./Stores.module.css";
import { Store } from "@/utils/dataTypes";

const getStores = async () => {
  const res = await fetch(fetch_stores_url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const stores = await res.json();
  return stores;
};

async function index() {
  const all_stores = await getStores();

  return (
    <div className={styles.container}>
      {all_stores.map((store: Store, index: number) => (
        <SingleStore key={index} store={store} />
      ))}
    </div>
  );
}

export default index;
