import React from "react";

import "./home.style.scss";
import MenuBar from "../../components/menu-bar/MenuBar.component";
import Main from "../../components/main/Main.component";

const Home = () => {
  return (
    <div className="flex jc-c">
      <div className="menu-box">
        <MenuBar></MenuBar>
      </div>
      <Main></Main>
    </div>
  );
};

export default Home;
