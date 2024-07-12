import { useAuth } from "@/components/contexts/authContext/loader";
import DrinkDisplay, {
    DisplayMode,
} from "@/components/DrinkApp/DrinkDisplay/DrinkDisplay";
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
            {/* <DrinkDisplay
                mode={DisplayMode.Limited}
                drinksState={drinksState}
            /> */}
        </div>
    );
}

export default UserView;
