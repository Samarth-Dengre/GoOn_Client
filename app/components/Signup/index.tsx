"use client";
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
import axios from "axios";
import { signup_url } from "@/utils/routes";
import {
  InputFields,
  PasswordContainer,
  FormContainer,
  PasswordField,
  SubmitButton,
} from "./styles";
import CustomizedSnackbars from "../CustomComponents/SnackBar";

export default function SignupForm({
  showSignupForm,
}: {
  showSignupForm: () => void;
}) {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    email: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const [showPassword, setShowPassword]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState(false);

  const handleClickShowPassword = () =>
    setShowPassword((show: boolean) => !show);

  const submitFormHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    // check if all fields are filled and passwords match
    if (
      formData.userName === "" ||
      formData.password === "" ||
      formData.email === "" ||
      formData.confirmPassword === ""
    ) {
      setMessage("Please fill all the fields");
      setSeverity("error");
      return;
    } else if (formData.email.includes("@") === false) {
      setMessage("Please enter a valid email");
      setSeverity("error");
      return;
    } else if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      setSeverity("error");
      return;
    } else if (formData.password.length < 6) {
      setMessage("Password must be at least 6 characters long");
      setSeverity("error");
      return;
    }

    // send data to server
    try {
      const response = await axios.post(signup_url, formData);
      console.log(response);
      setMessage(response.data.message[0]);
      setSeverity("success");
    } catch (err: any) {
      console.log(err.response);
      setMessage(err.response.data.message[0]);
      setSeverity("error");
    }
  };

  return (
    <Box sx={FormContainer}>
      <h1>Signup</h1>
      <TextField
        label="Username"
        id="outlined-start-adornment"
        sx={InputFields}
        onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
      />
      <TextField
        label="Email"
        id="outlined-start-adornment"
        sx={InputFields}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />

      <Box sx={PasswordContainer}>
        <FormControl sx={PasswordField} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
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
        <TextField
          label="Confirm Password"
          id="outlined-start-adornment"
          sx={PasswordField}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
        />
      </Box>
      <Button variant="contained" onClick={submitFormHandler} sx={SubmitButton}>
        <CustomizedSnackbars
          message={message}
          severity={severity}
          buttonData="SIGNUP"
        />
      </Button>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p> Already have an account? </p>
        <Button
          variant="text"
          sx={{ color: "rgb(0, 109, 198)" }}
          onClick={showSignupForm}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}
