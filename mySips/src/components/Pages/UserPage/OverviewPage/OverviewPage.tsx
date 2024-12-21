import DrinkDisplay from "@/components/DrinkDisplay/DrinkDisplay";
import UserBlock from "../UserComponents/Blocks/UserBlock";
import UserPageHeader from "../UserPageHeader/UserPageHeader";
import { User } from "firebase/auth";

interface IUserProps {
    user: User | null;
}

function OverviewPage({ user }: IUserProps) {
    return (
        <div className="w-full h-full p-8 text-white bg-gradient-to-r from-background-dark to-[#1c1a10] via-[#1c1015]">
            <div className="flex">
                <UserBlock className="mr-4">
                    <UserPageHeader
                        pageTitle="Overview"
                        linkTrail={[{ value: "Home" }, { value: "Overview" }]}
                        pageCaption="Here's your drink data overview."
                    />
                </UserBlock>

                <UserBlock className="bg-gradient-to-r from-pastel-pink to-pastel-orange w-full">
                    <div className="h-48">
                        <h1 className="text-4xl font-semibold">
                            Welcome back, {user?.displayName}
                        </h1>
                    </div>
                </UserBlock>
            </div>

            <UserBlock className="mt-4 space-y-8">
                <h1 className="text-3xl font-semibold">Drinks</h1>
                <DrinkDisplay user={user} userId={user?.uid ?? ""} />
            </UserBlock>
        </div>
    );
}

export default OverviewPage;
