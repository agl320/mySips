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

function MySipsPage() {
    const { status: statusUser, data: user } = useUser();
    // const firestore = useFirestore();

    if (statusUser === "loading") {
        return <span>Loading...</span>;
    }
    return (
        <div className="w-full h-full p-8 text-white bg-gradient-to-r from-black via-[#001237] via-[#002226] to-[#003760]">
            <div className="p-4 rounded-sm flex gap-12 bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40">
                <UserPageHeader
                    pageTitle="mySips"
                    linkTrail={[{ value: "Home" }, { value: "mySips" }]}
                />
                <UserStatistics
                    userId={user?.uid ?? ""}
                    statistics={{ drinkCount: true }}
                />
            </div>

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
