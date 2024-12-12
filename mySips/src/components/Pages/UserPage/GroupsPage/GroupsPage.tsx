import {
    Pencil,
    Plus,
    PlusCircle,
    PlusSquare,
    Settings,
    Trash2,
} from "lucide-react";
import UserBlock from "../UserComponents/Blocks/UserBlock";
import UserPageHeader from "../UserPageHeader/UserPageHeader";
import { Button } from "@/components/ui/button";
import UserStatistics from "../UserComponents/UserStatistics/UserStatistics";
import GroupDisplay from "./GroupsDisplay";

function GroupsPage({ user }) {
    return (
        <div className="w-full h-full p-8 text-white bg-background-dark ">
            <UserBlock className="">
                <UserPageHeader
                    pageTitle="myGroups"
                    linkTrail={[{ value: "Home" }, { value: "myGroups" }]}
                />
            </UserBlock>

            <div className="mt-8">
                <GroupDisplay user={user} />
            </div>
        </div>
    );
}

export default GroupsPage;
