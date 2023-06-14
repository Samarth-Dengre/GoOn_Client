"use client";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props: any, ref: any) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({
  message,
  severity,
  buttonData,
}: {
  message: string;
  severity: string;
  buttonData: string;
}) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event: any, reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Button
        variant="contained"
        onClick={handleClick}
        sx={{
          backgroundColor: "transparent",
          border: "none",
          outline: "none",
          height: "100%",
          width: "100%",
          margin: "0",
          boxShadow: "none",
          ":hover": {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
      >
        {buttonData}
      </Button>
      {message !== "" && severity !== "" && (
        <Snackbar open={open} autoHideDuration={3500} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      )}
    </Stack>
  );
}
