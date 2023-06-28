import { OrderDetails } from "@/utils/dataTypes";
import styles from "./OrderRectangle.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

const OrderRectangle = ({ order }: { order: OrderDetails }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/orders/${order._id}`);
  };
  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.imagesContainer}>
        {order.orderItems.slice(0, 3).map((item, index) => (
          <Image
            src={item.product.productImage[0]}
            alt="Image of the product"
            width={100}
            height={100}
            className={styles.image}
          />
        ))}
        {order.orderItems.length > 3 && (
          <div className={styles.moreItems}>
            <span>+{order.orderItems.length - 3}</span>
          </div>
        )}
      </div>
      <div className={styles.text_container}>
        <div className={styles.container_text}>
          <strong>Order Total: </strong>
          <span>{Number(order.total).toFixed(2)}</span>
        </div>
        <div className={styles.container_text}>
          <strong>Order Status: </strong>
          <span>{order.orderStatus}</span>
        </div>
        <div className={styles.container_text}>
          <strong>Order Date: </strong>
          <span>{new Date(order.createdAt).toLocaleDateString()}</span>
        </div>
        <div className={styles.container_text}>
          <strong>Mode Of Payment: </strong>
          <span>{order.modeOfPayment}</span>
        </div>
        <div className={styles.container_text}>
          <strong>Expexted Delivery: </strong>
          <span> _/_/_</span>
        </div>
      </div>
    </div>
  );
};

export default OrderRectangle;
