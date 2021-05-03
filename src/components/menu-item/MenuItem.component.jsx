import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./menuItem.style.scss";

const MenuItem = ({ icon, text, url }) => {
  return (
    <Link to={`/${url}`} className="menu-item flex ai-c">
      {icon && <i className={`fs-big ${icon}`}></i>}
      <span className="fs-big">{text}</span>
    </Link>
  );
};

MenuItem.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default MenuItem;
