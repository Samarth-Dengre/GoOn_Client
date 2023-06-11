"use client";
import { useState } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { SearchRounded } from "@mui/icons-material";
import dynamic from "next/dynamic";
import Backdrop from "@/components/Backdrop";
import CircualarProgress from "@mui/material/CircularProgress";

// Lazy loading components
const Login = dynamic(() => import("@/components/Login"), {
  loading: () => <CircualarProgress />,
});
const Signup = dynamic(() => import("@/components/Signup"), {
  loading: () => <CircualarProgress />,
});

export default function Navbar() {
  const [showForm, setShowForm]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState(false);

  const [showSignupForm, setShowSignupForm]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState(false);

  return (
    <>
      {showForm && (
        <Backdrop
          hideBackdrop={() => {
            setShowForm(false);
            setShowSignupForm(false);
          }}
        >
          {showSignupForm ? (
            <Signup showSignupForm={() => setShowSignupForm(false)} />
          ) : (
            <Login showSignupForm={() => setShowSignupForm(true)} />
          )}
        </Backdrop>
      )}
      <div className={styles.container}>
        <div className={styles["search-container"]}>
          <input
            type="text"
            className={styles.searchBar}
            placeholder="search for your favorite store"
          />
          <button className={styles.searchButton}>
            <SearchRounded
              sx={{
                color: "rgb(0, 109, 198)",
                fontSize: "2rem",
              }}
            />
          </button>
        </div>
        <ul className={styles.links}>
          <li>
            <Link href="/" className={styles.link}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className={styles.link}>
              About
            </Link>
          </li>
        </ul>
        <div className={styles.ButtonContainer}>
          <button className={styles.registerButton} onClick={() => {}}>
            Register Store
          </button>
          <button
            className={styles.loginButton}
            onClick={() => setShowForm(true)}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}
