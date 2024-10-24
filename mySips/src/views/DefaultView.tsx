import LandingPageView from "../components/Pages/UserPage/LandingPage/LandingPage";
import { useAuth } from "@/components/contexts/authContext/loader";

function DefaultView() {
    return <LandingPageView></LandingPageView>;
}

export default DefaultView;
