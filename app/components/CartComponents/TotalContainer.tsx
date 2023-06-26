import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CartItems, DeliveryAddress } from "@/utils/dataTypes";
import styles from "./TotalContainer.module.css";
import CustomButton from "../CustomComponents/CustomButton";
import AddressContainer from "./AddressContainer";
import { checkout_url } from "@/utils/routes";
import AuthContext from "@/app/context/user-context";
import PaymentContainer from "./PaymentContainer";
import { CircularProgress } from "@mui/material";

const TotalContainer = ({
  cartItems,
  setCart,
}: {
  cartItems: CartItems[];
  setCart: React.Dispatch<React.SetStateAction<CartItems[]>>;
}) => {
  const router = useRouter();
  const [total, setTotal] = useState<string>("0");
  const [discount, setDiscount] = useState<string>("0");
  const [cartTotal, setCartTotal] = useState<string>("0");
  const [coupon, setCoupon] = useState<string>("");
  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress>({
    pincode: "",
    city: "",
    state: "",
    landmark: "",
    address: "",
  });
  const [addressFilled, setAddressFilled] = useState<boolean>(false);
  const [paymentMode, setPaymentMode] = useState<string>("DEBITCARD");
  const [placingOrder, setPlacingOrder] = useState<boolean>(false);
  const authCtx = useContext(AuthContext);

  // This useEffect is used to calculate the total, discount and cartTotal
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

  // This function is used to place the order and is called when the user clicks on the Place Order button
  const checkOutHandler = async () => {
    if (!addressFilled || placingOrder) return;
    try {
      setPlacingOrder(true);
      const res = await fetch(checkout_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        },
        body: JSON.stringify({
          modeOfPayment: paymentMode,
          deliveryAddress: deliveryAddress,
        }),
      });
      setPlacingOrder(false);
      const data = await res.json();
      if (res.statusText === "Unauthorized") {
        authCtx.setMessage("Please login to continue");
        authCtx.setSeverity("info");
        authCtx.setOpen(true);
        authCtx.logout();
        router.push("/");
        return;
      } else if (res.status === 400) {
        authCtx.setMessage(data.msg[0]);
        authCtx.setSeverity("info");
        authCtx.setOpen(true);
        return;
      }
      if (res.status === 201) {
        authCtx.setMessage("Order placed successfully");
        authCtx.setSeverity("success");
        authCtx.setOpen(true);
        authCtx.setCartSize(0);
        setCart([]);
        router.push("/");
        return;
      }
    } catch (err) {
      authCtx.setMessage("Something went wrong");
      authCtx.setSeverity("error");
      authCtx.setOpen(true);
      console.log(err);
    }
  };

  // This function is used to check if all the fields are filled in the address form and is called when the user clicks on the Payment button
  const adderessHandler = () => {
    if (
      deliveryAddress.address === "" ||
      deliveryAddress.city === "" ||
      deliveryAddress.pincode === "" ||
      deliveryAddress.state === ""
    ) {
      authCtx.setMessage("Please fill all the fields");
      authCtx.setOpen(true);
      authCtx.setSeverity("info");
      return;
    }
    setAddressFilled(true);
  };

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
        {addressFilled ? (
          <PaymentContainer
            paymentMode={paymentMode}
            setPaymentMode={setPaymentMode}
          />
        ) : (
          <AddressContainer
            deliveryAddress={deliveryAddress}
            setDeliveryAddress={setDeliveryAddress}
          />
        )}
      </div>
      <div className={styles.buttons_container}>
        {addressFilled && (
          <CustomButton
            title="Back"
            handleClick={() => setAddressFilled(false)}
            className={styles.checkout_button}
            disabled={false}
          />
        )}
        <CustomButton
          title={
            addressFilled ? (
              placingOrder ? (
                <CircularProgress size={25} sx={{ color: "white" }} />
              ) : (
                "Place Order"
              )
            ) : (
              "Payment"
            )
          }
          handleClick={
            addressFilled ? () => checkOutHandler() : () => adderessHandler()
          }
          className={styles.checkout_button}
          disabled={false}
        />
      </div>
    </>
  );
};

export default TotalContainer;
