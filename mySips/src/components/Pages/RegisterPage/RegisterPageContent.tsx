import { useAuth } from "@/components/contexts/authContext/loader";
import LandingNav from "@/components/Landing/LandingNav";
import RegisterForm from "@/components/Register/RegisterForm";
import { Button } from "@/components/ui/button";
import { doSignInWithGoogle } from "@/firebase/Auth";
import { getAuth } from "firebase/auth";
import { Link, Navigate } from "react-router-dom";
import { AuthProvider, useFirebaseApp } from "reactfire";

const MarginStyles = {
    marginRight: "15vw",
    marginLeft: "15vw",
} as React.CSSProperties;
function RegisterPageContent() {
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
            <RegisterForm />
            <div>
                <Button onClick={handleSignInWithGoogle}>
                    Sign Up with Google
                </Button>
            </div>
            <span>
                <Link to="/login">Already have an account?</Link>
            </span>
        </div>
    );
}

export default RegisterPageContent;
