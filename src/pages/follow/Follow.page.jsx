import { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import UserContext from "../../context/user/userContext";

import "./follow.style.scss";

const Follow = () => {
  const {
    following: { followingList },
    followers: { followersList },
  } = useContext(UserContext);
  const { follow } = useParams();

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  return (
    <div className="follow flex">
      <div className="follow__content">
        <h2 className="title fs-big flex jc-sb ai-c">
          {follow}{" "}
          <Link to="/">
            <i className="fas fa-times fs-big close-comment"></i>
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default Follow;
