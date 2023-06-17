import React from "react";
import styles from "./Store.module.css";
import { Store } from "@/utils/dataTypes";
import Image from "next/image";
import Link from "next/link";

const SingleStore = ({
  store,
  showCategory,
}: {
  store: Store;
  showCategory: boolean;
}) => {
  return (
    <div className={styles.store__container}>
      <Image
        src={store.storeImage}
        alt="Store Image"
        width={200}
        height={200}
        className={styles.store__image}
      />
      <div className={styles.store__details}>
        <p>
          <strong>Store Name:</strong> {store.storeName}
        </p>
        <p>
          <strong>Address:</strong> {store.storeAddress}
        </p>
        <p>
          <strong>Contact:</strong> {store.storeContact}
        </p>
        <p>
          <strong>Email:</strong> {store.storeEmail}
        </p>
      </div>
      {showCategory && (
        <div className={styles.chip__container}>
          {store.storeCategory.map(({ categoryName }, index) => {
            return (
              <div key={index} className={styles.chip}>
                {categoryName}
              </div>
            );
          })}
        </div>
      )}
      <Link href={`/store/${store._id}`} className={styles.visit_store_link}>
        Visit Store
      </Link>
    </div>
  );
};

export default SingleStore;
