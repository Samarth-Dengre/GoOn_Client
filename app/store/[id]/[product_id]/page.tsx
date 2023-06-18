import React from "react";
import { fetch_products_by_id_url } from "@/utils/routes";
import styles from "./Product.module.css";
import { Product } from "@/utils/dataTypes";

const getProduct = async (product_id: string) => {
  const id = product_id.split("-").pop();
  const res = await fetch(fetch_products_by_id_url + "/" + id, {
    method: "GET",
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
  console.log(product);
  return <div className={styles.container}>{product.productName}</div>;
};

export default ProductPage;
