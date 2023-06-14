import React from "react";
import styles from "./Navbar.module.css";
import { SearchRounded } from "@mui/icons-material";

const SearchBar = () => {
  return (
    <>
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
    </>
  );
};

export default SearchBar;
