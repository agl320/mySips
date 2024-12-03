import { Separator } from "@/components/ui/separator";
import OverviewPage from "../../OverviewPage/OverviewPage";
import AdminPage from "../../AdminPage/AdminPage";
import { PageTypes } from "@/enums/PageTypes";
import { getFirestore } from "firebase/firestore";
import MySipsPage from "../../MySipsPage/MySipsPage";
import { useUser } from "reactfire";
import FriendsPage from "../../FriendsPage/FriendsPage";

interface IUserApplication {
    selectedPage: PageTypes;
}

function UserApplication(props: IUserApplication) {
    const { status: statusUser, data: user } = useUser();

    if (statusUser === "loading") {
        return <span>Loading...</span>;
    }

    const { selectedPage } = props;

    if (selectedPage === PageTypes.OVERVIEW) {
        return <OverviewPage user={user} />;
    }

    if (selectedPage === PageTypes.ADMIN) {
        return <AdminPage />;
    }

    if (selectedPage === PageTypes.MYSIPS) {
        return <MySipsPage user={user} />;
    }

    if (selectedPage === PageTypes.FRIENDS) {
        return <FriendsPage user={user} />;
    }

    return <></>;
}

export default UserApplication;
