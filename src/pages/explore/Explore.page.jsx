import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";

import { toTitleCase } from "../../utils/utils";

import UserContext from "../../context/user/userContext";

import "./explore.style.scss";
import ProfileCard from "../../components/profile-card/ProfileCard.component";
import SearchBar from "../../components/search-bar/SearchBar.component";

const Explore = () => {
  const { exploreUsers } = useContext(UserContext);
  const [exploreList, setExploreList] = useState(null);

  useEffect(() => {
    exploreUsers().then((data) => setExploreList(data));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="explore flex">
      <div className="explore__content">
        <h2 className="title fs-big flex jc-sb ai-c">
          {toTitleCase("explore")}{" "}
          <Link to="/">
            <i className="fas fa-times fs-big close-comment"></i>
          </Link>
        </h2>
        <SearchBar></SearchBar>
        {exploreList &&
          exploreList.map((item) => (
            <ProfileCard key={item} userUID={item}></ProfileCard>
          ))}
      </div>
    </div>
  );
};

export default Explore;
