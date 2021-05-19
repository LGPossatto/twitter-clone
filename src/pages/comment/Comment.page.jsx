import { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import UserContext from "../../context/user/userContext";

import "./comment.style.scss";
import Tweet from "../../components/tweet/Tweet.component";
import TextBox from "../../components/text-box/TextBox.component";
import TweetComment from "../../components/tweet-comment/TweetComment.component";

const Comment = () => {
  const { user, tweets, comments, getTweetComments, commentTweet } =
    useContext(UserContext);
  const { userUID, tweetID } = useParams();

  useEffect(() => {
    getTweetComments(userUID, tweetID.split("-")[1]);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="comment flex">
      <div className="comment__content">
        <h2 className="title fs-big flex jc-sb ai-c">
          Comments{" "}
          <Link to="/">
            <i className="fas fa-times fs-big close-comment"></i>
          </Link>
        </h2>
        {userUID === user.userUID ? (
          <Tweet tweet={tweets[tweetID.split("-")[1]]}></Tweet>
        ) : (
          tweets[tweetID] && <Tweet tweet={tweets[tweetID]}></Tweet>
        )}
        <TextBox
          placeholder={"Leave a comment..."}
          btnText={"Comment"}
          postMsg={commentTweet}
        ></TextBox>
        {comments &&
          Object.keys(comments)
            .reverse()
            .map((comment) => {
              if (comment === "number") {
                return null;
              } else {
                return (
                  <TweetComment
                    key={comments[comment].commentID}
                    comment={comments[comment]}
                  ></TweetComment>
                );
              }
            })}
      </div>
    </div>
  );
};

export default Comment;
