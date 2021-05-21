import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";

import { toTitleCase } from "../../utils/utils";

import UserContext from "../../context/user/userContext";

import "./explore.style.scss";
import ProfileCard from "../../components/profile-card/ProfileCard.component";
import SearchBar from "../../components/search-bar/SearchBar.component";

const Explore = () => {
  const { exploreUsers, exploreSpecificUsers } = useContext(UserContext);
  const [exploreList, setExploreList] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    searchUsers();
    // eslint-disable-next-line
  }, []);

  const searchUsers = async () => {
    const Data = await exploreUsers(searchValue);
    setExploreList(Data);
    setSearchValue("");
  };

  const searcSpecifchUser = async () => {
    if (searchValue === "") {
      searchUsers();
    } else {
      const newData = await exploreSpecificUsers(searchValue);
      setExploreList(newData);
      setSearchValue("");
    }
  };

  return (
    <div className="explore flex">
      <div className="explore__content">
        <h2 className="title fs-big flex jc-sb ai-c">
          {toTitleCase("explore")}{" "}
          <Link to="/">
            <i className="fas fa-times fs-big close-comment"></i>
          </Link>
        </h2>
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onClick={searcSpecifchUser}
        ></SearchBar>
        {exploreList.length > 0 ? (
          exploreList.map((item) => (
            <ProfileCard key={item} userUID={item}></ProfileCard>
          ))
        ) : (
          <h2 className="explore__not-found fs-med fc-secondary">
            User Not Fount :(
          </h2>
        )}
      </div>
    </div>
  );
};

export default Explore;
