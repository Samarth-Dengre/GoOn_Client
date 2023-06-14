"use client";

import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Buffer } from "buffer";
import { User, AuthContextProps } from "../../utils/dataTypes";

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: {},
  token: "",
  login: (token: string, data: User) => {},
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

  const login = (token: string, data: User) => {
    localStorage.setItem("auth", token);
    localStorage.setItem("user", JSON.stringify(data));
    setIsAuthenticated(true);
    setToken(token);
    setUser({
      userName: data.userName,
      email: data.email,
    });

    // const prevPath = localStorage.getItem("prevPath");
    // if (prevPath && prevPath !== "/login") {
    //   localStorage.removeItem("prevPath");
    //   router.push(prevPath);
    // } else {
    //   router.push("/dashboard");
    // }
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
      login(accessToken, decodedData);
    } else {
      const auth = localStorage.getItem("auth");
      const user = localStorage.getItem("user");
      if (auth && user) {
        login(auth, JSON.parse(user));
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{
        isAuthenticated,
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

//   useEffect(() => {
//     if (location.pathname !== "/login") {
//       localStorage.setItem("prevPath", location.pathname);
//       router.push(location.pathname);
//     } else {
//       if (isAuthenticated) {
//         router.push("/dashboard");
//       }
//     }
//   }, [location.pathname]);

//   const contextValue = {
//     isAuthenticated: isAuthenticated,
//     user: user,
//     token: token,
//     login: login,
//     logout: logout,
//   };

//   return (
//     <Fragment>
//       <AuthContext.Provider value={contextValue}>
//         {props.children}
//       </AuthContext.Provider>
//     </Fragment>
//   );
// };

// export default AuthContext;
