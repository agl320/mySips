import LandingNav from "@/components/Landing/LandingNav";
import RegisterForm from "@/components/Register/RegisterForm";
import { Button } from "@/components/ui/button";
import { doSignInWithGoogle } from "@/firebase/Auth";
import { Link } from "react-router-dom";

const MarginStyles = {
    marginRight: "15vw",
    marginLeft: "15vw",
} as React.CSSProperties;
function RegisterView() {
    return (
        <div style={MarginStyles}>
            <LandingNav />
            <RegisterForm />
            <div>
                <Button onClick={() => doSignInWithGoogle()}>
                    Sign Up with Google
                </Button>
            </div>
            <span>
                <Link to="/login">Already have an account?</Link>
            </span>
        </div>
    );
}

export default RegisterView;
