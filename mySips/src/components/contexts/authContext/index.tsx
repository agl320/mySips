import { firebaseAuth, firebaseDB } from "@/firebase/FirebaseSetup";
import IUser from "@/interfaces/IUser";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import _ from "lodash";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
    currentUser: null,
    userLoggedIn: false,
    loading: true,
});

function AuthProvider({ children }: { children: JSX.Element }) {
    console.log("Render");
    const [currentUser, setCurrentUser] = useState<null | User>(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    // const [drinksState, setDrinksState] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, initializeUser);
        return unsubscribe;
    }, []);

    async function initializeUser(user: User) {
        if (user) {
            console.log(user);
            setCurrentUser({ ...user });
            setUserLoggedIn(true);
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        setLoading(false);
    }

    // useEffect(() => {
    //     loadUserData();
    // }, [currentUser]);

    // async function loadUserData() {
    //     if (currentUser) {
    //         const docRef = doc(firebaseDB, "users", currentUser.uid);
    //         const docSnap = await getDoc(docRef);
    //         const userData = docSnap.data() as IUser;
    //         if (
    //             userData.userDrinkData &&
    //             !_.isEqual(drinksState, userData.userDrinkData)
    //         ) {
    //             console.log(userData.userDrinkData);
    //             setDrinksState(userData.userDrinkData ?? {});
    //         }
    //     } else {
    //         setDrinksState({});
    //     }
    // }

    const value = {
        currentUser,
        userLoggedIn,
        loading,
        // drinksState,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
