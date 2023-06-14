"use client";
import { useContext } from "react";
import styles from "./Navbar.module.css";
import Logo from "./Logo";
import AuthContext from "@/app/store/user-context";
import SearchBar from "./SearchBar";
import Cart from "./Cart";

export default function Navbar() {
  const authContext = useContext(AuthContext);
  const isLoggedIn = authContext.isAuthenticated;
  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      <div className={styles.container}>
        <Logo />
        <div className={styles["search-container"]}>
          <SearchBar />
        </div>
        <Cart />
      </div>
    </>
  );
}
