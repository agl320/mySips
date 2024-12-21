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
import { useUserDrinkData } from "@/components/Hooks/useUserDrinkData";
import { useUserGroups } from "@/components/Hooks/useUserGroup";
import { Separator } from "@/components/ui/separator";
import { ArrowDownWideNarrow, ListFilter } from "lucide-react";

interface IUserProps {
    user: User | null;
}

function MySipsPage(props: IUserProps) {
    const { user } = props;

    const firestore = useFirestore();

    const userDrinkData = useUserDrinkData(firestore, user?.uid ?? "");
    const userGroups = useUserGroups(firestore, user?.uid ?? "");

    return (
        <div className="w-full h-full p-8 text-white bg-gradient-to-r from-background-dark to-[#1c1a10] via-[#1c1015]">
            <div className="flex space-x-4">
                <UserBlock>
                    <UserPageHeader
                        pageTitle="mySips"
                        linkTrail={[{ value: "Home" }, { value: "mySips" }]}
                        pageCaption="All your drinks, stored in one place."
                    />
                </UserBlock>
                <UserBlock className="flex">
                    <UserStatistics
                        userId={user?.uid ?? ""}
                        name="Drinks"
                        value={String(Object.keys(userDrinkData).length)}
                    />
                    <Separator
                        orientation="vertical"
                        className="bg-white/15 mx-8"
                    />
                    <UserStatistics
                        userId={user?.uid ?? ""}
                        name="Groups"
                        value={String(Object.keys(userGroups).length)}
                    />
                    <Separator
                        orientation="vertical"
                        className="bg-white/15 mx-8"
                    />
                    <UserStatistics
                        userId={user?.uid ?? ""}
                        name="Money Spent"
                        value="$5,604.65"
                    />
                </UserBlock>
            </div>

            <UserBlock className="mt-4">
                <div className="flex">
                    <Button className="bg-pastel-pink h-12 text-base">
                        <ArrowDownWideNarrow />
                        Sort by
                    </Button>
                    <Button className="bg-pastel-pink h-12 text-base ml-4">
                        <ListFilter />
                        Filter by
                    </Button>
                </div>

                <DrinkDisplay
                    user={user}
                    userId={user?.uid ?? ""}
                    isEditable
                    className="mt-8"
                />
            </UserBlock>
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
