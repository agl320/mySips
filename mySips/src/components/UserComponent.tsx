import {
    Auth,
    GoogleAuthProvider,
    getRedirectResult,
    onAuthStateChanged,
    signInWithPopup,
} from "firebase/auth";
import { useState } from "react";

interface IAuthenticationProps {
    userId: string;
    firebaseProvider: GoogleAuthProvider;
    firebaseAuth: Auth;
    setUserId: React.Dispatch<React.SetStateAction<string>>;
}

function UserComponent({
    userId,
    setUserId,
    firebaseProvider,
    firebaseAuth,
}: IAuthenticationProps) {
    const [displayName, setDisplayName] = useState<string>("");

    onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
            const uid = user.uid;
            if (uid !== userId) {
                setUserId(uid);
                setDisplayName(user.displayName ?? "");
            }
        } else {
            setUserId("");
            setDisplayName("");
        }
    });

    const onClickSignIn = async () => {
        try {
            signInWithPopup(firebaseAuth, firebaseProvider);
            const result = await getRedirectResult(firebaseAuth);
            if (result) {
                const user = result.user;
                console.log({ user });
            } else {
                console.error("No result from redirect.");
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
            <p>Logged in as {displayName}</p>
            {!userId ? (
                <button onClick={onClickSignIn}>Sign in</button>
            ) : (
                <button onClick={onClickSignOut}>Sign out</button>
            )}
        </div>
    );
}

export default UserComponent;
