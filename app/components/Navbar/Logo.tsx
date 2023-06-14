"use client";
import React from "react";
import Image from "next/image";
import styles from "./Navbar.module.css";
import { useRouter } from "next/navigation";
const Logo = () => {
  const router = useRouter();
  return (
    <div className={styles.logo} onClick={() => router.push("/")}>
      <Image
        src="/logo.png"
        alt="Go.On"
        width={250}
        height={300}
        className={styles.logoImage}
      />
    </div>
  );
};

export default Logo;
