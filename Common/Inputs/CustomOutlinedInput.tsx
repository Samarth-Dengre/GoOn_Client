import React from "react";
import TextField from "@mui/material/TextField";

function CustomOutlinedInput({
  style,
  onChange,
  label,
}: {
  style: React.CSSProperties;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}) {
  return (
    <TextField
      label={label}
      id="outlined-start-adornment"
      sx={style}
      onChange={onChange}
    />
  );
}

export default CustomOutlinedInput;
