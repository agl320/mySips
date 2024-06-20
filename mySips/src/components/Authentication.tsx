import {
    Auth,
    GoogleAuthProvider,
    getRedirectResult,
    onAuthStateChanged,
    signInWithPopup,
} from "firebase/auth";
import { IDrink } from "./DrinkApp/IDrink";

interface IAuthenticationProps {
    userId: string;
    setDrinksState: React.Dispatch<React.SetStateAction<IDrink[]>>;
    firebaseProvider: GoogleAuthProvider;
    firebaseAuth: Auth;
    setUserId: React.Dispatch<React.SetStateAction<string>>;
}

function Authentication({
    userId,
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
            setUserId(uid);
        } else {
            console.log("No one logged in.");
            setUserId("");
        }
    });

    const onClickSignIn = async () => {
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
            {!userId ? (
                <button onClick={onClickSignIn}>Sign in</button>
            ) : (
                <button onClick={onClickSignOut}>Sign out</button>
            )}
        </div>
    );
}

export default Authentication;
