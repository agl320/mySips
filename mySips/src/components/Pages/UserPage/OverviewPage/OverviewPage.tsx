import DrinkDisplay from "@/components/DrinkDisplay/DrinkDisplay";
import { Separator } from "@/components/ui/separator";
import UserBlock from "../UserComponents/Blocks/UserBlock";
import UserPageHeader from "../UserPageHeader/UserPageHeader";
import { User } from "firebase/auth";

interface IUserProps {
    user: User | null;
}

function OverviewPage(props: IUserProps) {
    const { user } = props;
    return (
        <div className="w-full h-full p-8 text-white bg-background-dark ">
            <div className="flex">
                <UserBlock className="mr-8 w-80">
                    <UserPageHeader
                        pageTitle="Overview"
                        linkTrail={[{ value: "Home" }, { value: "Overview" }]}
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

            <UserBlock className="mt-8 space-y-8">
                <h1 className="text-3xl font-semibold">Drinks</h1>
                <DrinkDisplay user={user} userId={user?.uid ?? ""} />
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

export default OverviewPage;
