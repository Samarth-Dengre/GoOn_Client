import React from "react";
import { fetch_store_by_id_url } from "@/utils/routes";
import styles from "./StorePage.module.css";
import Image from "next/image";
import { Store } from "@/utils/dataTypes";
import ProductCard from "@/app/components/ProductCard";
import RatingStars from "@/app/components/CustomComponents/RatingStars";

const getStore = async (id: string) => {
  const res = await fetch(`${fetch_store_by_id_url}/${id}`, {
    method: "GET",
    next: { revalidate: 10 },
  });
  const store = await res.json();
  return store;
};

const StorePage = async ({ params }: { params: { id: string } }) => {
  const {
    store,
  }: {
    store: Store;
  } = await getStore(params.id);
  return (
    <div className={styles.container}>
      <div className={styles.store__details}>
        <div className={styles.store__details__image__container}>
          <Image
            src={store.storeImage}
            alt={store.storeName}
            width={1000}
            height={1000}
            className={styles.store__details__image}
          />
        </div>
        <div className={styles.store__details__right__container}>
          <p className={styles.store__details__right__container__text}>
            <strong>Store Name: </strong>
            {store.storeName}
          </p>
          <p className={styles.store__details__right__container__text}>
            <strong>Store Address: </strong>
            {store.storeAddress}
          </p>
          <p className={styles.store__details__right__container__text}>
            <strong>Store Contact: </strong>
            {store.storeContact}
          </p>
          <p className={styles.store__details__right__container__text}>
            <strong>Store Email: </strong>
            {store.storeEmail}
          </p>
          <p className={styles.store__details__right__container__text}>
            <strong>Store Rating: </strong>
            <RatingStars value={store.storerating.rating} />
          </p>
        </div>
        <div className={styles.store__details__description__container}>
          <h2
            className={styles.store__details__description__container__heading}
          >
            About Us
          </h2>
          {store.storeDescription?.map((description, index) => (
            <li
              key={index}
              className={styles.store__details__description__container__text}
            >
              {description}
            </li>
          ))}
        </div>
      </div>
      <h2 className={styles.store__products__container__heading}>
        What We Offer
      </h2>
      <div className={styles.store__products__container}>
        {store.storeProducts?.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default StorePage;
