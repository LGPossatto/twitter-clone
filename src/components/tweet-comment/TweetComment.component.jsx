import { useContext } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import { getMonthAndDay } from "../../utils/utils";
import UserContext from "../../context/user/userContext";

import "./tweetComment.style.scss";
import tweetImg from "../../assets/images/twiter-profile.jpg";
import TweetBtn from "../tweet-btn/TweetBtn.component";
import MoreBtn from "../more-btn/MoreBtn.component";

const TweetComment = ({ comment }) => {
  const { user, deleteComment, likeComment, removeLikeComment } =
    useContext(UserContext);
  const { userName, userEmail, message, date, likes, userUID, commentID } =
    comment;
  const urlParams = useParams();

  const removeComment = () => {
    deleteComment(
      urlParams.userUID,
      urlParams.tweetID.split("-")[1],
      commentID
    );
  };

  const postLike = () => {
    likeComment(urlParams.userUID, urlParams.tweetID.split("-")[1], commentID);
  };

  const removeLike = () => {
    removeLikeComment(
      urlParams.userUID,
      urlParams.tweetID.split("-")[1],
      commentID
    );
  };

  return (
    <div className="tweet-comment flex">
      <div className="img-box">
        <img src={tweetImg} alt="profile" />
      </div>
      <div className="tweet-comment__info">
        <div className="tweet-comment-top flex jc-sb">
          <h2 className="fs-med">
            {userName}{" "}
            <span className="fc-secondary">
              {userEmail} - {getMonthAndDay(date)}
            </span>
          </h2>
          {userUID === user.userUID && (
            <MoreBtn onClick={removeComment}></MoreBtn>
          )}
        </div>
        <p className="fs-med msg">{message}</p>
        <div className="tweet-comment-btns flex ai-c">
          <TweetBtn
            usersList={likes}
            userUID={userUID}
            toPost={postLike}
            toRemove={removeLike}
            type="likes"
            icon="fas fa-heart"
          ></TweetBtn>
        </div>
      </div>
    </div>
  );
};

TweetComment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default TweetComment;
