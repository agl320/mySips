import { Link } from "react-router-dom";
import { Button } from "../ui/button";

function LandingNav() {
    return (
        <div className="flex justify-between">
            <Link to="/">mySips</Link>
            <Link to="/login">Log In</Link>
        </div>
    );
}

export default LandingNav;
