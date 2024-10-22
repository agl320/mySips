import DrinkDisplay from "@/components/DrinkDisplay/DrinkDisplay";
import { Separator } from "@/components/ui/separator";
import { useFirestore, useUser } from "reactfire";

function OverviewPage() {
    const { status: statusUser, data: currUser } = useUser();
    const firestore = useFirestore();

    if (statusUser === "loading") {
        return <span>Loading...</span>;
    }

    return (
        <div className="w-full">
            <div className="h-24">
                <p>Search</p>
            </div>
            <Separator className="bg-black" />
            <div className="h-48 ">
                <p>Stats</p>
            </div>
            <Separator className="bg-black " />
            <div>
                <p>mySips</p>
            </div>
            {/* <DrinkDisplay userDrinkData={} /> */}
        </div>
    );
}

export default OverviewPage;
