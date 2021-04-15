import React from "react";
import ExtraContent from "../extra-content/ExtraContent.component";

import "./main.style.scss";
import Feed from "../feed/Feed.component";

const Main = () => {
  return (
    <div className="main flex jc-sb">
      <Feed></Feed>
      <ExtraContent></ExtraContent>
    </div>
  );
};

export default Main;
