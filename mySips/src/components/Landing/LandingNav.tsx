import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext/loader";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

function LandingNav() {
    const { userLoggedIn } = useContext(AuthContext);
    return (
        <div className="flex justify-between">
            <Link to="/">mySips</Link>
            {userLoggedIn ? (
                <Link to="/app">App</Link>
            ) : (
                <Link to="/login">Log In</Link>
            )}
        </div>
    );
}

export default LandingNav;
