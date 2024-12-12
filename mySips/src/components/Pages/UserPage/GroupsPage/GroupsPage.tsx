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

function GroupsPage({ user }) {
    return (
        <div className="w-full h-full p-8 text-white bg-background-dark ">
            <UserBlock className="">
                <UserPageHeader
                    pageTitle="myGroups"
                    linkTrail={[{ value: "Home" }, { value: "myGroups" }]}
                />
            </UserBlock>
            <UserBlock className="mt-8">
                <Button className="bg-pastel-pink w-12 h-12">
                    <Plus className="" />
                </Button>
                <div className="mt-8">
                    <div className="w-80 bg-pastel-pink rounded-md p-4 flex justify-between">
                        <div>
                            <h1 className="text-4xl font-semibold mb-8">
                                Cafe
                            </h1>
                            <UserStatistics
                                userId={user?.uid}
                                statistics={{
                                    drinkCount: false,
                                }}
                            />
                        </div>
                        <div className="mt-auto">
                            <Button className="bg-white aspect-square h-12 w-12">
                                <Pencil
                                    className="stroke-pastel-pink aspect-square"
                                    strokeWidth="3"
                                />
                            </Button>
                        </div>
                    </div>
                </div>
            </UserBlock>
        </div>
    );
}

export default GroupsPage;
