import React, { useEffect } from "react";
import styles from "../Search/Search.module.css";
import { useState } from "react";
import { useContext } from "react";
import { ShareContext } from "../../context/ShareContext";
import * as ShareService from "../../services/ShareService";

export default function Search() {
  const [search, setSearch] = useState("");
  //get games ref from context to filter and get new array wit searched data
  const { shares, onSearch } = useContext(ShareContext);
  //get all games with initial value of games array and keep reference to all games
  const [allShares, setAllShares] = useState([]);
  //filter data by search term if search field empty return all records in other way return filtered data
  const filtered = !search
    ? allShares
    : allShares.filter((share) =>
        share.title.toLowerCase().includes(search.toLowerCase())
      );
  
     //set new search value 
  const onSearchHandler = (e) => {
    setSearch(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //get searched data
    onSearch(filtered);
  };
  //get all games
  useEffect(() => {
    ShareService.getAll().then((res) => {
      setAllShares(res);
    });
  }, []);

  return (
    <div className={styles.searchForm}>
      <form onSubmit={onSubmit}>
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          name="search"
          onChange={onSearchHandler}
        />
        {/* <input type="submit" name="search" onClick={(e) => onSubmit(e)} />  */}
      </form>
    </div>
  );
}
