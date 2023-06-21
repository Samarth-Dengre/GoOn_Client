import { useEffect, useState } from "react";
import { CartItems } from "@/utils/dataTypes";
import styles from "./TotalContainer.module.css";
import CustomButton from "../CustomComponents/CustomButton";
import AddressContainer from "./AddressContainer";
import Skeleton from "@mui/material/Skeleton";

const TotalContainer = ({ cartItems }: { cartItems: CartItems[] }) => {
  const [total, setTotal] = useState<string>("0");
  const [discount, setDiscount] = useState<string>("0");
  const [cartTotal, setCartTotal] = useState<string>("0");
  useEffect(() => {
    let cartSum = 0;
    let sum = 0;
    let off = 0;
    for (let i = 0; i < cartItems.length; i++) {
      const t = cartItems[i].seller.quantity * cartItems[i].seller.price;
      const quantity = cartItems[i].seller.quantity;
      cartSum += cartItems[i].product.productMRP * quantity;
      sum += t;
      off += cartItems[i].product.productMRP * quantity - t;
    }
    setTotal(sum.toFixed(2));
    setDiscount(off.toFixed(2));
    setCartTotal(cartSum.toFixed(2));
  }, [cartItems]);

  return (
    <>
      <div>
        <div className={styles.total_container_text}>
          <strong>Total: </strong>
          {cartTotal}
        </div>
        <div className={styles.total_container_text}>
          <strong>Discount: </strong>-{discount}
        </div>
        <div className={styles.total_separator}></div>
        <div className={styles.total_container_text}>
          <strong>Net Amount: </strong>
          {total}
        </div>
        <div className={styles.coupon_input_container}>
          <input
            type="text"
            placeholder="Enter coupon code"
            className={styles.coupon_input}
          />
          <CustomButton
            title="Apply"
            handleClick={() => console.log("Apply")}
            className={styles.coupon_apply_button}
            disabled={false}
          />
        </div>
      </div>

      <div className={styles.address_container}>
        <AddressContainer />
      </div>
      <div className={styles.buttons_container}>
        <CustomButton
          title="Checkout"
          handleClick={() => console.log("Checkout")}
          className={styles.checkout_button}
          disabled={false}
        />
      </div>
    </>
  );
};

export default TotalContainer;
