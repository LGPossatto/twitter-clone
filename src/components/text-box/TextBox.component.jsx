import React from "react";
import PropTypes from "prop-types";

import "./textBox.style.scss";
import profileImg from "../../assets/images/placeholder.png";
import Btn from "../btn/Btn.component";

const TextBox = (props) => {
  return (
    <div className="text-box flex">
      <div className="img-box">
        <img src={profileImg} alt="profile" />
      </div>
      <div className="tweet-box">
        <textarea
          className="fs-med"
          name="tweet"
          placeholder="What is happening..."
        ></textarea>
        <Btn med block url="#!" text="Tweet"></Btn>
      </div>
    </div>
  );
};

TextBox.propTypes = {};

export default TextBox;
