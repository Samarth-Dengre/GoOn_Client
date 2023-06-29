import React from "react";
import { fetch_products_by_id_url } from "@/utils/routes";
import styles from "./Product.module.css";
import { Product } from "@/utils/dataTypes";
import ImageComponent from "./ImageComponent";
import RatingStars from "@/app/components/CustomComponents/RatingStars";
import Buttons from "./Buttons";
import Icons from "@/app/components/CustomComponents/Icons";

const getProduct = async (product_id: string, store_id: string) => {
  const id = product_id.split("-").pop();
  const res = await fetch(
    fetch_products_by_id_url + "/" + id + "?store_id=" + store_id,
    {
      method: "GET",
      next: { revalidate: 5 },
    }
  );
  const data = await res.json();
  return data;
};

const ProductPage = async ({
  params,
}: {
  params: { id: string; product_id: string };
}) => {
  const product: Product = await getProduct(params.product_id, params.id);
  return (
    <div className={styles.container}>
      <div className={styles.upper_container}>
        <div className={styles.upper_container__image_details_container}>
          <ImageComponent images={product.productImage} />
          <div className={styles.upper_container__productDetails_container}>
            <strong>{product.productName}</strong>
            <div
              className={styles.upper_container__productDetails_container__text}
            >
              <strong>Rating: </strong>
              <RatingStars value={product.productrating.rating} />(
              {product.productrating.numReviews})
            </div>
            <div className={styles.price_container}>
              <span className={styles.price_container__title}>
                Special Price
              </span>
              <div
                className={
                  styles.upper_container__productDetails_container__text
                }
              >
                <Icons name="AttachMoney" size={18} color="black" />
                <span>{product.productStores[0].price}</span>
                {product.productMRP !== product.productStores[0].price && (
                  <span
                    style={{
                      textDecoration: "line-through",
                      marginLeft: "5px",
                      color: "red",
                      fontSize: "0.8rem",
                    }}
                  >
                    {product.productMRP}
                  </span>
                )}
              </div>
            </div>
            <div
              className={styles.upper_container__productDetails_container__text}
            >
              <strong>Seller: </strong>
              {product.productStores[0].store.storeName}
            </div>

            <div className={styles.upper_container__buttons_container}>
              <Buttons
                product={product}
                seller={product.productStores[0].store._id}
              />
            </div>
          </div>
        </div>
        <div className={styles.upper_container__productDescription_container}>
          <h2>Product Details</h2>
          {product.productDescription?.map((description) => (
            <li>{description}</li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
