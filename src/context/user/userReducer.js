import {
  SAVE_SESSION,
  USER_LOGOUT,
  GET_USER_PROFILE_INFO,
  GET_USER_FOLLOWERS,
  GET_USER_FOLLOWING,
  GET_USER_TWEETS,
  GET_COMMENTS,
  POST_USER_TWEETS,
  POST_COMMENT,
  POST_LIKE_TWEET,
  POST_LIKE_COMMENT,
  DELETE_TWEET,
  DELETE_COMMENT,
  REMOVE_LIKE_TWEET,
  REMOVE_LIKE_COMMENT,
  FOLLOW_USER,
  UNFOLLOW_USER,
} from "../types";

import { saveSession, removeSession } from "../../utils/utils";

const userReducer = (state, action) => {
  switch (action.type) {
    case SAVE_SESSION:
      saveSession(state);
      return state;
    case USER_LOGOUT:
      removeSession();
      return {
        user: null,
        following: null,
        followers: null,
        tweets: null,
        comments: null,
      };
    case GET_USER_PROFILE_INFO:
      return {
        ...state,
        user: {
          userUID: action.payload.userUID,
          name: action.payload.name,
          email: action.payload.email,
          bio: action.payload.bio,
          birthday: action.payload.birthday,
          location: action.payload.location,
          accountBd: action.payload.accountBd,
        },
      };
    case GET_USER_FOLLOWERS:
      return { ...state, followers: action.payload };
    case GET_USER_FOLLOWING:
      return { ...state, following: action.payload };
    case GET_USER_TWEETS:
      return { ...state, tweets: action.payload };
    case GET_COMMENTS:
      return { ...state, comments: action.payload };
    case POST_USER_TWEETS:
      return {
        ...state,
        tweets: {
          ...state.tweets,
          ["number"]: { number: action.payload.tweetsNumber },
          [`${action.payload.tweetsNumber}`]: action.payload.newTweet,
        },
      };
    case POST_COMMENT:
      return {
        ...state,
        tweets: {
          ...state.tweets,
          [`${action.payload.tweetNumber}`]: {
            ...state.tweets[`${action.payload.tweetNumber}`],
            comments: [
              ...state.tweets[`${action.payload.tweetNumber}`].comments,
              action.payload.commentsListID,
            ],
          },
        },
        comments: {
          ...state.comments,
          ["number"]: { number: action.payload.commentNumber },
          [`${action.payload.commentNumber}`]: action.payload.newComment,
        },
      };
    case POST_LIKE_TWEET:
      return {
        ...state,
        tweets: {
          ...state.tweets,
          [action.payload.tweetID]: {
            ...state.tweets[action.payload.tweetID],
            likes: [
              ...state.tweets[action.payload.tweetID].likes,
              action.payload.userUID,
            ],
          },
        },
      };
    case POST_LIKE_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload.commentID]: {
            ...state.comments[action.payload.commentID],
            likes: [
              ...state.comments[action.payload.commentID].likes,
              action.payload.userUID,
            ],
          },
        },
      };
    case DELETE_TWEET:
      const stateTweets = state.tweets;
      let newTweets = {};
      Object.keys(stateTweets)
        .reverse()
        .map((tweetKey) => {
          if (stateTweets[tweetKey].tweetID !== action.payload.tweetID) {
            newTweets[tweetKey] = stateTweets[tweetKey];
          }
          return null;
        });
      return {
        ...state,
        tweets: {
          ...newTweets,
        },
      };
    case DELETE_COMMENT:
      // remove user uid in tweet comments list
      const newCommentsUID = state.tweets[
        action.payload.tweetID
      ].comments.filter(
        (comment) =>
          comment !==
          `${action.payload.tweetUserUID}-${action.payload.commentNumber}`
      );
      // remove comment in comments collection
      const stateComments = state.comments;
      let newComments = {};
      Object.keys(stateComments)
        .reverse()
        .map((commentKey) => {
          if (
            stateComments[commentKey].commentID !== action.payload.commentNumber
          ) {
            newComments[commentKey] = stateComments[commentKey];
          }
          return null;
        });
      return {
        ...state,
        tweets: {
          ...state.tweets,
          [action.payload.tweetID]: {
            ...state.tweets[action.payload.tweetID],
            comments: [...newCommentsUID],
          },
        },
        comments: {
          ...newComments,
        },
      };
    case REMOVE_LIKE_TWEET:
      const newLikes = state.tweets[action.payload.tweetID].likes.filter(
        (like) => like !== action.payload.userUID
      );
      return {
        ...state,
        tweets: {
          ...state.tweets,
          [action.payload.tweetID]: {
            ...state.tweets[action.payload.tweetID],
            likes: [...newLikes],
          },
        },
      };
    case REMOVE_LIKE_COMMENT:
      const newCommentLikes = state.comments[
        action.payload.commentID
      ].likes.filter((like) => like !== action.payload.userUID);
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload.commentID]: {
            ...state.comments[action.payload.commentID],
            likes: [...newCommentLikes],
          },
        },
      };
    case FOLLOW_USER:
      return {
        ...state,
        following: {
          ...state.following,
          followingList: [...state.following.followingList, action.payload],
        },
      };
    case UNFOLLOW_USER:
      const newFollowingList = state.following.followingList.filter(
        (item) => item !== action.payload
      );

      return {
        ...state,
        following: {
          ...state.following,
          followingList: [...newFollowingList],
        },
      };
    default:
      return state;
  }
};

export default userReducer;
