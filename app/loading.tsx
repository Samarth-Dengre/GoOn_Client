"use client";
import { CircularProgress } from "@mui/material";
import React from "react";
import styles from "./loading.module.css";

const loading = () => {
  return (
    <div className={styles.container}>
      <CircularProgress />
    </div>
  );
};

export default loading;
