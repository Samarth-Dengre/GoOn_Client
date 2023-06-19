import React from "react";
import { fetch_store_by_categories_url } from "@/utils/routes";
import SingleStore from "../../components/StoreCard";
import { Store } from "@/utils/dataTypes";
import styles from "./Page.module.css";

const getCategoryId = (category: string) => {
  if (category === "grocery") return 3;
  if (category === "fashion") return 2;
  if (category === "electronics") return 1;
  if (category === "home-kitchen") return 8;
  if (category === "furniture") return 4;
  if (category === "beauty") return 7;
  if (category === "mobile-laptops") return 5;
  if (category === "footwear") return 9;
};

export const generateStaticParams = () => {
  return [
    {
      id: "grocery",
    },
    {
      id: "fashion",
    },
    {
      id: "electronics",
    },
    {
      id: "home-kitchen",
    },
    {
      id: "furniture",
    },
    {
      id: "beauty",
    },
    {
      id: "mobile-laptops",
    },
    {
      id: "sanitaryware",
    },
  ];
};

const getSoreByCategory = async (category: string) => {
  const id = getCategoryId(category);
  const res = await fetch(`${fetch_store_by_categories_url}/?category=${id}`, {
    method: "GET",
    next: { revalidate: 3600 },
  });
  const stores = await res.json();
  return stores;
};

const page = async ({ params }: { params: { id: string } }) => {
  const { categoryStores } = await getSoreByCategory(params.id);
  return (
    <div className={styles.container}>
      {categoryStores.map((store: Store, index: number) => (
        <SingleStore key={index} store={store} showCategory={false} />
      ))}
    </div>
  );
};

export default page;
