


// import { createContext, useEffect, useState, Fragment } from "react";
// import { useRouter } from "next/router";
// import { Buffer } from "buffer";
// import axios from "axios";

// interface User {
//   _id: string;
//   userName: string;
//   email: string;
//   pic: string;
// }

// const AuthContext = createContext({
//   isAuthenticated: false,
//   user: {},
//   token: "",
//   login: (token: string, data: User) => {},
//   logout: () => {},
//   loading: false,
// });

// export const AuthContextProvider = (props: any) => {
//   const router = useRouter();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState("");

//   const login = (token: string, data: User) => {
//     localStorage.setItem("zappinvest", token);
//     localStorage.setItem("user", JSON.stringify(data));
//     setIsAuthenticated(true);
//     setToken(token);
//     setUser({
//       id: data._id,
//       userName: data.userName,
//       email: data.email,
//       pic: data.pic,
//     });
//     const prevPath = localStorage.getItem("prevPath");
//     if (prevPath && prevPath !== "/login") {
//       localStorage.removeItem("prevPath");
//       router.push(prevPath);
//     } else {
//       router.push("/dashboard");
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("zappinvest");
//     localStorage.removeItem("user");
//     localStorage.removeItem("prevPath");
//     setIsAuthenticated(false);
//     setUser(null);
//     setToken("");
//     router.push("/login");
//   };

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const accessToken = urlParams.get("token");
//     const encodedData = urlParams.get("data");
//     if (accessToken && encodedData) {
//       const decodedData = JSON.parse(
//         Buffer.from(encodedData, "base64").toString()
//       );
//       login(accessToken, decodedData);
//       return;
//     }

//     const token = localStorage.getItem("zappinvest");
//     const verifyToken = async () => {
//       const { data } = await axios.get(process.env.REACT_APP_URL + "users", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (data && data.status === 400) {
//         logout();
//       }
//     };
//     verifyToken();
//     const user: User = JSON.parse(localStorage.getItem("user"));
//     if (token && user) {
//       login(token, user);
//     } else {
//       logout();
//     }
//   }, []);

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
