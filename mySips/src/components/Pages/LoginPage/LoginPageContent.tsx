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
import { Separator } from "@/components/ui/separator";
import LoginPageContentLeftCard from "./LoginPageContentLeftCard";

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
            await checkAndCreateCollection(userDocRef, "userConnections");
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
        <div className="bg-gradient-to-r from-background-dark to-[#1c1a10] via-[#1c1015] bg-cover h-full">
            <section className="flex flex-col flex-1 h-screen  min-h-[900px]">
                <LandingNav />
                <div className="lg:flex h-full justify-center">
                    <LoginPageContentLeftCard />
                    <div className="lg:w-1/2 m-8 lg:ml-4 bg-white/5 text-white rounded-md flex flex-col justify-center p-8 py-16">
                        <div className="max-w-sm mx-auto">
                            <div className="text-center space-y-4 mb-8">
                                <h2 className="text-2xl font-semibold">
                                    Welcome back
                                </h2>
                                <p className="">
                                    Get back to collecting drinks from your
                                    favourite menus
                                </p>
                            </div>
                            <LoginForm />
                            <div className="space-y-8 mt-8">
                                <div className="flex justify-center">
                                    <div className="flex flex-col justify-center">
                                        <Separator className="bg-white/25 w-[150px]" />
                                    </div>

                                    <p className="opacity-25 text-xs mx-2">
                                        OR
                                    </p>
                                    <div className="flex flex-col justify-center">
                                        <Separator className="bg-white/25 w-[150px]" />
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <Button
                                        onClick={handleSignInWithGoogle}
                                        className="bg-gradient-to-r from-pastel-pink to-pastel-orange"
                                    >
                                        Log In with Google
                                    </Button>
                                </div>
                                <div className="flex justify-center">
                                    <span className="block">
                                        Need an account?{"\t"}
                                        <Link
                                            to="/register"
                                            className="text-pastel-orange font-medium"
                                        >
                                            Register
                                        </Link>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default LoginPageContent;
