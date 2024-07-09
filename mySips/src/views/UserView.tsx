import { useAuth } from "@/components/contexts/authContext/loader";
import UserNav from "@/components/User/UserNav";
import { Link, Navigate } from "react-router-dom";

function UserView() {
    const { userLoggedIn } = useAuth();

    if (!userLoggedIn) {
        return <Navigate to="/" />;
    }
    return (
        <div>
            <UserNav />
        </div>
    );
}

export default UserView;
