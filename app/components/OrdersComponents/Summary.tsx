import { OrderDetails } from "@/utils/dataTypes";
import styles from "./Summary.module.css";

const Summary = ({
  total,
  createdAt,
  orderStatus,
  modeOfPayment,
  deliveryAddress,
}: OrderDetails) => {
  return (
    <>
      <div className={styles.totalContainer}>
        <div className={styles.container_text}>
          <strong>Total: </strong>
          {Number(total).toFixed(2)}
        </div>
        <div className={styles.container_text}>
          <strong>Order Date: </strong>
          {new Date(createdAt).toLocaleDateString()}
        </div>
        <div className={styles.container_text}>
          <strong>Order Status: </strong>
          {orderStatus}
        </div>
        <div className={styles.container_text}>
          <strong>Mode of Payment: </strong>
          {modeOfPayment}
        </div>
      </div>
      <div className={styles.address_container}>
        <h3>Delivery Address:</h3>
        <div className={styles.address_container_text}>
          {deliveryAddress.landmark && deliveryAddress.landmark},{" "}
          {deliveryAddress.address}, {deliveryAddress.city}
        </div>
        <div className={styles.address_container_text}>
          {deliveryAddress.state}
        </div>
        <div className={styles.address_container_text}>
          {deliveryAddress.pincode}
        </div>
      </div>
    </>
  );
};

export default Summary;
