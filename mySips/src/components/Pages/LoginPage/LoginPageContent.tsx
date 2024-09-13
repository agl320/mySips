import LandingNav from "@/components/Landing/LandingNav";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { doSignInWithGoogle, doSignOut } from "@/firebase/Auth";
import { AuthContext } from "@/components/contexts/authContext";
import { useContext } from "react";
import { firebaseApp, firebaseAuth } from "@/firebase/FirebaseSetup";
import { useSigninCheck, useUser } from "reactfire";
import LoginForm from "@/components/Login/LoginForm";

const MarginStyles = {
    marginRight: "15vw",
    marginLeft: "15vw",
} as React.CSSProperties;

function LoginPageContent() {
    const { status, data: signInCheckResult } = useSigninCheck();

    if (status === "loading") {
        return <span>loading...</span>;
    }

    if (signInCheckResult.signedIn === true) {
        return <Navigate to="/app" />;
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
