import { Separator } from "@/components/ui/separator";
import OverviewPage from "../../OverviewPage/OverviewPage";
import { PageTypes } from "../../UserPageContent";

interface IUserApplication {
    selectedPage: PageTypes;
}

function UserApplication(props: IUserApplication) {
    const { selectedPage } = props;

    if (selectedPage === PageTypes.OVERVIEW) {
        return <OverviewPage />;
    }

    return <></>;
}

export default UserApplication;
