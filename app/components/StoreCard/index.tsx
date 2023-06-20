import React from "react";
import styles from "./Store.module.css";
import { Store } from "@/utils/dataTypes";
import Image from "next/image";
import Link from "next/link";
import RatingStars from "../CustomComponents/RatingStars";

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
        <p className={styles.store__details__text}>{store.storeName}</p>
        <p className={styles.store__details__text}>
          <strong>Rating: </strong>
          <RatingStars
            value={store.storerating.rating}
            count={store.storerating.numReviews}
          />
        </p>
        <p
          className={`${styles.store__details__text} ${styles.text_color_grey}`}
        >
          <strong>Address:</strong> {store.storeAddress}
        </p>
        {showCategory && (
          <div className={styles.chip__container}>
            Tags:
            {store.storeCategory.map(({ categoryName }, index) => {
              return (
                <div key={index} className={styles.chip}>
                  {categoryName}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Link href={`/store/${store._id}`} className={styles.visit_store_link}>
        Visit Store
      </Link>
    </div>
  );
};

export default SingleStore;
