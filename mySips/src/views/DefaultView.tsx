import LandingPageView from "./LandingPageView";
import { useAuth } from "@/components/contexts/authContext/loader";

function DefaultView() {
    const { userLoggedIn } = useAuth();
    return <LandingPageView></LandingPageView>;
}

export default DefaultView;
