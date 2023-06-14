"use client";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props: any, ref: any) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({
  message,
  severity,
  open,
  handleClose,
}: {
  message: string;
  severity: string;
  open: boolean;
  handleClose: () => void;
}) {
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      {message !== "" && severity !== "" && (
        <Snackbar
          open={open}
          autoHideDuration={3500}
          onClick={handleClose}
          onClose={handleClose}
        >
          <Alert severity={severity} sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      )}
    </Stack>
  );
}
