"use client";
import { useContext, useState } from "react";
import styles from "./Navbar.module.css";
import Logo from "./Logo";
import AuthContext from "@/app/store/user-context";
import SearchBar from "./SearchBar";
import Cart from "./Cart";
import CustomButton from "../CustomComponents/CustomButton";
import Backdrop from "../Backdrop";
import LoginForm from "../Login";
import dynamic from "next/dynamic";
import { CircularProgress } from "@mui/material";
const SignupForm = dynamic(() => import("../Signup"), {
  ssr: false,
  loading: () => <CircularProgress />,
});

export default function Navbar() {
  const authContext = useContext(AuthContext);
  const isLoggedIn = authContext.isAuthenticated;

  const [showBackdrop, setShowBackdrop] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      {showBackdrop && (
        <Backdrop
          hideBackdrop={() => {
            setShowBackdrop(false);
            setShowLogin(false);
          }}
        >
          {showLogin ? (
            <LoginForm showSignupForm={() => setShowLogin(false)} />
          ) : (
            <SignupForm showLoginForm={() => setShowLogin(true)} />
          )}
        </Backdrop>
      )}
      <div className={styles.container}>
        <Logo />
        <div className={styles["search-container"]}>
          <SearchBar />
        </div>
        {isLoggedIn ? (
          <Cart />
        ) : (
          <CustomButton
            title="Login"
            className={styles.loginButton}
            onClick={() => setShowBackdrop(true)}
            disabled={false}
          />
        )}
      </div>
    </>
  );
}
