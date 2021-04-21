import { useReducer } from "react";
import UserContext from "./userContext";
import userReducer from "./userReducer";
import firebase from "firebase";

import { toUTC } from "../../utils/utils";
import {
  GET_USER_PROFILE_INFO,
  GET_USER_FOLLOWERS,
  GET_USER_FOLLOWING,
} from "../types";

const UserState = (props) => {
  const initialState = {
    user: null,
    following: null,
    followers: null,
  };

  const db = firebase.firestore();
  const [state, dispatch] = useReducer(userReducer, initialState);

  // log in user
  const loginWithEmail = async (email, password) => {
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      getUserInfo(userCredential.user.uid);
    } catch (err) {
      console.error(err);
    }
  };

  // post new tweet
  const postTweet = async (tweet) => {
    const tweetDoc = db
      .collection("users")
      .doc(state.user.userUID)
      .collection("tweets")
      .doc();

    const newTweet = {
      ...tweet,
      userUID: state.user.userUID,
      userName: state.user.name,
      userEmail: state.user.email,
      tweetID: tweetDoc.id,
    };

    await tweetDoc.set(newTweet);
  };

  // get user info
  const getUserInfo = async (userUID) => {
    try {
      const profileDoc = await db.collection("users").doc(userUID).get();
      const followerDoc = await db
        .collection("users")
        .doc(userUID)
        .collection("user-follow")
        .doc("followers")
        .get();
      const followingDoc = await db
        .collection("users")
        .doc(userUID)
        .collection("user-follow")
        .doc("following")
        .get();

      console.log(profileDoc.data(), followerDoc.data(), followingDoc.data());

      if (profileDoc.exists && followerDoc.exists && followingDoc.exists) {
        dispatch({ type: GET_USER_PROFILE_INFO, payload: profileDoc.data() });
        dispatch({ type: GET_USER_FOLLOWERS, payload: followerDoc.data() });
        dispatch({ type: GET_USER_FOLLOWING, payload: followingDoc.data() });
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
  const createUserDb = async (userUID, email, profileInfo) => {
    const profileObj = {
      userUID: userUID,
      name: profileInfo[0][0],
      email: email,
      bio: profileInfo[1][0],
      birthday: profileInfo[2][0],
      location: profileInfo[3][0],
      accountBd: toUTC(new Date()),
    };

    db.collection("users").doc(userUID).set(profileObj);
    db.collection("users")
      .doc(userUID)
      .collection("user-follow")
      .doc("followers")
      .set({ number: 0 });
    db.collection("users")
      .doc(userUID)
      .collection("user-follow")
      .doc("following")
      .set({ number: 0 });
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        followers: state.followers,
        following: state.following,
        createAccount,
        loginWithEmail,
        postTweet,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
