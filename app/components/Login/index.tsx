import React, { MouseEventHandler } from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { InputFields, FormContainer, SubmitButton } from "./styles";

export default function LoginForm({
  showSignupForm,
}: {
  showSignupForm: () => void;
}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState(false);

  const handleClickShowPassword = () =>
    setShowPassword((show: boolean) => !show);

  const submitFormHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Box sx={FormContainer}>
      <h1>Login</h1>
      <TextField
        label="Email"
        id="outlined-start-adornment"
        sx={InputFields}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />

      <FormControl sx={InputFields} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
      </FormControl>
      <Button variant="contained" onClick={submitFormHandler} sx={SubmitButton}>
        Login
      </Button>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p> Do not have an account? </p>
        <Button
          variant="text"
          sx={{ color: "rgb(0, 109, 198)" }}
          onClick={showSignupForm}
        >
          Signup
        </Button>
      </Box>
    </Box>
  );
}
