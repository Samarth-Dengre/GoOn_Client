"use client";

import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Buffer } from "buffer";
import { User, AuthContextProps, Product } from "../../utils/dataTypes";
import { CircularProgress } from "@mui/material";
import { manageCart_url } from "@/utils/routes";

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: {},
  token: "",
  login: (data: User, token: string) => {},
  logout: () => {},
  cartSize: 0,
  addToCart: async (product: Product, quantity: number, seller: string) =>
    false,
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

  const addToCart = async (
    product: Product,
    quantity: number,
    seller: string
  ): Promise<boolean> => {
    if (isAuthenticated) {
      const auth = token;
      if (auth) {
        if (cartSize + quantity < 0) {
          return false;
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
            }
            return false;
          }
          return true;
        } catch (err) {
          console.log(err);
          setCartSize((prev) => prev - quantity);
          return false;
        }
      }
    }
    return false;
  };

  const login = (data: User, token: string, cartSize: number) => {
    const userCart: { product: Product; quantity: number }[] | undefined =
      data.userCartProducts;
    data.userCartProducts = [];
    localStorage.setItem("auth", token);
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("cartSize", cartSize.toString());
    setIsAuthenticated(true);
    setToken(token);
    setUser({
      userName: data.userName,
      email: data.email,
    });
    setCartSize(cartSize);
  };

  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    localStorage.removeItem("cartSize");
    setIsAuthenticated(false);
    setUser({});
    setToken("");
    setCartSize(0);
    router.push("/");
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("token");
    const encodedData = urlParams.get("data");
    if (accessToken && encodedData) {
      const decodedData = JSON.parse(
        Buffer.from(encodedData, "base64").toString()
      );
      login(decodedData, accessToken, 0);
    } else {
      const auth = localStorage.getItem("auth");
      const user = localStorage.getItem("user");
      const cartSize = localStorage.getItem("cartSize");
      if (auth && user) {
        login(JSON.parse(user), auth, parseInt(cartSize || "0"));
      } else {
        logout();
      }
    }
    setLoading(false);
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
        addToCart,
      }}
    >
      {loading ? <CircularProgress /> : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
