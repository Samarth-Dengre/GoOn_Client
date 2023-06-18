"use client";
import { useContext } from "react";
import styles from "./ProductCard.module.css";
import CustomButton from "../CustomComponents/CustomButton";
import AuthContext from "@/app/context/user-context";
import { Product } from "@/utils/dataTypes";
import { useRouter } from "next/navigation";

const ButtonsContainer = ({ product }: { product: Product }) => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  const viewItemHandler = () => {
    router.push(
      `/store/${product.productStore}/${product.productName}-${product._id}`
    );
  };

  return (
    <div className={styles.product__buttons__container}>
      <CustomButton
        title="Add to Cart"
        className={styles.product__buttons__container__button}
        disabled={false}
        handleClick={() => authCtx.addToCart(product, 1)}
      />
      <CustomButton
        title="View Item"
        className={styles.product__buttons__container__button}
        disabled={false}
        handleClick={viewItemHandler}
      />
    </div>
  );
};

export default ButtonsContainer;
