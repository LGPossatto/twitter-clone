import {
  GET_USER_INFO,
  GET_USER_FOLLOWERS,
  GET_USER_FOLLOWING,
} from "../types";

const userReducer = (state, action) => {
  switch (action.type) {
    case GET_USER_INFO:
      return {
        ...state,
        user: {
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
      return { ...state, followers: action.payload };
    default:
      return state;
  }
};

export default userReducer;
