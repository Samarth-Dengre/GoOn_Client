import { CartItems } from "@/utils/dataTypes";
import styles from "./ItemsContainer.module.css";
import Item from "./Item";

const ItemsContainer = ({ cartItems }: { cartItems: CartItems[] }) => {
  return (
    <div className={styles.container}>
      {cartItems.length === 0 ? (
        <p>Your Cart Is Empty</p>
      ) : (
        cartItems.map((item: CartItems, index: number) => {
          return <Item key={index} product={item} />;
        })
      )}
    </div>
  );
};

export default ItemsContainer;
