import { CREATE_ACCOUNT, LOG_IN_WITH_EMAIL } from "../types";

const userReducer = (state, action) => {
  switch (action.type) {
    case CREATE_ACCOUNT:
      return { ...state, user: action.payload };
    case LOG_IN_WITH_EMAIL:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default userReducer;
