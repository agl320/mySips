import {
    Auth,
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
    // setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    setDrinksState: React.Dispatch<React.SetStateAction<IDrink[]>>;
    firebaseProvider: GoogleAuthProvider;
    firebaseAuth: Auth;
    setUserId: React.Dispatch<React.SetStateAction<string>>;
}

function Authentication({
    userLoggedIn,
    // setUserLoggedIn,
    setUserId,
    firebaseProvider,
    firebaseAuth,
}: IAuthenticationProps) {
    // Observer for auth; will update upon authentication state change
    onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            console.log(`${uid} is logged in.`);
            // setUserLoggedIn(true);
            setUserId(uid);
        } else {
            console.log("No one logged in.");
            // setUserLoggedIn(false);
            setUserId("");
        }
    });

    const onClickSignIn = async () => {
        // if (!userLoggedIn) return;

        try {
            signInWithPopup(firebaseAuth, firebaseProvider);
            const result = await getRedirectResult(firebaseAuth);
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
        firebaseAuth.signOut();
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
