import { useState } from "react";
import PropTypes from "prop-types";

import "./moreBtn.style.scss";

const MoreBtn = ({ onClick }) => {
  const [active, setActive] = useState(false);

  return (
    <div className={`more-btn ${active ? "more-btn-active" : ""}`}>
      <i
        className="fas fa-ellipsis-h fs-med fc-secondary"
        onClick={() => setActive(!active)}
      ></i>
      {active && (
        <div className="more-btn__item fs-small fc-secondary" onClick={onClick}>
          Delete
        </div>
      )}
    </div>
  );
};

MoreBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default MoreBtn;
