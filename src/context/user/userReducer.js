import {
  GET_USER_PROFILE_INFO,
  GET_USER_FOLLOWERS,
  GET_USER_FOLLOWING,
  GET_USER_TWEETS,
  POST_USER_TWEETS,
} from "../types";

const userReducer = (state, action) => {
  switch (action.type) {
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
    case POST_USER_TWEETS:
      return {
        ...state,
        tweets: {
          ...state.tweets,
          ["number"]: { number: action.payload.tweetsNumber },
          [`${action.payload.tweetsNumber}`]: action.payload.newTweet,
        },
      };
    default:
      return state;
  }
};

export default userReducer;
