import {
  SAVE_SESSION,
  GET_USER_PROFILE_INFO,
  GET_USER_FOLLOWERS,
  GET_USER_FOLLOWING,
  GET_USER_TWEETS,
  GET_COMMENTS,
  POST_USER_TWEETS,
  POST_COMMENT,
  POST_LIKE_TWEET,
  DELETE_TWEET,
  DELETE_COMMENT,
  REMOVE_LIKE_TWEET,
} from "../types";

import { saveSession } from "../../utils/utils";

const userReducer = (state, action) => {
  switch (action.type) {
    case SAVE_SESSION:
      saveSession(state);
      return state;
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
    default:
      return state;
  }
};

export default userReducer;
