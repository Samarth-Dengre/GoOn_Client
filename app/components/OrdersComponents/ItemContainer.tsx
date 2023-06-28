import React from "react";
import styles from "./ItemContainer.module.css";
import Image from "next/image";
import Icons from "../CustomComponents/Icons";
import Link from "next/link";
import { Product, Store } from "@/utils/dataTypes";

const ItemContainer = ({
  product,
  seller,
  price,
  quantity,
}: {
  product: Product;
  seller: Store;
  price: number;
  quantity: number;
}) => {
  return (
    <div className={styles.product_container}>
      <div className={styles.product_image_container}>
        <Image
          src={product.productImage[0]}
          alt={product.productName}
          width={200}
          height={200}
          className={styles.product_image}
        />
      </div>
      <div className={styles.product_details_container}>
        <Link
          className={styles.product_details_container__text}
          href={`/store/${seller._id}/${product.productName}-${product._id}`}
        >
          {product.productName}
        </Link>
        <div className={styles.product_details_container__text}>
          <strong>Seller: </strong>
          <Link
            href={`/store/${seller._id}`}
            className={styles.product_details_container__text}
          >
            {seller.storeName}
          </Link>
        </div>
        <div className={styles.product_details_container__text}>
          <strong>Price: </strong>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Icons name="AttachMoney" size={15} color="black" />
            {Number(price).toFixed(2)}
            {product.productMRP !== price && (
              <span
                style={{
                  textDecoration: "line-through",
                  marginLeft: "10px",
                  color: "red",
                }}
              >
                {product.productMRP}
              </span>
            )}
          </div>
        </div>
        <div className={styles.product_details_container__text}>
          <strong>Quantity: </strong>x {quantity}
        </div>
        <div className={styles.product_details_container__text}>
          <strong>Total: </strong>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Icons name="AttachMoney" size={15} color="black" />
            {price * quantity}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemContainer;
