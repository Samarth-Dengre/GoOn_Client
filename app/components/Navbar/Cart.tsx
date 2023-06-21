"use client";
import { useContext } from "react";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AuthContext from "@/app/context/user-context";
import styles from "./Navbar.module.css";
import Link from "next/link";

export default function Cart() {
  const authCtx = useContext(AuthContext);
  return (
    <Link className={styles.cartIcon} href="/cart">
      <Badge badgeContent={authCtx.cartSize} color="error">
        <ShoppingCartIcon
          sx={{
            color: "white",
          }}
        />
      </Badge>
    </Link>
  );
}
