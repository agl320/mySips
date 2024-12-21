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
import GroupDisplay from "./GroupDisplay";
import { useEffect, useState } from "react";

function GroupsPage({ user }) {
    const [linkTrail, setLinkTrail] = useState<{
        href?: string;
        value: string;
    } | null>(null);

    useEffect(() => {
        console.log({ linkTrail });
    }, [linkTrail]);

    return (
        <div className="w-full h-full p-8 text-white bg-background-dark ">
            <UserBlock>
                <UserPageHeader
                    pageTitle="myGroups"
                    linkTrail={[
                        { value: "Home" },
                        { value: "myGroups" },
                        ...(linkTrail ? [linkTrail] : []), // Conditionally add linkTrail
                    ]}
                />
            </UserBlock>
            <UserBlock className="mt-4">
                <GroupDisplay user={user} setLinkTrail={setLinkTrail} />
            </UserBlock>
        </div>
    );
}

export default GroupsPage;
