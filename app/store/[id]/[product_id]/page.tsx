import React from "react";
import { fetch_products_by_id_url } from "@/utils/routes";
import styles from "./Product.module.css";
import { Product } from "@/utils/dataTypes";
import Image from "next/image";
import ImageComponent from "./ImageComponent";

const getProduct = async (product_id: string) => {
  const id = product_id.split("-").pop();
  const res = await fetch(fetch_products_by_id_url + "/" + id, {
    method: "GET",
    next: { revalidate: 10 },
  });
  const data = await res.json();
  return data;
};

const ProductPage = async ({
  params,
}: {
  params: { id: string; product_id: string };
}) => {
  const product: Product = await getProduct(params.product_id);
  return (
    <div className={styles.container}>
      <div className={styles.upper_container}>
        <ImageComponent images={product.productImage} />
        <div className={styles.upper_container__productDetails_container}>
          <span>{product.productName}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
