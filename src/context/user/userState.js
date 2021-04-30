import { useReducer } from "react";
import UserContext from "./userContext";
import userReducer from "./userReducer";
import firebase from "firebase";

import { toUTC } from "../../utils/utils";
import {
  SAVE_SESSION,
  GET_USER_PROFILE_INFO,
  GET_USER_FOLLOWERS,
  GET_USER_FOLLOWING,
  GET_USER_TWEETS,
  GET_COMMENTS,
  POST_USER_TWEETS,
  POST_COMMENT,
  POST_LIKE_TWEET,
  POST_LIKE_COMMENT,
  DELETE_TWEET,
  DELETE_COMMENT,
  REMOVE_LIKE_TWEET,
  REMOVE_LIKE_COMMENT,
} from "../types";

const UserState = (props) => {
  const sessionState = JSON.parse(window.sessionStorage.getItem("loggin"));
  let initialState = {
    user: null,
    following: null,
    followers: null,
    tweets: null,
    comments: null,
  };

  try {
    if (sessionState.user && sessionState.following && sessionState.followers) {
      initialState = sessionState;
    }
  } catch (err) {
    console.log("No session state");
  }

  const db = firebase.firestore();
  const [state, dispatch] = useReducer(userReducer, initialState);

  //-----------------------------------------------------------------//
  //----------------------(LOG-CREATE-GET)-USER----------------------//
  //-----------------------------------------------------------------//

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

        if (docData.number >= 0) {
          tweetsObj["number"] = docData;
        } else {
          tweetsObj[`${docData.tweetID}`] = docData;
        }

        return null;
      });

      dispatch({ type: GET_USER_TWEETS, payload: tweetsObj });
      dispatch({ type: SAVE_SESSION });
    } catch (err) {
      console.error(err);
    }
  };

  // get tweet comments
  const getTweetComments = async (tweetUserUID, tweetID) => {
    try {
      const commentsDoc = await db
        .collection("users")
        .doc(tweetUserUID)
        .collection("tweets")
        .doc(tweetID)
        .collection("comments")
        .get();

      let commentsObj = {};

      commentsDoc.docs.map((doc) => {
        const docData = doc.data();

        if (docData.number >= 0) {
          commentsObj["number"] = docData;
        } else {
          commentsObj[`${docData.commentID}`] = docData;
        }

        return null;
      });

      dispatch({ type: GET_COMMENTS, payload: commentsObj });
    } catch (err) {
      console.error(err);
    }
  };

  //-----------------------------------------------------------------//
  //------------------------(POST-LIKE)-TWEET------------------------//
  //-----------------------------------------------------------------//

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
      comments: [],
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
      await db
        .collection("users")
        .doc(userUID)
        .collection("tweets")
        .doc(`${tweetsNumber}`)
        .collection("comments")
        .doc("number")
        .set({ number: 0 });

      dispatch({ type: POST_USER_TWEETS, payload: { newTweet, tweetsNumber } });
    } catch (err) {
      console.error(err);
    }
  };

  // delete tweet
  const deleteTweet = async (tweetID) => {
    const tweetRef = db
      .collection("users")
      .doc(state.user.userUID)
      .collection("tweets")
      .doc(`${tweetID}`);
    const commentsRed = tweetRef.collection("comments");

    try {
      commentsRed.onSnapshot((snapshot) => {
        snapshot.docs.forEach(async (doc) => {
          await commentsRed.doc(doc.id).delete();
        });
      });

      await tweetRef.delete();

      dispatch({ type: DELETE_TWEET, payload: { tweetID } });
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

  //-----------------------------------------------------------------//
  //-----------------------(POST-LIKE)-COMMENT-----------------------//
  //-----------------------------------------------------------------//

  // post new comment
  const commentTweet = async (comment) => {
    const tweetUserUID = comment.userUID;
    const tweetNumber = comment.tweetID;
    const commentNumber = state.comments["number"].number + 1;
    const commentsListID = `${state.user.userUID}-${commentNumber}`;
    const newComment = {
      message: comment.message,
      date: comment.date,
      userUID: state.user.userUID,
      userName: state.user.name,
      userEmail: state.user.email,
      commentID: commentNumber,
      likes: [],
    };

    const tweetRef = db
      .collection("users")
      .doc(tweetUserUID)
      .collection("tweets")
      .doc(`${tweetNumber}`);

    try {
      await tweetRef
        .collection("comments")
        .doc(`${commentNumber}`)
        .set(newComment);
      await tweetRef
        .collection("comments")
        .doc("number")
        .set({ number: commentNumber });
      await tweetRef.update({
        comments: firebase.firestore.FieldValue.arrayUnion(commentsListID),
      });

      dispatch({
        type: POST_COMMENT,
        payload: { newComment, commentNumber, tweetNumber, commentsListID },
      });
    } catch (err) {
      console.error(err);
    }
  };

  // delete comment
  const deleteComment = async (tweetUserUID, tweetID, commentNumber) => {
    const tweetRef = db
      .collection("users")
      .doc(tweetUserUID)
      .collection("tweets")
      .doc(`${tweetID}`);

    try {
      await tweetRef.collection("comments").doc(`${commentNumber}`).delete();
      await tweetRef.update({
        comments: firebase.firestore.FieldValue.arrayRemove(
          `${state.user.userUID}-${commentNumber}`
        ),
      });

      dispatch({
        type: DELETE_COMMENT,
        payload: { tweetUserUID, tweetID, commentNumber },
      });
    } catch (err) {
      console.error(err);
    }
  };

  // like comment
  const likeComment = async (tweetUID, tweetID, commentID) => {
    const commentRef = db
      .collection("users")
      .doc(`${tweetUID}`)
      .collection("tweets")
      .doc(`${tweetID}`)
      .collection("comments")
      .doc(`${commentID}`);
    try {
      commentRef.update({
        likes: firebase.firestore.FieldValue.arrayUnion(state.user.userUID),
      });

      dispatch({
        type: POST_LIKE_COMMENT,
        payload: { commentID, userUID: state.user.userUID },
      });
    } catch (err) {
      console.error(err);
    }
  };

  // remove like from comment
  const removeLikeComment = async (tweetUID, tweetID, commentID) => {
    const commentRef = db
      .collection("users")
      .doc(`${tweetUID}`)
      .collection("tweets")
      .doc(`${tweetID}`)
      .collection("comments")
      .doc(`${commentID}`);
    try {
      commentRef.update({
        likes: firebase.firestore.FieldValue.arrayRemove(state.user.userUID),
      });

      dispatch({
        type: REMOVE_LIKE_COMMENT,
        payload: { commentID, userUID: state.user.userUID },
      });
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
        comments: state.comments,
        loginWithEmail,
        createAccount,
        getUserTweets,
        getTweetComments,
        postTweet,
        commentTweet,
        likeTweet,
        likeComment,
        deleteTweet,
        deleteComment,
        removeLikeTweet,
        removeLikeComment,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
