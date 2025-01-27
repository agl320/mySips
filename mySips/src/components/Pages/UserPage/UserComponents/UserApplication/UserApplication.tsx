import OverviewPage from "../../OverviewPage/OverviewPage";
import AdminPage from "../../AdminPage/AdminPage";
import { PageTypes } from "@/enums/PageTypes";
import MySipsPage from "../../MySipsPage/MySipsPage";
import { useUser } from "reactfire";
import FriendsPage from "../../FriendsPage/FriendsPage";
import GroupsPage from "../../GroupsPage/GroupsPage";
import MenuPage from "../../MenuPage/MenuPage";
import CustomLoader from "@/components/CustomLoader/CustomLoader";
import { useNavigate } from "react-router-dom";

interface IUserApplication {
    selectedPage: PageTypes;
}

function UserApplication({ selectedPage }: IUserApplication) {
    const { status, data: user } = useUser();

    const navigate = useNavigate();

    if (status === "loading") {
        return <CustomLoader />;
    }

    if (!user) {
        navigate("/");
        return null;
    }

    // Map selectedPage to corresponding component
    const pageComponents = {
        [PageTypes.OVERVIEW]: <OverviewPage user={user} />,
        [PageTypes.ADMIN]: <AdminPage user={user} />,
        [PageTypes.MYSIPS]: <MySipsPage user={user} />,
        [PageTypes.FRIENDS]: <FriendsPage user={user} />,
        [PageTypes.MYGROUPS]: <GroupsPage user={user} />,
        [PageTypes.MENU]: <MenuPage user={user} />,
    };

    // Render the corresponding page or a fallback if not matched
    return pageComponents[selectedPage] || <></>;
}

export default UserApplication;
