import { useContext } from "react";
import PropTypes from "prop-types";

import { getMonthAndDay } from "../../utils/utils";
import UserContext from "../../context/user/userContext";

import "./tweet.style.scss";
import tweetImg from "../../assets/images/placeholder.png";
import TweetBtn from "../tweet-btn/TweetBtn.component";

const Tweet = ({ tweet }) => {
  const { likeTweet } = useContext(UserContext);
  const { userName, userEmail, message, date, likes, tweetID, userUID } = tweet;

  const postLike = () => {
    likeTweet(tweetID, userUID);
  };

  return (
    <div className="tweet flex">
      <div className="img-box">
        <img src={tweetImg} alt="profile" />
      </div>
      <div className="tweet__info">
        <div className="tweet-top flex jc-sb">
          <h2 className="fs-med">
            {userName}{" "}
            <span className="fc-secondary">
              {userEmail} - {getMonthAndDay(date)}
            </span>
          </h2>
          <i className="fas fa-ellipsis-h fs-med fc-secondary"></i>
        </div>
        <p className="fs-med msg">{message}</p>
        <div className="tweet-btns flex jc-se ai-c">
          <TweetBtn
            usersList={[1, 2, 3, 4, 5]}
            postLike={postLike}
            url="#!"
            type="reply"
            icon="fas fa-comment-dots"
          ></TweetBtn>
          <TweetBtn
            usersList={[1, 2, 3]}
            postLike={postLike}
            url="#!"
            type="retweets"
            icon="fas fa-retweet"
          ></TweetBtn>
          <TweetBtn
            usersList={likes}
            postLike={postLike}
            url="#!"
            type="likes"
            icon="fas fa-heart"
          ></TweetBtn>
        </div>
      </div>
    </div>
  );
};

Tweet.propTypes = {
  tweet: PropTypes.object.isRequired,
};

export default Tweet;
