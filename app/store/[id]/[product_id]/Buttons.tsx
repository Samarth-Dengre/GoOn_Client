"use client";
import { useContext, useState } from "react";
import styles from "./Buttons.module.css";
import CustomButton from "@/app/components/CustomComponents/CustomButton";
import AuthContext from "@/app/context/user-context";
import { Product } from "@/utils/dataTypes";
import FeedbackRating from "@/app/components/CustomComponents/FeedbackRatingStars";
import { rate_product_url } from "@/utils/routes";
import { CircularProgress } from "@mui/material";

const Buttons = ({ product, seller }: { product: Product; seller: string }) => {
  const authCtx = useContext(AuthContext);
  const addToCartHandler = () => {
    authCtx.addToCart(product._id, 1, seller);
  };
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);
  const rateProductHandler = async () => {
    try {
      setLoading(true);
      if (value === 0) {
        authCtx.setMessage("Please select a rating!");
        authCtx.setSeverity("info");
        authCtx.setOpen(true);
        setLoading(false);
        return;
      }
      const res = await fetch(rate_product_url, {
        method: "POST",
        body: JSON.stringify({
          product_id: product._id,
          rating: value,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authCtx.token,
        },
      });
      setLoading(false);
      if (res.statusText === "Unauthorized" || res.status === 401) {
        authCtx.setMessage("Please login to rate the product!");
        authCtx.setSeverity("info");
        authCtx.setOpen(true);
        authCtx.logout();
        return;
      }
      const data = await res.json();
    } catch (err) {
      console.log(err);
      setLoading(false);
      authCtx.setMessage("Something went wrong!");
      authCtx.setSeverity("error");
      authCtx.setOpen(true);
    }
  };

  return (
    <>
      <CustomButton
        className={styles.button}
        title="Add to Cart"
        handleClick={addToCartHandler}
        disabled={false}
      />
      <div className={styles.rating_container}>
        <FeedbackRating value={value} setValue={setValue} />
        <CustomButton
          className={styles.button}
          title={
            loading ? (
              <CircularProgress
                size={20}
                sx={{
                  color: "#fff",
                }}
              />
            ) : (
              "Submit"
            )
          }
          handleClick={() => rateProductHandler()}
          disabled={false}
        />
      </div>
    </>
  );
};

export default Buttons;
