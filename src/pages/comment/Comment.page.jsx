import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import UserContext from "../../context/user/userContext";

import "./comment.style.scss";
import ExtraPageLayout from "../../components/extra-page-layout/ExtraPageLayout.component";
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
    <ExtraPageLayout pageTitle="Comments">
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
    </ExtraPageLayout>
  );
};

export default Comment;
