import { doc, getFirestore } from "firebase/firestore";
import { useFirestore, useFirestoreDocData, useUser } from "reactfire";
import AdminDisplay from "./AdminDisplay";
import { getUserData } from "@/firebase/ConnectionHelpers";
import CustomLoader from "@/components/CustomLoader/CustomLoader";
import { useEffect, useState } from "react";
import firebaseConfig from "../../../../../../firebaseConfig";
import UserBlock from "../UserComponents/Blocks/UserBlock";
import AddDrinkDialog from "@/components/DrinkForms/AddDrinkDialog";
import { createEmptyDrink } from "../../../../firebase/DrinkHelpers";
import { Button } from "@/components/ui/button";
import { useStoresData } from "@/hooks/useStoresData";
import { addDrinkToStore } from "@/firebase/StoreHelpers";
import StoreDrinkDisplay from "@/components/DrinkDisplay/StoreDrinkDisplay";
import { User } from "firebase/auth";
import UserPageHeader from "../UserPageHeader/UserPageHeader";

function MenuPage({ user }: { user: User }) {
    const firestore = useFirestore();

    const storesData = useStoresData(firestore);
    return (
        <section className="m-8">
            <UserBlock className="mr-4">
                <UserPageHeader
                    pageTitle="Menu"
                    linkTrail={[{ value: "Home" }, { value: "Menu" }]}
                    pageCaption="Copy drink data from our menu database."
                />
                <div className="mt-8">
                    {storesData.map((storeData) => {
                        return (
                            <div className="bg-white/15 border border-white/15 inline-block p-6 rounded-md ">
                                <h2 className="text-2xl font-display font-semibold">
                                    {storeData.storeName}
                                </h2>
                                <p className="italic">
                                    {storeData.storeAddress ?? "No address"}
                                </p>

                                <StoreDrinkDisplay
                                    user={user}
                                    storeUid={storeData.uid}
                                    className="mt-8"
                                />
                            </div>
                        );
                    })}
                </div>
            </UserBlock>
        </section>
    );
}

export default MenuPage;
