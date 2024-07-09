import { firebaseAuth } from "@/firebase/FirebaseSetup";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
    currentUser: null,
    userLoggedIn: false,
    loading: true,
});

function AuthProvider({ children }: { children: JSX.Element }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, initializeUser);
        return unsubscribe;
    }, []);

    async function initializeUser(user) {
        if (user) {
            setCurrentUser({ ...user });
            setUserLoggedIn(true);
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        setLoading(false);
    }

    const value = {
        currentUser,
        userLoggedIn,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
