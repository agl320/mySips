import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    updatePassword,
    updateProfile,
    User,
    UserCredential,
} from "firebase/auth";
import { firebaseAuth } from "./FirebaseSetup";
import {
    getFirestore,
    doc,
    setDoc,
    DocumentReference,
    DocumentData,
    collection,
    getDocs,
    addDoc,
} from "firebase/firestore"; // Add Firestore imports

interface UserRequestReturnType {
    status: boolean;
    user: UserCredential | null;
    message: string;
}

const firestore = getFirestore(); // Initialize Firestore

export const doCreateUserWithEmailAndPassword = async (
    email: string,
    name: string,
    password: string
): Promise<UserRequestReturnType> => {
    if (!name) {
        return {
            status: false,
            user: null,
            message: "Name is required.",
        };
    }

    return createUserWithEmailAndPassword(firebaseAuth, email, password)
        .then(async (userCredential) => {
            await updateProfile(userCredential.user, { displayName: name });

            await setDoc(doc(firestore, "users", userCredential.user.uid), {
                email: userCredential.user.email,
                name: name,
            });
            await createUserProfile({
                email: userCredential.user.email,
                displayName: name,
                uid: userCredential.user.uid,
            });
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
            console.log(err);
            return {
                status: false,
                user: null,
                message: err.code as string,
            };
        });
};

export const doSignOut = async () => {
    firebaseAuth.signOut();
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

// Create collection within document if exists
export const checkAndCreateCollection = async (
    userDocRef: DocumentReference<DocumentData, DocumentData>,
    collectionName: string
) => {
    const collectionRef = collection(userDocRef, collectionName);

    try {
        const querySnapshot = await getDocs(collectionRef);

        if (querySnapshot.empty) {
            await addDoc(collectionRef, { placeholder: true });
        } else {
            console.log(`${collectionName} already exists.`);
        }
    } catch (error) {
        console.error(`Error checking ${collectionName}:`, error.message);
    }
};

export const createUserProfile = async (user: Partial<User>) => {
    try {
        if (!user.uid) {
            throw new Error("User UID is undefined");
        }
        const userDocRef = doc(firestore, "users", user.uid);

        await setDoc(userDocRef, {
            name: user.displayName,
            email: user.email,
        });

        await checkAndCreateCollection(userDocRef, "userDrinkData");
        await checkAndCreateCollection(userDocRef, "userGroups");
        await checkAndCreateCollection(userDocRef, "userConnections");
    } catch (error) {
        console.error("Error creating user profile:", error.message);
    }
};
