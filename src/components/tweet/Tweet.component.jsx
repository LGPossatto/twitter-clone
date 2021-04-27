import { useContext } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import { getMonthAndDay } from "../../utils/utils";
import UserContext from "../../context/user/userContext";

import "./tweet.style.scss";
import tweetImg from "../../assets/images/twiter-profile.jpg";
import TweetBtn from "../tweet-btn/TweetBtn.component";

const Tweet = ({ tweet }) => {
  const { likeTweet, removeLikeTweet } = useContext(UserContext);
  const { userName, userEmail, message, date, likes, tweetID, userUID } = tweet;
  const urlParams = useParams();

  const postLike = () => {
    likeTweet(tweetID, userUID);
  };

  const removeLike = () => {
    removeLikeTweet(tweetID, userUID);
  };

  const postComment = () => {
    console.log("to comment");
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
          {!urlParams.tweetID && (
            <i className="fas fa-ellipsis-h fs-med fc-secondary"></i>
          )}
        </div>
        <p className="fs-med msg">{message}</p>
        <div className="tweet-btns flex ai-c">
          {!urlParams.tweetID && (
            <>
              <TweetBtn
                usersList={[1, 2, 3, 4, 5]}
                userUID={userUID}
                toPost={postComment}
                toRemove={postComment}
                url={`/user/${userUID}/tweet/${tweetID}`}
                type="reply"
                icon="fas fa-comment-dots"
              ></TweetBtn>
              <TweetBtn
                usersList={likes}
                userUID={userUID}
                toPost={postLike}
                toRemove={removeLike}
                url="#!"
                type="likes"
                icon="fas fa-heart"
              ></TweetBtn>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

Tweet.propTypes = {
  tweet: PropTypes.object.isRequired,
};

export default Tweet;
