import { Link, Navigate } from "react-router-dom";
import { useSigninCheck } from "reactfire";
import UserNav from "./UserComponents/UserNav";
import UserApplication from "./UserComponents/UserApplication/UserApplication";

function UserPageContent() {
    const { status, data: signInCheckResult } = useSigninCheck();

    if (status === "loading") {
        return <span>loading...</span>;
    }

    if (signInCheckResult.signedIn === false) {
        return <Navigate to="/" />;
    }
    return (
        <div className="flex  min-h-screen">
            <UserNav />
            <UserApplication />
        </div>
    );
}

export default UserPageContent;
