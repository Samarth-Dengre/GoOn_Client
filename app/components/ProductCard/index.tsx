import { Product } from "@/utils/dataTypes";
import styles from "./ProductCard.module.css";
import Image from "next/image";
import ButtonsContainer from "./ButtonsContainer";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className={styles.product__container}>
      <div className={styles.product__image__container}>
        <Image
          src={product.productImage[0]}
          alt={product.productName}
          className={styles.product__image}
          width={500}
          height={500}
        />
      </div>
      <div className={styles.product__details__container}>
        <p className={styles.product__details__container__text}>
          <strong>Product Name: </strong>
          {product.productName}
        </p>
        <p className={styles.product__details__container__text}>
          <strong>Product Price: </strong>
          {product.productPrice}
        </p>
        <p className={styles.product__details__container__text}>
          <strong>Product Rating: </strong>
          {product.productrating.rating}
        </p>
      </div>
      <ButtonsContainer product={product} />
    </div>
  );
};

export default ProductCard;
