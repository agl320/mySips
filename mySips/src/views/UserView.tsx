import { useAuth } from "@/components/contexts/authContext/loader";
import UserNav from "@/components/User/UserNav";
import { Link } from "react-router-dom";

function UserView() {
    const { userLoggedIn } = useAuth();
    return userLoggedIn ? (
        <div>
            <UserNav />
        </div>
    ) : (
        <Link to="/">Not logged in. Return home</Link>
    );
}

export default UserView;
