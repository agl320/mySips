import DrinkDisplay from "@/components/DrinkDisplay/DrinkDisplay";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useFirestore, useUser } from "reactfire";
import UserPageHeader from "../UserPageHeader/UserPageHeader";
import UserStatistics from "../UserComponents/UserStatistics/UserStatistics";
import UserBlock from "../UserComponents/Blocks/UserBlock";
import { User } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Firestore } from "firebase/firestore";
import { useUserDrinkData } from "@/components/Hooks/useUserDinkData";
import { useUserGroups } from "@/components/Hooks/useUserGroup";

interface IUserProps {
    user: User | null;
}

function MySipsPage(props: IUserProps) {
    const { user } = props;

    const firestore = useFirestore();

    const userDrinkData = useUserDrinkData(firestore, user?.uid ?? "");
    const userGroups = useUserGroups(firestore, user?.uid ?? "");

    return (
        <div className="w-full h-full p-8 text-white bg-primary">
            <UserBlock className="flex">
                <UserPageHeader
                    pageTitle="mySips"
                    linkTrail={[{ value: "Home" }, { value: "mySips" }]}
                />
                <UserStatistics
                    userId={user?.uid ?? ""}
                    name="Drinks"
                    value={String(Object.keys(userDrinkData).length)}
                />
                <UserStatistics
                    userId={user?.uid ?? ""}
                    name="Groups"
                    value={String(Object.keys(userGroups).length)}
                />
            </UserBlock>

            <div className="pt-8">
                <div className="flex">
                    <Button className="bg-pastel-pink h-12 text-base">
                        Sort by
                    </Button>
                    <Button className="bg-pastel-pink h-12 text-base ml-4">
                        Filter by
                    </Button>
                </div>

                <DrinkDisplay
                    user={user}
                    userId={user?.uid ?? ""}
                    isEditable
                    className="mt-8"
                />
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
