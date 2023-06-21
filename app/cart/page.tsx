"use client";
import { useEffect, useContext, useState } from "react";
import styles from "./CartPage.module.css";
import { fetch_user_cart_url } from "@/utils/routes";
import AuthContext from "../context/user-context";
import CustomizedSnackbars from "../components/CustomComponents/SnackBar";
import TotalContainer from "../components/CartComponents/TotalContainer";
import { CartItems } from "@/utils/dataTypes";
import ItemsContainer from "../components/CartComponents/ItemsContainer";
import Skeleton from "@mui/material/Skeleton";

const CartPage = () => {
  const authCtx = useContext(AuthContext);
  const [cart, setCart] = useState<CartItems[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const getUserCart = async () => {
        setLoading(true);
        const res = await fetch(fetch_user_cart_url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
          },
        });
        setLoading(false);
        if (!res.ok) {
          if (res.statusText === "Unauthorized") {
            setMessage("Please login to continue!");
            setSeverity("error");
            setOpen(true);
            authCtx.logout();
            return;
          }
          setMessage("Something went wrong!");
          setSeverity("error");
          setOpen(true);
          return;
        }
        const data = await res.json();
        setCart(data.cartItems);
      };
      getUserCart();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <div className={styles.cart_container}>
        <div className={styles.cart_container__items_container}>
          {loading ? (
            <div>
              <Skeleton
                variant="rectangular"
                width={2000}
                height={180}
                sx={{
                  backgroundColor: "#c5c5c5",
                  marginBottom: "1rem",
                }}
              />
              <Skeleton
                variant="rectangular"
                width={2000}
                height={180}
                sx={{
                  backgroundColor: "#c5c5c5",
                  marginBottom: "1rem",
                }}
              />
              <Skeleton
                variant="rectangular"
                width={2000}
                height={180}
                sx={{
                  backgroundColor: "#c5c5c5",
                }}
              />
            </div>
          ) : (
            <ItemsContainer cartItems={cart} />
          )}
        </div>
        <div className={styles.cart_container__total_container}>
          <TotalContainer cartItems={cart} />
        </div>
      </div>
      <CustomizedSnackbars
        open={open}
        severity={severity}
        message={message}
        handleClose={() => setOpen(false)}
      />
    </>
  );
};

export default CartPage;