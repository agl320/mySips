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
            <UserBlock>
                <UserPageHeader
                    pageTitle="Overview"
                    linkTrail={[{ value: "Home" }, { value: "Overview" }]}
                />
            </UserBlock>

            <UserBlock className="mt-8">
                <div className="h-48 ">
                    <h1 className="text-3xl font-semibold">Analytics</h1>
                </div>
                <Separator className="bg-white opacity-25 " />
            </UserBlock>

            <UserBlock className="mt-8 space-y-8">
                <h1 className="text-3xl font-semibold">Drinks</h1>
                <DrinkDisplay userId={user?.uid ?? ""} />
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
