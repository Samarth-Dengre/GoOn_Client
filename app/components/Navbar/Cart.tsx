"use client";
import { useContext } from "react";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AuthContext from "@/app/context/user-context";

export default function Cart() {
  const authCtx = useContext(AuthContext);
  return (
    <Badge badgeContent={authCtx.cart.length} color="error">
      <ShoppingCartIcon
        sx={{
          color: "white",
        }}
      />
    </Badge>
  );
}
