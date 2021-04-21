import { getMonthName } from "../../utils/utils";
import {
  GET_USER_PROFILE_INFO,
  GET_USER_FOLLOWERS,
  GET_USER_FOLLOWING,
} from "../types";

const userReducer = (state, action) => {
  switch (action.type) {
    case GET_USER_PROFILE_INFO:
      const localDate = new Date(action.payload.accountBd);
      const newAccountBd = `${getMonthName(localDate.getMonth())}
      ${" "}${localDate.getFullYear()}`;

      return {
        ...state,
        user: {
          userUID: action.payload.userUID,
          name: action.payload.name,
          email: action.payload.email,
          bio: action.payload.bio,
          birthday: action.payload.birthday,
          location: action.payload.location,
          accountBd: newAccountBd,
        },
      };
    case GET_USER_FOLLOWERS:
      return { ...state, followers: action.payload };
    case GET_USER_FOLLOWING:
      return { ...state, following: action.payload };
    default:
      return state;
  }
};

export default userReducer;
