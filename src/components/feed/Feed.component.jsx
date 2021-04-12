import React from "react";

import "./feed.style.scss";
import FeedHead from "../feed-head/FeedHead.component";
import FeedMenuItem from "../feed-menu-item/FeedMenuItem.component";
import Tweet from "../tweet/Tweet.component";

const Feed = () => {
  return (
    <div className="feed">
      <FeedHead></FeedHead>
      <div className="feed__menu flex jc-sb">
        <FeedMenuItem url="#!" text="Tweets" active></FeedMenuItem>
        <FeedMenuItem url="#!" text="Replies"></FeedMenuItem>
        <FeedMenuItem url="#!" text="Likes"></FeedMenuItem>
      </div>
      <Tweet></Tweet>
    </div>
  );
};

export default Feed;
