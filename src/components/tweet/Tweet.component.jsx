import "./tweet.style.scss";
import tweetImg from "../../assets/images/placeholder.png";
import TweetBtn from "../tweet-btn/TweetBtn.component";

const Tweet = () => {
  return (
    <div className="tweet flex">
      <div className="img-box">
        <img src={tweetImg} alt="profile" />
      </div>
      <div className="tweet__info">
        <div className="tweet-top flex jc-sb">
          <h2 className="fs-med">
            Name <span className="fc-secondary">@login - Apr 8</span>
          </h2>
          <i className="fas fa-ellipsis-h fs-med fc-secondary"></i>
        </div>
        <p className="fs-med msg">
          Vitae veritatis consequatur iure ipsa amet maxime aliquam dolorum.
          Velit?
        </p>
        <div className="tweet-btns flex jc-se ai-c">
          <TweetBtn url="#!" type="reply" icon="fas fa-comment-dots"></TweetBtn>
          <TweetBtn url="#!" type="retweets" icon="fas fa-retweet"></TweetBtn>
          <TweetBtn url="#!" type="likes" icon="fas fa-heart"></TweetBtn>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
