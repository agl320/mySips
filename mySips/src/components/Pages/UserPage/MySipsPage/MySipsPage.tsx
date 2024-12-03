import DrinkDisplay from "@/components/DrinkDisplay/DrinkDisplay";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useUser } from "reactfire";
import UserPageHeader from "../UserPageHeader/UserPageHeader";
import UserStatistics from "../UserComponents/UserStatistics/UserStatistics";
import UserBlock from "../UserComponents/Blocks/UserBlock";
import { User } from "firebase/auth";

interface IUserProps {
    user: User | null;
}

function MySipsPage(props: IUserProps) {
    const { user } = props;
    return (
        <div className="w-full h-full p-8 text-white bg-gradient-to-r from-black via-[#001237] via-[#002226] to-[#003760]">
            <UserBlock className="flex">
                <UserPageHeader
                    pageTitle="mySips"
                    linkTrail={[{ value: "Home" }, { value: "mySips" }]}
                />
                <UserStatistics
                    userId={user?.uid ?? ""}
                    statistics={{ drinkCount: true }}
                />
            </UserBlock>

            <div className="pt-8">
                <DrinkDisplay userId={user?.uid ?? ""} isEditable />
            </div>

            {/* <button
        className="bg-black text-white p-4 rounded-lg"
        onClick={addDrinkData}
    >
        Add drink
    </button> */}
        </div>
    );
}

export default MySipsPage;
