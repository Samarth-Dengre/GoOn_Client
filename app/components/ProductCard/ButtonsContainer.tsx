"use client";
import { useContext, useState } from "react";
import styles from "./ProductCard.module.css";
import CustomButton from "../CustomComponents/CustomButton";
import AuthContext from "@/app/context/user-context";
import { Product } from "@/utils/dataTypes";
import { useRouter } from "next/navigation";

const ButtonsContainer = ({
  product,
  seller,
}: {
  product: Product;
  seller: string;
}) => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();
  const viewItemHandler = () => {
    router.push(`/store/${seller}/${product.productName}-${product._id}`);
  };

  const addToCartHandler = async () => {
    authCtx.addToCart(product._id, 1, seller);
  };

  return (
    <>
      <div className={styles.product__buttons__container}>
        <CustomButton
          title="Add to Cart"
          className={styles.product__buttons__container__button}
          disabled={false}
          handleClick={addToCartHandler}
        />
        <CustomButton
          title="View Item"
          className={`${styles.product__buttons__container__button} ${styles.outlined}`}
          disabled={false}
          handleClick={viewItemHandler}
        />
      </div>
    </>
  );
};

export default ButtonsContainer;
