import { Product } from "@/utils/dataTypes";
import styles from "./ProductCard.module.css";
import Image from "next/image";
import ButtonsContainer from "./ButtonsContainer";
import RatingStars from "../CustomComponents/RatingStars";
import Icons from "../CustomComponents/Icons";

const ProductCard = ({
  product,
  price,
  seller,
}: {
  product: Product;
  price: number;
  seller: string;
}) => {
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
          {product.productName}
        </p>
        <p className={styles.product__details__container__text}>
          <strong>Product Price: </strong>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Icons name="AttachMoney" size={17} color="black" />
            {price}
            {product.productMRP !== price && (
              <span
                style={{
                  textDecoration: "line-through",
                  marginLeft: "10px",
                  color: "red",
                }}
              >
                {product.productMRP}
              </span>
            )}
          </div>
        </p>
        <p className={styles.product__details__container__text}>
          <strong>Product Rating: </strong>
          <RatingStars
            value={product.productrating?.rating || 0}
            count={product.productrating?.numReviews || 0}
          />
        </p>
      </div>
      <ButtonsContainer product={product} seller={seller} />
    </div>
  );
};

export default ProductCard;
