"use client";
import { useState } from "react";
import styles from "./Navbar.module.css";
import { SearchRounded } from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";
import { CircularProgress } from "@mui/material";

document.addEventListener("click", function (event) {
  const searchResultsContainer = document.getElementById(
    "search-results-container"
  );
  const searchBar = document.getElementById("search-bar");
  if (event.target === searchResultsContainer || event.target === searchBar) {
    return;
  }
  searchResultsContainer && (searchResultsContainer.style.display = "none");
});

interface Item {
  item: {
    _id: string;
    storeName: string;
    storeImage: string;
  };
  refIndex: number;
}

const SearchBar = () => {
  const [data, setData] = useState<Item[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const searchHandler = async () => {
    try {
      setLoading(true);
      const result = await fetch(`/api/search/?search=${searchValue}`, {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 864000,
        },
      });
      setData(await result.json());
      setLoading(false);
      const searchResultsContainer = document.getElementById(
        "search-results-container"
      );
      searchResultsContainer &&
        (searchResultsContainer.style.display = "block");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  return (
    <>
      <input
        type="text"
        className={styles.searchBar}
        placeholder="search for your favorite store"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        id="search-bar"
      />
      {loading ? (
        <CircularProgress />
      ) : (
        <button
          className={styles.searchButton}
          onClick={searchHandler}
          id="search-bar"
        >
          <SearchRounded
            sx={{
              color: "rgb(0, 109, 198)",
              fontSize: "2rem",
            }}
          />
        </button>
      )}
      <div className={styles.searchResults} id="search-results-container">
        {data?.map((item: Item, index: number) => (
          <Link
            key={index}
            className={styles.search_result_item}
            href={`/store/${item.item._id}`}
          >
            <Image
              src={item.item.storeImage}
              alt={item.item.storeName}
              width={50}
              height={50}
              className={styles.search_result_image}
            />
            {item.item.storeName}
          </Link>
        ))}
      </div>
    </>
  );
};

export default SearchBar;
