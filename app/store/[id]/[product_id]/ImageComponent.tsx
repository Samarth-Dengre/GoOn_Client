"use client";
import { useState } from "react";
import styles from "./ImageComponent.module.css";
import Image from "next/image";
import CustomButton from "@/app/components/CustomComponents/CustomButton";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const ImageComponent = ({ images }: { images: string[] }) => {
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImageHandler = (delta: number) => {
    const nextImageIndex =
      (currentImageIndex + delta + images.length) % images.length;
    setCurrentImageIndex(nextImageIndex);
    setCurrentImage(images[nextImageIndex]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.image__container}>
        <Image
          src={currentImage}
          alt="product image"
          width={1000}
          height={1000}
          className={styles.image}
        />
      </div>
      <div className={styles.buttons__container}>
        <CustomButton
          title={<ChevronLeft />}
          className={styles.button}
          disabled={false}
          handleClick={() => nextImageHandler(-1)}
        />
        <CustomButton
          title={<ChevronRight />}
          className={styles.button}
          disabled={false}
          handleClick={() => nextImageHandler(1)}
        />
      </div>
    </div>
  );
};

export default ImageComponent;
