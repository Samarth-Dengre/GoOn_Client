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

  const addToCart = async (product: Product, quantity: number) => {
    let cartData;
    if (quantity < 0) {
      // remove that much quantity from cart
      const productIndex = cart.findIndex(
        (cartProduct) => cartProduct.product._id === product._id
      );
      if (productIndex !== -1) {
        cartData = [...cart];
        cartData[productIndex].quantity -= 1;
        if (cartData[productIndex].quantity === 0) {
          cartData.splice(productIndex, 1);
        }
        setCart(cartData);
        localStorage.setItem("cart", JSON.stringify(cartData));
      }
    } else {
      const productIndex = cart.findIndex(
        (cartProduct) => cartProduct.product._id === product._id
      );
      if (productIndex !== -1) {
        cartData = [...cart];
        cartData[productIndex].quantity += 1;
        setCart(cartData);
        localStorage.setItem("cart", JSON.stringify(cartData));
      } else {
        cartData = [...cart, { product, quantity }];
        setCart(cartData);
        localStorage.setItem("cart", JSON.stringify(cartData));
      }
    }

    if (isAuthenticated) {
      const auth = token;
      if (auth) {
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
            }),
          });
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || "Something went wrong!");
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  const login = (data: User, token: string) => {
    const userCart: { product: Product; quantity: number }[] | undefined =
      data.userCartProducts;
    data.userCartProducts = [];
    localStorage.setItem("auth", token);
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("cart", JSON.stringify(userCart));
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
        const parsedUser = JSON.parse(user);
        const parsedCart = JSON.parse(cart || "[]");
        parsedUser.userCartProducts = parsedCart;
        login(parsedUser, auth);
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
