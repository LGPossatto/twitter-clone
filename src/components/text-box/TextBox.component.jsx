import { useState } from "react";
import PropTypes from "prop-types";

import { toUTC } from "../../utils/utils";

import "./textBox.style.scss";
import profileImg from "../../assets/images/twiter-profile.jpg";
import Btn from "../btn/Btn.component";

const TextBox = ({ placeholder, btnText, img, postMsg }) => {
  const [message, setMessage] = useState("");

  const onClick = () => {
    postMsg({ message: message, date: toUTC(new Date()) });
    setMessage("");
  };

  return (
    <div className="text-box flex">
      {img && (
        <div className="img-box">
          <img src={profileImg} alt="profile" />
        </div>
      )}
      <div className="tweet-box">
        <textarea
          className="fs-med"
          name="tweet"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder}
        ></textarea>
        <Btn med block text={btnText} onClick={onClick}></Btn>
      </div>
    </div>
  );
};

TextBox.propTypes = {
  placeholder: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
  postMsg: PropTypes.func.isRequired,
  img: PropTypes.bool.isRequired,
};

export default TextBox;
