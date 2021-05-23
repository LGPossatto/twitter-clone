import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./extraPageLayout.style.scss";

const ExtraPageLayout = ({ children, pageTitle }) => {
  return (
    <div className="extra-page-layout flex">
      <div className="extra-page-layout__content">
        <h2 className="title fs-big flex jc-sb ai-c">
          {pageTitle}{" "}
          <Link to="/">
            <i className="fas fa-times fs-big close-page"></i>
          </Link>
        </h2>
        {children}
      </div>
    </div>
  );
};

ExtraPageLayout.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};

export default ExtraPageLayout;
