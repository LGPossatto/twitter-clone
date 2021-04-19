import { CREATE_ACCOUNT, LOG_IN_WITH_EMAIL, CREATE_USER_DB } from "../types";

const userReducer = (state, action) => {
  switch (action.type) {
    case LOG_IN_WITH_EMAIL:
      return { ...state, user: action.payload };
    case CREATE_ACCOUNT:
      return { ...state, user: action.payload };
    case CREATE_USER_DB:
      return {
        ...state,
        user: {
          name: action.payload.name,
          email: action.payload.email,
          bio: action.payload.bio,
          birthday: action.payload.birthday,
          location: action.payload.location,
        },
      };
    default:
      return state;
  }
};

export default userReducer;
