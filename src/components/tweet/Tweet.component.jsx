import { useContext } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import { getMonthAndDay } from "../../utils/utils";
import UserContext from "../../context/user/userContext";

import "./tweet.style.scss";
import tweetImg from "../../assets/images/twiter-profile.jpg";
import TweetBtn from "../tweet-btn/TweetBtn.component";
import MoreBtn from "../more-btn/MoreBtn.component";

const Tweet = ({ tweet }) => {
  const { user, likeTweet, removeLikeTweet, deleteTweet } = useContext(
    UserContext
  );
  const {
    userName,
    userEmail,
    message,
    date,
    likes,
    tweetID,
    userUID,
    comments,
  } = tweet;
  const urlParams = useParams();

  const removeTweet = () => {
    deleteTweet(tweetID);
  };

  const postLike = () => {
    if (user.userUID === userUID) {
      likeTweet(tweetID, userUID, true);
    } else {
      likeTweet(tweetID, userUID, false);
    }
  };

  const removeLike = () => {
    if (user.userUID === userUID) {
      removeLikeTweet(tweetID, userUID, true);
    } else {
      removeLikeTweet(tweetID, userUID, false);
    }
  };

  const postComment = () => {
    console.log("post comment");
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
          {!urlParams.tweetID && <MoreBtn onClick={removeTweet}></MoreBtn>}
        </div>
        <p className="fs-med msg">{message}</p>
        <div className="tweet-btns flex ai-c">
          {!urlParams.tweetID && (
            <TweetBtn
              usersList={comments}
              userUID={userUID}
              toPost={postComment}
              toRemove={postComment}
              url={`/user/${userUID}/tweet/${tweetID}`}
              type="reply"
              icon="fas fa-comment-dots"
            ></TweetBtn>
          )}
          <TweetBtn
            usersList={likes}
            userUID={userUID}
            toPost={postLike}
            toRemove={removeLike}
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
