"use client";

import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  AuthContextProps,
  Product,
  LoginFormProps,
} from "../../utils/dataTypes";
import { CircularProgress } from "@mui/material";
import { manageCart_url } from "@/utils/routes";
import CustomizedSnackbars from "../components/CustomComponents/SnackBar";
import { login_url } from "@/utils/routes";

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: {},
  token: "",
  login: (formData: LoginFormProps) => {},
  logout: () => {},
  cartSize: 0,
  setCartSize: () => {},
  addToCart: async (product: Product, quantity: number, seller: string) => {},
  setOpen: () => {},
  setMessage: () => {},
  setSeverity: () => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User>({});
  const [token, setToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [cartSize, setCartSize] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<"success" | "error" | "info">(
    "success"
  );

  const addToCart = async (
    product: Product,
    quantity: number,
    seller: string
  ): Promise<void> => {
    if (isAuthenticated) {
      const auth = token;
      if (auth) {
        if (cartSize + quantity < 0) {
          setMessage("Invalid quantity");
          setSeverity("error");
          setOpen(true);
        }
        setCartSize((prev) => prev + quantity);
        try {
          const response = await fetch(manageCart_url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth}`,
            },
            body: JSON.stringify({
              product: product._id,
              quantity,
              seller,
            }),
          });
          const data = await response.json();
          if (!response.ok) {
            setCartSize((prev) => prev - quantity);
            if (response.statusText === "Unauthorized") {
              logout();
              setOpen(true);
              setMessage("Please login to continue");
              setSeverity("info");
            }
            setMessage("Could not add the item to cart");
            setSeverity("error");
            setOpen(true);
          }
        } catch (err) {
          console.log(err);
          setCartSize((prev) => prev - quantity);
          setMessage("Something went wrong");
          setSeverity("error");
          setOpen(true);
        }
      }
    } else {
      setMessage("Please login to continue");
      setSeverity("info");
      setOpen(true);
    }
  };

  const login = async (formData: LoginFormProps) => {
    try {
      const response = await fetch(login_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        setMessage("Invalid credentials");
        setSeverity("error");
        setOpen(true);
        return;
      }
      const data = await response.json();

      localStorage.setItem("auth", data.token);
      setIsAuthenticated(true);
      setToken(data.token);
      setUser({
        userName: data.user.userName,
        email: data.user.email,
      });
      setCartSize(data.cartSize);
      setMessage("Welcome back");
      setSeverity("success");
      setOpen(true);
    } catch (err) {
      console.log(err);
      setMessage("Something went wrong");
      setSeverity("error");
      setOpen(true);
    }
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setIsAuthenticated(false);
    setUser({});
    setToken("");
    setCartSize(0);
  };

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    try {
      const validateToken = async () => {
        if (auth) {
          const response = await fetch(login_url, {
            method: "Get",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth}`,
            },
          });
          const data = await response.json();
          if (response.ok) {
            setIsAuthenticated(true);
            setToken(data.token);
            setUser({
              userName: data.user.userName,
              email: data.user.email,
            });
            setCartSize(data.cartSize);
            localStorage.setItem("auth", data.token);
          } else {
            logout();
            setMessage("Your session has expired. Please login again");
            setSeverity("info");
            setOpen(true);
          }
        }
        setLoading(false);
      };
      validateToken();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        login,
        logout,
        cartSize,
        setCartSize,
        addToCart,
        setOpen,
        setMessage,
        setSeverity,
      }}
    >
      <CustomizedSnackbars
        open={open}
        handleClose={() => setOpen(false)}
        message={message}
        severity={severity}
      />
      {loading ? <CircularProgress /> : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
