import { doSignOut } from "@/firebase/Auth";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function UserNav() {
    const handleSignOut = async () => {
        await doSignOut();
    };
    return (
        <div className="flex">
            <Link to="/">Home</Link>
            <Button onClick={handleSignOut}>Sign Out</Button>
        </div>
    );
}

export default UserNav;
