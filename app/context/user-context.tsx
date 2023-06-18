"use client";

import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Buffer } from "buffer";
import { User, AuthContextProps, Product } from "../../utils/dataTypes";
import { CircularProgress } from "@mui/material";

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: {},
  token: "",
  login: (data: User, token: string) => {},
  logout: () => {},
  cart: [],
  addToCart: (product: Product, quantity: number) => {},
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
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>(
    []
  );

  const addToCart = (product: Product, quantity: number) => {
    if (quantity < 0) {
      // remove that much quantity from cart
      const productIndex = cart.findIndex(
        (cartProduct) => cartProduct.product._id === product._id
      );
      if (productIndex !== -1) {
        const newCart = [...cart];
        newCart[productIndex].quantity -= 1;
        if (newCart[productIndex].quantity === 0) {
          newCart.splice(productIndex, 1);
        }
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
        return;
      }
    } else {
      const productIndex = cart.findIndex(
        (cartProduct) => cartProduct.product._id === product._id
      );
      if (productIndex !== -1) {
        const newCart = [...cart];
        newCart[productIndex].quantity += 1;
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
        return;
      }
      setCart([...cart, { product, quantity }]);
      localStorage.setItem(
        "cart",
        JSON.stringify([...cart, { product, quantity }])
      );
    }
  };

  const login = (data: User, token: string) => {
    const userCart = data.cart;
    data.cart = undefined;
    localStorage.setItem("auth", token);
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("cart", JSON.stringify(cart));
    setIsAuthenticated(true);
    setToken(token);
    setUser({
      userName: data.userName,
      email: data.email,
    });
    setCart(
      userCart
        ? userCart.map((cartItem) => ({
            product: cartItem.product,
            quantity: cartItem.quantity,
          }))
        : []
    );
  };

  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    setIsAuthenticated(false);
    setUser({});
    setToken("");
    setCart([]);
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
      login(decodedData, accessToken);
    } else {
      const auth = localStorage.getItem("auth");
      const user = localStorage.getItem("user");
      const cart = localStorage.getItem("cart");
      if (auth && user) {
        if (cart) {
          setCart(JSON.parse(cart));
        }
        login(JSON.parse(user), auth);
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
        cart,
        addToCart,
      }}
    >
      {loading ? <CircularProgress /> : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
