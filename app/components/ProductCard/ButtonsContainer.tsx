"use client";
import { useContext, useState } from "react";
import styles from "./ProductCard.module.css";
import CustomButton from "../CustomComponents/CustomButton";
import AuthContext from "@/app/context/user-context";
import { Product } from "@/utils/dataTypes";
import { useRouter } from "next/navigation";
import CustomizedSnackbars from "../CustomComponents/SnackBar";

const ButtonsContainer = ({
  product,
  seller,
}: {
  product: Product;
  seller: string;
}) => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();
  const isLoggedIn = authCtx.isAuthenticated;
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<
    "success" | "error" | "info" | "warning" | ""
  >("");
  const viewItemHandler = () => {
    router.push(`/store/${seller}/${product.productName}-${product._id}`);
  };

  const addToCartHandler = async () => {
    if (!isLoggedIn) {
      setMessage("You need to login to add items to cart");
      setSeverity("error");
      setShowSnackBar(true);
      return;
    }
    const result = await authCtx.addToCart(product, 1, seller);
    if (result === false) {
      setMessage("Unable to add item to cart");
      setSeverity("error");
      setShowSnackBar(true);
    }
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
      <CustomizedSnackbars
        message={message}
        open={showSnackBar}
        handleClose={() => setShowSnackBar(false)}
        severity={severity}
      />
    </>
  );
};

export default ButtonsContainer;
