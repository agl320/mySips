import { useState, useEffect } from "react";
import { doc, collection, onSnapshot } from "firebase/firestore";
import { Group } from "@/classes/Group";
import { IMenu } from "@/interfaces/IMenu";
import { Drink } from "@/classes/Drink";

/**
 * Custom group onSnapShot hook for user drink data
 *
 * @param firestore
 * @param userUid
 * @returns
 */
export const useUseGroupDrinkData = (
    firestore: any,
    userUid: string,
    groupUid: string
) => {
    const [drinkGroupsData, setDrinkGroupsData] = useState<any>({});

    useEffect(() => {
        if (!userUid) return;

        const userDocRef = doc(firestore, "users", userUid);
        const userDrinkGroupsCollectionRef = collection(
            userDocRef,
            "userGroups",
            groupUid,
            "groupDrinks"
        );

        const unsubscribe = onSnapshot(
            userDrinkGroupsCollectionRef,
            (querySnapshot) => {
                const fetchedDrinksGroups = querySnapshot.docs.map((doc) =>
                    doc.data()
                );

                const formattedDrinkGroupsData = fetchedDrinksGroups.reduce(
                    (acc, drinkGroupData) => {
                        if (!drinkGroupData.pairUid) return acc;
                        acc[drinkGroupData.pairUid] = drinkGroupData;
                        return acc;
                    },
                    {} as any
                );

                setDrinkGroupsData(formattedDrinkGroupsData);
            },
            (error) => {
                console.error("Error fetching user drinks:", error.message);
            }
        );

        return () => unsubscribe();
    }, [firestore, groupUid, userUid]);

    return drinkGroupsData;
};
