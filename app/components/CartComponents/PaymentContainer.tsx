import React from "react";
import styles from "./PaymentContainer.module.css";

const PaymentContainer = ({
  paymentMode,
  setPaymentMode,
}: {
  paymentMode: string;
  setPaymentMode: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className={styles.container}>
      <div
        className={`${styles.modeContainer} ${
          paymentMode === "DEBITCARD" && styles.selectedModeContainer
        }`}
        onClick={() => setPaymentMode("DEBITCARD")}
      >
        Debit Card
      </div>
      <div
        className={`${styles.modeContainer} ${
          paymentMode === "CREDITCARD" && styles.selectedModeContainer
        }`}
        onClick={() => setPaymentMode("CREDITCARD")}
      >
        Credit Card
      </div>
      <div
        className={`${styles.modeContainer} ${
          paymentMode === "UPI" && styles.selectedModeContainer
        }`}
        onClick={() => setPaymentMode("UPI")}
      >
        UPI
      </div>
      <div
        className={`${styles.modeContainer} ${
          paymentMode === "COD" && styles.selectedModeContainer
        }`}
        onClick={() => setPaymentMode("COD")}
      >
        Cash On Delivery
      </div>
    </div>
  );
};

export default PaymentContainer;
