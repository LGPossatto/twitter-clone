import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./iconInfo.style.scss";

const IconInfo = ({ icon, text, url }) => {
  return (
    <div className="icon-info flex ai-c">
      <i className={`fs-med fc-secondary ${icon}`}></i>
      {url ? (
        <Link to="url" className="fs-med fc-primary">
          {text}
        </Link>
      ) : (
        <span className="fs-med fc-secondary">{text}</span>
      )}
    </div>
  );
};

IconInfo.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default IconInfo;
