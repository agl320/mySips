import LandingNav from "@/components/Landing/LandingNav";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { doSignInWithGoogle, doSignOut } from "@/firebase/Auth";
import { AuthContext } from "@/components/contexts/authContext";
import { useContext } from "react";
import { firebaseApp, firebaseAuth } from "@/firebase/FirebaseSetup";
import { useFirestore, useSigninCheck, useUser } from "reactfire";
import LoginForm from "@/components/Login/LoginForm";
import {
    addDoc,
    collection,
    doc,
    DocumentData,
    DocumentReference,
    getDocs,
    setDoc,
} from "firebase/firestore";
import { User } from "firebase/auth";

const MarginStyles = {
    marginRight: "15vw",
    marginLeft: "15vw",
} as React.CSSProperties;

function LoginPageContent() {
    const { status, data: signInCheckResult } = useSigninCheck();
    const { status: statusUser, data: userData } = useUser();

    const firestore = useFirestore();

    // Create collection within document if exists
    const checkAndCreateCollection = async (
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

    const createUserProfile = async (user: User) => {
        try {
            const userDocRef = doc(firestore, "users", user.uid);

            await setDoc(userDocRef, {
                name: user.displayName,
                email: user.email,
            });

            await checkAndCreateCollection(userDocRef, "userDrinkData");
            await checkAndCreateCollection(userDocRef, "userGroups");
        } catch (error) {
            console.error("Error creating user profile:", error.message);
        }
    };

    // If loading, return nothing
    if (status === "loading") {
        return <span>loading...</span>;
    }

    // If logged in, check to see if user has created profile
    //   if not, create new one
    if (signInCheckResult.signedIn === true) {
        if (userData) {
            // Creates user profile if does not exist
            createUserProfile(userData);
            return <Navigate to="/app" />;
        }
    }

    const handleSignInWithGoogle = async () => {
        await doSignInWithGoogle();
    };

    return (
        <div style={MarginStyles}>
            <LandingNav />
            <LoginForm />
            <div>
                <Button onClick={handleSignInWithGoogle}>
                    Log In with Google
                </Button>
            </div>
            <span>
                Need an account? <Link to="/register">Register</Link>
            </span>
        </div>
    );
}

export default LoginPageContent;
