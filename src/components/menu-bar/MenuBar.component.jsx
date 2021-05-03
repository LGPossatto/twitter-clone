import { Link } from "react-router-dom";

import "./menuBar.style.scss";
import MenuItem from "../menu-item/MenuItem.component";

const MenuBar = () => {
  return (
    <div className="menu-bar">
      <Link to="/" className="logo">
        <i className="fab fa-twitter fs-bigger"></i>
      </Link>
      <MenuItem icon="fas fa-hashtag" text="Explore" url="explore"></MenuItem>
      <MenuItem
        icon="fas fa-user-friends"
        text="Following"
        url="following"
      ></MenuItem>
      <MenuItem icon="fas fa-users" text="Followers" url="followers"></MenuItem>
    </div>
  );
};

export default MenuBar;
