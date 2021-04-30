import React from "react";

import "./home.style.scss";
import MenuBar from "../../components/menu-bar/MenuBar.component";
import Main from "../../components/main/Main.component";

const Home = () => {
  return (
    <div className="home flex jc-c">
      <div className="menu-box">
        <MenuBar></MenuBar>
      </div>
      <div>
        <Main></Main>
        <div className="footer fs-small fc-secondary">
          Twitter Clone by{" "}
          <a href="#!" className="fs-small fc-primary">
            Luiz Gustavo Possatto
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
