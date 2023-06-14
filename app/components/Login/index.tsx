import React, { useState, useContext } from "react";
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
import CustomizedSnackbars from "../CustomComponents/SnackBar";
import { login_url } from "@/utils/routes";
import axios from "axios";
import AuthContext from "@/app/store/user-context";

export default function LoginForm({
  showSignupForm,
}: {
  showSignupForm: () => void;
}) {
  const authCtx = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState(false);

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickShowPassword = () =>
    setShowPassword((show: boolean) => !show);

  const submitFormHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    // check if all fields are filled and passwords match
    if (formData.email === "" || formData.password === "") {
      setMessage("Please fill all the fields");
      setSeverity("error");
      setOpen(true);
      return;
    } else if (formData.email.includes("@") === false) {
      setMessage("Please enter a valid email");
      setSeverity("error");
      setOpen(true);
      return;
    } else if (formData.password.length < 6) {
      setMessage("Password must be atleast 6 characters long");
      setSeverity("error");
      setOpen(true);
      return;
    }
    // send data to server
    try {
      const response = await axios.post(login_url, formData);
      if (response.status === 200) {
        authCtx.login(response.data.user, response.data.token);
      }
    } catch (err: any) {
      setMessage(err.response.data.message[0]);
      setSeverity("error");
      setOpen(true);
      return;
    }
  };

  return (
    <Box sx={FormContainer}>
      <h1>Login</h1>
      <TextField
        type="email"
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
      <CustomizedSnackbars
        message={message}
        severity={severity}
        open={open}
        handleClose={() => setOpen(false)}
      />
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
