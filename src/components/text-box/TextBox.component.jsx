import { useState, useContext } from "react";
import UserContext from "../../context/user/userContext";

import "./textBox.style.scss";
import profileImg from "../../assets/images/placeholder.png";
import Btn from "../btn/Btn.component";

const TextBox = () => {
  const [message, setMessage] = useState("");
  const { postTweet } = useContext(UserContext);

  return (
    <div className="text-box flex">
      <div className="img-box">
        <img src={profileImg} alt="profile" />
      </div>
      <div className="tweet-box">
        <textarea
          className="fs-med"
          name="tweet"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What is happening..."
        ></textarea>
        <Btn
          med
          block
          url="#!"
          text="Tweet"
          onClick={postTweet}
          message={message}
        ></Btn>
      </div>
    </div>
  );
};

export default TextBox;
