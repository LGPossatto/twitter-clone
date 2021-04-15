import React from "react";

import "./sideCard.style.scss";

const SideCard = ({ children }) => {
  return (
    <div className="side-card">
      <h2 className="fs-big">You might like</h2>
      {children}
    </div>
  );
};

export default SideCard;
