import { useEffect, useContext, useState } from "react";

import UserContext from "../../context/user/userContext";

import "./explore.style.scss";
import ExtraPageLayout from "../../components/extra-page-layout/ExtraPageLayout.component";
import ProfileCard from "../../components/profile-card/ProfileCard.component";
import SearchBar from "../../components/search-bar/SearchBar.component";

const Explore = () => {
  const { exploreUsers, exploreSpecificUsers } = useContext(UserContext);
  const [firstLoad, setFirstLoad] = useState(true);
  const [exploreList, setExploreList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    searchUsers();
    // eslint-disable-next-line
  }, []);

  const searchUsers = async () => {
    const Data = await exploreUsers(searchValue);
    setExploreList(Data);
    setFirstLoad(false);
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
    <ExtraPageLayout pageTitle="Explore">
      <SearchBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onClick={searcSpecifchUser}
      ></SearchBar>
      {exploreList && exploreList.length > 0
        ? exploreList.map((item) => (
            <ProfileCard key={item} userUID={item}></ProfileCard>
          ))
        : !firstLoad && (
            <h2 className="explore__not-found fs-med fc-secondary">
              User Not Fount :(
            </h2>
          )}
    </ExtraPageLayout>
  );
};

export default Explore;
