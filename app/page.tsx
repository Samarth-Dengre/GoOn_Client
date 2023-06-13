"use client";

import styles from "./page.module.css";
import Home from "@/app/components/Home";
import { useContext } from "react";
import AuthContext from "@/app/store/user-context";
import LandingPage from "@/app/components/LandingPage";

export default function index() {
  const authContext = useContext(AuthContext);
  const isLoggedIn = authContext.isAuthenticated;
  return (
    <main className={styles.main}>
      {isLoggedIn ? <Home /> : <LandingPage />}
    </main>
  );
}
