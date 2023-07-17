"use client";
import { CartItems } from "@/utils/dataTypes";
import styles from "./ItemsContainer.module.css";
import Item from "./Item";
import { useContext } from "react";
import AuthContext from "@/app/context/user-context";
import { useState } from "react";
import Backdrop from "../Backdrop";
import { CircularProgress } from "@mui/material";

const ItemsContainer = ({
  cartItems,
  setCart,
}: {
  cartItems: CartItems[];
  setCart: React.Dispatch<React.SetStateAction<CartItems[]>>;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const authCtx = useContext(AuthContext);
  const manageItemHandler = async (
    index: number,
    quantity: number,
    product: string,
    seller: string
  ) => {
    if (quantity < 0 && Math.abs(quantity) > cartItems[index].seller.quantity) {
      authCtx.setMessage("Quantity cannot be less than 0");
      authCtx.setSeverity("info");
      authCtx.setOpen(true);
      return;
    }
    if (Math.abs(quantity) === cartItems[index].seller.quantity) {
      const newCartItems = cartItems.filter((item, i) => i !== index);
      setCart(newCartItems);
    } else {
      const newCartItems = cartItems.map((item, i) => {
        if (i === index) {
          return {
            product: item.product,
            seller: {
              ...item.seller,
              quantity: item.seller.quantity + quantity,
            },
          };
        }
        return item;
      });
      setCart(newCartItems);
    }
    setLoading(true);
    await authCtx.addToCart(product, quantity, seller);
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      {cartItems.length === 0 ? (
        <p
          style={{
            margin: "1rem",
            fontSize: "1.5rem",
          }}
        >
          Your Cart Is Empty
        </p>
      ) : (
        cartItems.map((item: CartItems, index: number) => {
          return (
            <>
              {loading && (
                <Backdrop key={index}>
                  <div className={styles.loading_container}>
                    Please Wait, Updating Cart...
                    <CircularProgress size={30} />
                  </div>
                </Backdrop>
              )}
              <Item
                key={index}
                product={item}
                index={index}
                manageItemQuantity={manageItemHandler}
              />
            </>
          );
        })
      )}
    </div>
  );
};

export default ItemsContainer;
