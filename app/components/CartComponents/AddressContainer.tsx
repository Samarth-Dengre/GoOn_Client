import React from "react";
import styles from "./AddressContainer.module.css";
import { TextField } from "@mui/material";

const AddressContainer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.upper_container}>
        <TextField
          placeholder="Pincode"
          label="Pincode"
          className={styles.input}
          variant="outlined"
        />
        <TextField
          placeholder="City"
          label="City"
          className={styles.input}
          variant="outlined"
        />
      </div>
      <div className={styles.upper_container}>
        <TextField
          placeholder="State"
          label="State"
          className={styles.input}
          variant="outlined"
        />
        <TextField
          placeholder="Landmark(optional)"
          label="Landmark"
          className={styles.input}
          variant="outlined"
        />
      </div>
      <TextField
        placeholder="Address"
        label="Address"
        className={styles.input}
        variant="outlined"
      />
    </div>
  );
};

export default AddressContainer;
