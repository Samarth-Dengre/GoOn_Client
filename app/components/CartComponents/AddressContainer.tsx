import React from "react";
import styles from "./AddressContainer.module.css";
import { TextField } from "@mui/material";
import { DeliveryAddress } from "@/utils/dataTypes";

const AddressContainer = ({
  deliveryAddress,
  setDeliveryAddress,
}: {
  deliveryAddress: DeliveryAddress;
  setDeliveryAddress: React.Dispatch<React.SetStateAction<DeliveryAddress>>;
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.upper_container}>
        <TextField
          placeholder="Pincode"
          label="Pincode"
          className={styles.input}
          variant="outlined"
          value={deliveryAddress.pincode}
          onChange={(e) =>
            setDeliveryAddress({ ...deliveryAddress, pincode: e.target.value })
          }
        />
        <TextField
          placeholder="City"
          label="City"
          className={styles.input}
          variant="outlined"
          value={deliveryAddress.city}
          onChange={(e) =>
            setDeliveryAddress({ ...deliveryAddress, city: e.target.value })
          }
        />
      </div>
      <div className={styles.upper_container}>
        <TextField
          placeholder="State"
          label="State"
          className={styles.input}
          variant="outlined"
          value={deliveryAddress.state}
          onChange={(e) =>
            setDeliveryAddress({ ...deliveryAddress, state: e.target.value })
          }
        />
        <TextField
          placeholder="Landmark(optional)"
          label="Landmark"
          className={styles.input}
          variant="outlined"
          value={deliveryAddress.landmark}
          onChange={(e) =>
            setDeliveryAddress({ ...deliveryAddress, landmark: e.target.value })
          }
        />
      </div>
      <TextField
        placeholder="Address"
        label="Address"
        className={styles.input}
        variant="outlined"
        value={deliveryAddress.address}
        onChange={(e) =>
          setDeliveryAddress({ ...deliveryAddress, address: e.target.value })
        }
      />
    </div>
  );
};

export default AddressContainer;
