import { useState } from "react";

import "./mobileMenu.style.scss";
import MenuItem from "../menu-item/MenuItem.component";

const MobileMenu = () => {
  const [mobileMenuActive, setMobileMenuActive] = useState(false);

  return (
    <div className="mobile-menu">
      <div
        className="mobile-menu__burg"
        onClick={() => setMobileMenuActive(!mobileMenuActive)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div
        className={`mobile-menu__items ${
          mobileMenuActive ? "mobile-menu__active" : ""
        }`}
      >
        <MenuItem icon="fas fa-hashtag" text="Explore" url="explore"></MenuItem>
        <MenuItem
          icon="fas fa-user-friends"
          text="Following"
          url="following"
        ></MenuItem>
        <MenuItem
          icon="fas fa-users"
          text="Followers"
          url="followers"
        ></MenuItem>
      </div>
    </div>
  );
};

export default MobileMenu;
