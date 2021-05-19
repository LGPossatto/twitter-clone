import { useState } from "react";

import "./searchBar.style.scss";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");

  const searchUsers = () => {
    console.log("ok");
  };

  return (
    <div className="search-bar flex">
      <input
        className="search-bar__input fs-med"
        onChange={(e) => setSearchText(e.target.value)}
        type="text"
        name="searchText"
        id="searchText"
        placeholder="Search for someone..."
      />
      <button className="search-bar__button" onClick={searchUsers}>
        <i className="fas fa-search fs-med"></i>
      </button>
    </div>
  );
};

export default SearchBar;
