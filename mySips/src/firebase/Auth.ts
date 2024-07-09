import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    updatePassword,
    UserCredential,
} from "firebase/auth";
import { firebaseAuth } from "./FirebaseSetup";

interface UserRequestReturnType {
    status: boolean;
    user: UserCredential | null;
    message: string;
}

export const doCreateUserWithEmailAndPassword = async (
    email: string,
    password: string
): Promise<UserRequestReturnType> => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password)
        .then((userCredential) => {
            return {
                status: true,
                user: userCredential,
                message: "User logged in.",
            };
        })
        .catch((err) => {
            console.error(err);
            return {
                status: false,
                user: null,
                message: err.code as string,
            };
        });
};

export const doSignInWithEmailAndPassword = (
    email: string,
    password: string
): Promise<UserRequestReturnType> => {
    return signInWithEmailAndPassword(firebaseAuth, email, password)
        .then((userCredential) => {
            return {
                status: true,
                user: userCredential,
                message: "User logged in.",
            };
        })
        .catch((err) => {
            return {
                status: false,
                user: null,
                message: err.code as string,
            };
        });
};

export const doSignInWithGoogle = async (): Promise<UserRequestReturnType> => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(firebaseAuth, provider)
        .then((userCredential) => {
            return {
                status: true,
                user: userCredential,
                message: "User logged in.",
            };
        })
        .catch((err) => {
            console.log(err)
            return {
                status: false,
                user: null,
                message: err.code as string,
            };
        });
};

export const doSignOut = async () => {
    firebaseAuth.signOut()
    // return ;
};

export const doPasswordReset = async (email: string) => {
    return sendPasswordResetEmail(firebaseAuth, email);
};

export const doPasswordChange = (password: string) => {
    if (!firebaseAuth.currentUser) return false;
    return updatePassword(firebaseAuth.currentUser, password);
};

export const doSendEmailVerification = () => {
    if (!firebaseAuth.currentUser) return false;

    return sendEmailVerification(firebaseAuth.currentUser, {
        url: `${window.location.origin}/home`,
    });
};
