import { Separator } from "@/components/ui/separator";
import OverviewPage from "../../OverviewPage/OverviewPage";
import AdminPage from "../../AdminPage/AdminPage";
import { PageTypes } from "@/enums/PageTypes";
import { getFirestore } from "firebase/firestore";

interface IUserApplication {
    selectedPage: PageTypes;
}

function UserApplication(props: IUserApplication) {
    const { selectedPage } = props;

    if (selectedPage === PageTypes.OVERVIEW) {
        return <OverviewPage />;
    }

    if (selectedPage === PageTypes.ADMIN) {
        return <AdminPage />;
    }

    return <></>;
}

export default UserApplication;
