import { useReducer } from "react";
import UserContext from "./userContext";
import userReducer from "./userReducer";
import firebase from "firebase";

import { toUTC } from "../../utils/utils";
import {
  GET_USER_PROFILE_INFO,
  GET_USER_FOLLOWERS,
  GET_USER_FOLLOWING,
  GET_USER_TWEETS,
  POST_USER_TWEETS,
  POST_LIKE_TWEET,
  REMOVE_LIKE_TWEET,
} from "../types";

const UserState = (props) => {
  const initialState = {
    user: null,
    following: null,
    followers: null,
    tweets: null,
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
    const userUID = state.user.userUID;
    const tweetsNumber = state.tweets["number"].number + 1;
    const newTweet = {
      ...tweet,
      userUID: userUID,
      userName: state.user.name,
      userEmail: state.user.email,
      tweetID: tweetsNumber,
      likes: [],
    };

    try {
      await db
        .collection("users")
        .doc(userUID)
        .collection("tweets")
        .doc(`${tweetsNumber}`)
        .set(newTweet);
      await db
        .collection("users")
        .doc(userUID)
        .collection("tweets")
        .doc("number")
        .set({ number: tweetsNumber });

      dispatch({ type: POST_USER_TWEETS, payload: { newTweet, tweetsNumber } });
    } catch (err) {
      console.error(err);
    }
  };

  // like tweet
  const likeTweet = async (tweetID, tweetUID) => {
    const tweetRef = db
      .collection("users")
      .doc(`${tweetUID}`)
      .collection("tweets")
      .doc(`${tweetID}`);
    try {
      tweetRef.update({
        likes: firebase.firestore.FieldValue.arrayUnion(state.user.userUID),
      });

      dispatch({
        type: POST_LIKE_TWEET,
        payload: { tweetID, userUID: state.user.userUID },
      });
    } catch (err) {
      console.error(err);
    }
  };

  // remove like from tweet
  const removeLikeTweet = async (tweetID, tweetUID) => {
    const tweetRef = db
      .collection("users")
      .doc(`${tweetUID}`)
      .collection("tweets")
      .doc(`${tweetID}`);
    try {
      tweetRef.update({
        likes: firebase.firestore.FieldValue.arrayRemove(state.user.userUID),
      });

      dispatch({
        type: REMOVE_LIKE_TWEET,
        payload: { tweetID, userUID: state.user.userUID },
      });
    } catch (err) {
      console.error(err);
    }
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

  // get user tweets
  const getUserTweets = async (userUID) => {
    try {
      const tweetsDoc = await db
        .collection("users")
        .doc(userUID)
        .collection("tweets")
        .get();

      let tweetsObj = {};

      tweetsDoc.docs.map((doc) => {
        const docData = doc.data();

        if (docData.number) {
          tweetsObj["number"] = docData;
        } else {
          tweetsObj[`${docData.tweetID}`] = docData;
        }

        return null;
      });

      dispatch({ type: GET_USER_TWEETS, payload: tweetsObj });
    } catch (err) {
      console.error(err);
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

    try {
      await db.collection("users").doc(userUID).set(profileObj);
      await db
        .collection("users")
        .doc(userUID)
        .collection("user-follow")
        .doc("followers")
        .set({ number: 0 });
      await db
        .collection("users")
        .doc(userUID)
        .collection("user-follow")
        .doc("following")
        .set({ number: 0 });
      await db
        .collection("users")
        .doc(userUID)
        .collection("tweets")
        .doc("number")
        .set({ number: 0 });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        followers: state.followers,
        following: state.following,
        tweets: state.tweets,
        createAccount,
        loginWithEmail,
        postTweet,
        likeTweet,
        getUserTweets,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
