import PropTypes from "prop-types";

import "./searchBar.style.scss";

const SearchBar = ({ searchValue, setSearchValue, onClick }) => {
  return (
    <div className="search-bar flex">
      <input
        className="search-bar__input fs-med"
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        type="text"
        name="searchText"
        id="searchText"
        placeholder="Search specific email..."
      />
      <button className="search-bar__button" onClick={onClick}>
        <i className="fas fa-search fs-med"></i>
      </button>
    </div>
  );
};

SearchBar.propTypes = {
  searchValue: PropTypes.any,
  setSearchValue: PropTypes.func.isRequired,
};

export default SearchBar;
