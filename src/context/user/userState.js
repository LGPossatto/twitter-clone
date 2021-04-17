import { useReducer } from "react";
import UserContext from "./userContext";
import userReducer from "./userReducer";
import firebase from "firebase";

import { CREATE_ACCOUNT, LOG_IN_WITH_EMAIL } from "../types";

const UserState = (props) => {
  const initialState = {
    user: true,
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  // create user account
  const createAccount = async (email, password) => {
    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      dispatch({ type: CREATE_ACCOUNT, payload: userCredential.user });
    } catch (error) {
      console.error(error);
    }
  };

  // log in user
  const loginWithEmail = async (email, password) => {
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      dispatch({ type: LOG_IN_WITH_EMAIL, payload: userCredential.user });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider
      value={{ user: state.user, createAccount, loginWithEmail }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
