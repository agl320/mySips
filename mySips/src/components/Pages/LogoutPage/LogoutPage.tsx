import { useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function LogoutPage() {
    const auth = getAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const doSignOut = async () => {
            try {
                await signOut(auth);
                console.log("User signed out");
                navigate("/"); // Redirect to home page after sign-out
            } catch (error) {
                console.error("Error signing out:", error.message);
            }
        };

        doSignOut();
    }, [auth, navigate]);

    return <p>Signing out...</p>;
}

export default LogoutPage;
