import { CartItems } from "@/utils/dataTypes";
import styles from "./ItemsContainer.module.css";
import Item from "./Item";
import { useContext } from "react";
import AuthContext from "@/app/context/user-context";

const ItemsContainer = ({
  cartItems,
  setCart,
}: {
  cartItems: CartItems[];
  setCart: React.Dispatch<React.SetStateAction<CartItems[]>>;
}) => {
  const authCtx = useContext(AuthContext);
  const manageItemHandler = (
    index: number,
    quantity: number,
    product: string,
    seller: string
  ) => {
    if (quantity === 1) {
      const newCartItems = cartItems.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            quantity,
          };
        }
        return item;
      });
      setCart(newCartItems);
    } else if (quantity === -1) {
      if (cartItems[index].seller.quantity === 1) {
        const newCartItems = cartItems.filter((item, i) => i !== index);
        setCart(newCartItems);
      } else {
        const newCartItems = cartItems.map((item, i) => {
          if (i === index) {
            return {
              ...item,
              quantity: item.seller.quantity - 1,
            };
          }
          return item;
        });
        setCart(newCartItems);
      }
    } else {
      const newCartItems = cartItems.filter((item, i) => i !== index);
      setCart(newCartItems);
    }
    authCtx.addToCart(product, quantity, seller);
  };
  return (
    <div className={styles.container}>
      {cartItems.length === 0 ? (
        <p
          style={{
            margin: "1rem 0",
            fontSize: "1.5rem",
          }}
        >
          Your Cart Is Empty
        </p>
      ) : (
        cartItems.map((item: CartItems, index: number) => {
          return (
            <Item
              key={index}
              product={item}
              index={index}
              manageItemQuantity={manageItemHandler}
            />
          );
        })
      )}
    </div>
  );
};

export default ItemsContainer;
