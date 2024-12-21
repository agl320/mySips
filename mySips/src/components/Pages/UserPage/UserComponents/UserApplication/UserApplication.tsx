import OverviewPage from "../../OverviewPage/OverviewPage";
import AdminPage from "../../AdminPage/AdminPage";
import { PageTypes } from "@/enums/PageTypes";
import MySipsPage from "../../MySipsPage/MySipsPage";
import { useUser } from "reactfire";
import FriendsPage from "../../FriendsPage/FriendsPage";
import GroupsPage from "../../GroupsPage/GroupsPage";
import InboxPage from "../../InboxPage/InboxPage";

interface IUserApplication {
    selectedPage: PageTypes;
}

function UserApplication({ selectedPage }: IUserApplication) {
    const { status, data: user } = useUser();

    // Show loading indicator if user data is being fetched
    if (status === "loading") {
        return <span>Loading...</span>;
    }

    // Map selectedPage to corresponding component
    const pageComponents = {
        [PageTypes.OVERVIEW]: <OverviewPage user={user} />,
        [PageTypes.ADMIN]: <AdminPage />,
        [PageTypes.MYSIPS]: <MySipsPage user={user} />,
        [PageTypes.FRIENDS]: <FriendsPage user={user} />,
        [PageTypes.MYGROUPS]: <GroupsPage user={user} />,
        [PageTypes.INBOX]: <InboxPage user={user} />,
    };

    // Render the corresponding page or a fallback if not matched
    return pageComponents[selectedPage] || <></>;
}

export default UserApplication;
