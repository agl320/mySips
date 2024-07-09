import LandingPageView from "./LandingPageView";
import UserView from "./UserView";
import { useAuth } from "@/components/contexts/authContext/loader";

function DefaultView() {
    const { userLoggedIn } = useAuth();
    return userLoggedIn ? (
        <UserView></UserView>
    ) : (
        <LandingPageView></LandingPageView>
    );
}

export default DefaultView;
