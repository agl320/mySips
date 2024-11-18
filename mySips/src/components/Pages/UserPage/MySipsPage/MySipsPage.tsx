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

function MySipsPage() {
    const { status: statusUser, data: user } = useUser();
    // const firestore = useFirestore();

    if (statusUser === "loading") {
        return <span>Loading...</span>;
    }
    return (
        <div className="w-full h-full p-8 text-white bg-gradient-to-r from-black via-[#001237] via-[#002226] to-[#003760]">
            <div className=" p-4 rounded-sm flex gap-12 bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40">
                <UserPageHeader
                    pageTitle="mySips"
                    linkTrail={[{ value: "Home" }, { value: "mySips" }]}
                />
                <div className="flex gap-4">
                    <div>
                        <h1 className="pb-4 opacity-80">Drinks</h1>
                        <p className="text-3xl  font-semibold">53</p>
                    </div>
                    <div>
                        <h1 className="pb-4  opacity-80">Groups</h1>
                        <p className="text-3xl  font-semibold">3</p>
                    </div>
                </div>
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
