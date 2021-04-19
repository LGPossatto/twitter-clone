import { useReducer } from "react";
import UserContext from "./userContext";
import userReducer from "./userReducer";
import firebase from "firebase";

import { CREATE_ACCOUNT, LOG_IN_WITH_EMAIL, CREATE_USER_DB } from "../types";

const UserState = (props) => {
  const initialState = {
    user: false,
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

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

  // create user account
  const createAccount = async (email, password, profileInfo) => {
    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      await createUserDb(userCredential.user.uid, email, profileInfo);

      dispatch({ type: CREATE_ACCOUNT, payload: userCredential.user });
    } catch (error) {
      console.error(error);
    }
  };

  // create new user database
  const createUserDb = async (userUid, email, profileInfo) => {
    const db = firebase.firestore();
    const profileObj = {
      name: profileInfo[0][0],
      email: email,
      bio: profileInfo[1][0],
      birthday: profileInfo[2][0],
      location: profileInfo[3][0],
    };

    db.collection("users").doc(userUid).set(profileObj);

    dispatch({ type: CREATE_USER_DB, payload: profileObj });
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
