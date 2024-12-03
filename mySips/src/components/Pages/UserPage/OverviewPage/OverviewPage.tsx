import { Drink } from "@/classes/Drink";
import DrinkDisplay from "@/components/DrinkDisplay/DrinkDisplay";
import { Separator } from "@/components/ui/separator";
import { IMenu } from "@/interfaces/IMenu";
import { addDoc, collection, doc, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";
import { v4 as uuidv4 } from "uuid";
import UserBlock from "../UserComponents/Blocks/UserBlock";
import UserPageHeader from "../UserPageHeader/UserPageHeader";

function OverviewPage() {
    const { status: statusUser, data: user } = useUser();
    // const firestore = useFirestore();

    if (statusUser === "loading") {
        return <span>Loading...</span>;
    }

    return (
        <div className="w-full h-full p-8 text-white bg-gradient-to-r from-black via-[#372c00] via-[#261600] to-[#47002b]">
            <UserBlock>
                <UserPageHeader
                    pageTitle="Overview"
                    linkTrail={[{ value: "Home" }, { value: "Overview" }]}
                />
            </UserBlock>

            <UserBlock className="mt-8">
                <div className="h-48 ">
                    <h1 className="text-3xl font-semibold opacity-80">
                        Analytics
                    </h1>
                </div>
                <Separator className="bg-white opacity-25 " />
            </UserBlock>

            <UserBlock className="mt-8 space-y-8">
                <h1 className="text-3xl font-semibold opacity-80">Drinks</h1>
                <DrinkDisplay userId={user?.uid} />
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
