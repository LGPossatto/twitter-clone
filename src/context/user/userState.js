import { useReducer } from "react";
import UserContext from "./userContext";
import userReducer from "./userReducer";
import firebase from "firebase";

import {
  GET_USER_INFO,
  GET_USER_FOLLOWERS,
  GET_USER_FOLLOWING,
} from "../types";

const UserState = (props) => {
  const initialState = {
    user: null,
    following: 0,
    follower: 0,
  };

  const db = firebase.firestore();
  const [state, dispatch] = useReducer(userReducer, initialState);

  // log in user
  const loginWithEmail = async (email, password) => {
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      getUserInfo(
        db.collection("users").doc(userCredential.user.uid),
        GET_USER_INFO
      );
      getUserInfo(
        db
          .collection("users")
          .doc(userCredential.user.uid)
          .collection("user-follow")
          .doc("followers"),
        GET_USER_FOLLOWERS
      );
      getUserInfo(
        db
          .collection("users")
          .doc(userCredential.user.uid)
          .collection("user-follow")
          .doc("following"),
        GET_USER_FOLLOWING
      );
    } catch (err) {
      console.error(err);
    }
  };

  // get user info
  const getUserInfo = async (docRef, type) => {
    try {
      const doc = await docRef.get();

      if (doc.exists) {
        console.log(doc.data());
        dispatch({ type: type, payload: doc.data() });
      } else {
        console.log("No such document!");
      }
    } catch (err) {
      console.log("Error getting document:", err);
    }
  };

  // create user account
  const createAccount = async (email, password, profileInfo) => {
    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      await createUserDb(userCredential.user.uid, email, profileInfo);
      getUserInfo(userCredential.user.uid);
    } catch (err) {
      console.error(err);
    }
  };

  // create new user database
  const createUserDb = async (userUid, email, profileInfo) => {
    const toUTC = (date) => {
      return Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds()
      );
    };

    const profileObj = {
      name: profileInfo[0][0],
      email: email,
      bio: profileInfo[1][0],
      birthday: profileInfo[2][0],
      location: profileInfo[3][0],
      accountBd: toUTC(new Date()),
    };

    db.collection("users").doc(userUid).set(profileObj);
    db.collection("users")
      .doc(userUid)
      .collection("user-follow")
      .doc("followers")
      .set({});
    db.collection("users")
      .doc(userUid)
      .collection("user-follow")
      .doc("following")
      .set({});
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
