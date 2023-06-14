"use client";
import * as React from "react";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function Cart() {
  return (
    <Badge badgeContent={4} color="error">
        <ShoppingCartIcon sx={{
            color: "white",
        }} />
    </Badge>
  );
}
