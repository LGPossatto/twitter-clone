import React from "react";

import "./sideCard.style.scss";

const SideCard = ({ children, title }) => {
  return (
    <div className="side-card">
      <h2 className="fs-big">{title}</h2>
      {children}
    </div>
  );
};

export default SideCard;
