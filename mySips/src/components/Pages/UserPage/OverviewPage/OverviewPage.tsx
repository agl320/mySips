import { Drink } from "@/classes/Drink";
import DrinkDisplay from "@/components/DrinkDisplay/DrinkDisplay";
import { Separator } from "@/components/ui/separator";
import { addDoc, collection, doc } from "firebase/firestore";
import { useFirestore, useUser } from "reactfire";
import { v4 as uuidv4 } from "uuid";

function OverviewPage() {
    const { status: statusUser, data: user } = useUser();
    const firestore = useFirestore();

    if (statusUser === "loading") {
        return <span>Loading...</span>;
    }

    // doc reference
    const userDocRef = doc(firestore, "users", user?.uid);

    // collection reference
    const userDrinkDataCollectionRef = collection(userDocRef, "userDrinkData");

    // adds empty drink
    const addDrink = async () => {
        const uuid = uuidv4();
        await addDoc(
            userDrinkDataCollectionRef,
            new Drink({
                name: "Test Drink",
                uuid,
                description: "",
            }).toFirestore()
        );
    };

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
            <button
                className="bg-black text-white p-4 rounded-lg"
                onClick={addDrink}
            >
                Add drink
            </button>
        </div>
    );
}

export default OverviewPage;
