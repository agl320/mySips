import {
  GoogleAuthProvider,
  getAuth,
  getRedirectResult,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { useState } from "react";
import { IDrink } from "./DrinkApp/IDrink";

interface IAuthenticationProps {
  userLoggedIn: boolean;
  setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setDrinksState: React.Dispatch<React.SetStateAction<IDrink[]>>;
}

function Authentication({
  userLoggedIn,
  setUserLoggedIn,
  setDrinksState,
}: IAuthenticationProps) {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  // Observer for auth; will update upon authentication state change
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      console.log(`${uid} is logged in.`);
      setUserLoggedIn(true);
    } else {
      console.log("No one logged in.");
      setUserLoggedIn(false);
      setDrinksState([]);
    }
  });

  const onClickSignIn = async () => {
    try {
      signInWithPopup(auth, provider);
      const result = await getRedirectResult(auth);
      //   const credential = GoogleAuthProvider.credentialFromResult(result);
      //   const token = credential.accessToken;
      if (result) {
        const user = result.user;
        console.log({ user });
      } else {
        console.log("No result from redirect.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onClickSignOut = () => {
    console.log("User signed out.");
    auth.signOut();
  };

  return (
    <div>
      {!userLoggedIn ? (
        <button onClick={onClickSignIn}>Sign in</button>
      ) : (
        <button onClick={onClickSignOut}>Sign out</button>
      )}
    </div>
  );
}

export default Authentication;
