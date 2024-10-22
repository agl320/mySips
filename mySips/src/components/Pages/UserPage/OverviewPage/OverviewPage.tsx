import { Drink } from "@/classes/Drink";
import DrinkDisplay from "@/components/DrinkDisplay/DrinkDisplay";
import { Separator } from "@/components/ui/separator";
import { IMenu } from "@/interfaces/IMenu";
import { addDoc, collection, doc, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";
import { v4 as uuidv4 } from "uuid";

function OverviewPage() {
    const { status: statusUser, data: user } = useUser();
    // const firestore = useFirestore();

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
            <DrinkDisplay userId={user?.uid} />
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
