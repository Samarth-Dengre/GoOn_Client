"use client";
import { useState, useContext } from "react";
import styles from "./Navbar.module.css";
import { SearchRounded } from "@mui/icons-material";
import dynamic from "next/dynamic";
import Backdrop from "../Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import Logo from "../../../public/logo.png";
import { useRouter } from "next/navigation";
import CustomButton from "../CustomButton";
import AuthContext from "@/app/store/user-context";

// Lazy loading components
const Login = dynamic(() => import("../Login"), {
  loading: () => <CircularProgress />,
});
const Signup = dynamic(() => import("../Signup"), {
  loading: () => <CircularProgress />,
});

export default function Navbar() {
  const authContext = useContext(AuthContext);
  const isLoggedIn = authContext.isAuthenticated;
  if (!isLoggedIn) {
    return null;
  }
  const [showForm, setShowForm]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState(false);

  const [showSignupForm, setShowSignupForm]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState(false);

  const router = useRouter();

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
        <div className={styles.logo} onClick={() => router.push("/")}>
          <Image src={Logo} alt="logo" width={250} height={300} />
        </div>
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
        {/* <ul className={styles.links}>
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
        </ul> */}
        <div className={styles.ButtonContainer}>
          <CustomButton
            title="Register Store"
            onClick={() => router.push("/register")}
            className={styles.registerButton}
            disabled={false}
          />
          <CustomButton
            title="Login"
            onClick={() => setShowForm(true)}
            className={styles.loginButton}
            disabled={false}
          />
        </div>
      </div>
    </>
  );
}
