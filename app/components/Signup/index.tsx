"use client";
import { useState, useContext } from "react";
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
import AuthContext from "@/app/context/user-context";
import { CircularProgress } from "@mui/material";

export default function SignupForm({
  showLoginForm,
}: {
  showLoginForm: () => void;
}) {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    email: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const authCtx = useContext(AuthContext);
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
      authCtx.setMessage("Please fill all the fields");
      authCtx.setSeverity("info");
      authCtx.setOpen(true);
      return;
    } else if (formData.email.includes("@") === false) {
      authCtx.setMessage("Please enter a valid email");
      authCtx.setSeverity("info");
      authCtx.setOpen(true);
      return;
    } else if (formData.password !== formData.confirmPassword) {
      authCtx.setMessage("Passwords do not match");
      authCtx.setSeverity("info");
      authCtx.setOpen(true);
      return;
    } else if (formData.password.length < 6) {
      authCtx.setMessage("Password must be atleast 6 characters long");
      authCtx.setSeverity("info");
      authCtx.setOpen(true);
      return;
    }

    // send data to server
    try {
      setLoading(true);
      const response = await axios.post(signup_url, formData);
      setLoading(false);
      authCtx.setMessage("Signup successful");
      authCtx.setSeverity("success");
      authCtx.setOpen(true);
    } catch (err: any) {
      console.log(err.response);
      authCtx.setMessage(err.response.data.message);
      authCtx.setSeverity("error");
      authCtx.setOpen(true);
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
        {loading ? <CircularProgress /> : "Signup"}
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
          onClick={showLoginForm}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}
