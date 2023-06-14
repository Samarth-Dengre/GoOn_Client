"use client";

import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Buffer } from "buffer";
import { User, AuthContextProps } from "../../utils/dataTypes";
import { CircularProgress } from "@mui/material";

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: {},
  token: "",
  login: (data: User, token: string) => {},
  logout: () => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User>({});
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  const login = (data: User, token: string) => {
    localStorage.setItem("auth", token);
    localStorage.setItem("user", JSON.stringify(data));
    setIsAuthenticated(true);
    setToken(token);
    setUser({
      userName: data.userName,
      email: data.email,
    });
  };

  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser({});
    setToken("");
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
      if (auth && user) {
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
      }}
    >
      {loading ? <CircularProgress /> : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

