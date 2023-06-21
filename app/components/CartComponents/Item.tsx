import { CartItems } from "@/utils/dataTypes";
import React from "react";
import styles from "./Item.module.css";
import Image from "next/image";
import Icons from "../CustomComponents/Icons";
import Link from "next/link";
import CustomButton from "../CustomComponents/CustomButton";

const Item = ({ product }: { product: CartItems }) => {
  return (
    <div className={styles.product_container}>
      <div className={styles.product_image_container}>
        <Image
          src={product.product.productImage[0]}
          alt={product.product.productName}
          width={200}
          height={200}
          className={styles.product_image}
        />
      </div>
      <div className={styles.product_details_container}>
        <Link
          className={styles.product_details_container__text}
          href={`/store/${product.seller.id}/${product.product.productName}-${product.product._id}`}
        >
          {product.product.productName}
        </Link>
        <div className={styles.product_details_container__text}>
          <strong>Seller: </strong>
          <Link
            href={`/store/${product.seller.id}`}
            className={styles.product_details_container__text}
          >
            {product.seller.sellerName}
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
            {product.seller.price}
          </div>
        </div>
        <div className={styles.product_details_container__text}>
          <strong>Quantity: </strong>x {product.seller.quantity}
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
            {product.seller.price * product.seller.quantity}
          </div>
        </div>
        <div className={styles.buttons_container}>
          <CustomButton
            title={<Icons name="Delete" size={20} color="black" />}
            handleClick={() => {
              console.log("Remove");
            }}
            disabled={false}
            className={styles.buttons_container__button}
          />
        </div>
      </div>
    </div>
  );
};

export default Item;
