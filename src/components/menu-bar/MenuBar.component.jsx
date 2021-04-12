import { Link } from "react-router-dom";

import "./menuBar.style.scss";
import MenuItem from "../menu-item/MenuItem.component";

const MenuBar = () => {
  return (
    <div className="menu-bar">
      <Link to="/" className="logo">
        <i className="fab fa-twitter fs-bigger"></i>
      </Link>
      <MenuItem link="#!" icon="fas fa-hashtag" text="Explore"></MenuItem>
      <MenuItem link="#!" icon="fas fa-user-circle" text="Profile"></MenuItem>
      <MenuItem
        link="#!"
        icon="fas fa-user-friends"
        text="Following"
      ></MenuItem>
      <MenuItem link="#!" icon="fas fa-users" text="Followers"></MenuItem>
      <MenuItem link="#!" icon="fas fa-envelope" text="Messages"></MenuItem>
    </div>
  );
};

export default MenuBar;
