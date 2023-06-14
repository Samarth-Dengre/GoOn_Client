import React from "react";
import styles from "./Category.module.css";
import Image from "next/image";
import Link from "next/link";
import { ClassNames } from "@emotion/react";

const items = [
  {
    src: "/electronics.jpg",
    alt: "Mobiles & Laptops",
    path: "/mobile-laptops",
  },
  {
    src: "/fridge.jpg",
    alt: "Electronics",
    path: "/electronics",
  },
  {
    src: "/clothes.jpg",
    alt: "Fashion",
    path: "/fashion",
  },
  {
    src: "/beauty.png",
    alt: "Beauty & Personal Care",
    path: "/beauty",
  },
  {
    src: "/generalStore.png",
    alt: "Grocery",
    path: "/grocery",
  },
  {
    src: "/utensils.png",
    alt: "Home and kitchen",
    path: "/home-kitchen",
  },
  {
    src: "/furniture.png",
    alt: "Furniture",
    path: "/furniture",
  },
  {
    src: "/sanitary.jpg",
    alt: "Sanitaryware",
    path: "/sanitaryware",
  },
];

function Category() {
  return (
    <div className={styles.container}>
      {items.map((item, index) => (
        <div className={styles.category} key={index}>
          <Image
            src={item.src}
            alt={item.alt}
            width={100}
            height={100}
            className={styles.image}
          />
          <span>
            <Link href={`/categories${item.path}`} className={styles.link}>
              {item.alt}
            </Link>
          </span>
        </div>
      ))}
    </div>
  );
}

export default Category;
