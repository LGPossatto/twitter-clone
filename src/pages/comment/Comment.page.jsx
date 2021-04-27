import { useContext } from "react";
import { useParams, Link } from "react-router-dom";

import UserContext from "../../context/user/userContext";

import "./comment.style.scss";
import Tweet from "../../components/tweet/Tweet.component";
import TextBox from "../../components/text-box/TextBox.component";

const Comment = () => {
  const { tweets } = useContext(UserContext);
  const { tweetID } = useParams();

  return (
    <div className="comment flex">
      <div className="comment__content">
        <h2 className="title fs-big flex jc-sb ai-c">
          Comments{" "}
          <Link to="/">
            <i class="fas fa-times fs-big close-comment"></i>
          </Link>
        </h2>
        <Tweet tweet={tweets[tweetID]}></Tweet>
        <TextBox
          placeholder={"Leave a comment..."}
          btnText={"Comment"}
          postMsg={() => console.log("ok")}
        ></TextBox>
      </div>
    </div>
  );
};

export default Comment;
