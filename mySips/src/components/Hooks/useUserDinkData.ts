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
export const useUserDrinkData = (firestore: any, userUid: string | null) => {
    const [drinkData, setDrinkData] = useState<IMenu>({});

    useEffect(() => {
        if (!userUid) return;

        const userDocRef = doc(firestore, "users", userUid);
        const userDrinkDataCollectionRef = collection(
            userDocRef,
            "userDrinkData"
        );

        const unsubscribe = onSnapshot(
            userDrinkDataCollectionRef,
            (querySnapshot) => {
                const fetchedDrinks = querySnapshot.docs.map((doc) =>
                    Drink.fromFirestore(doc.data())
                );

                const formattedDrinkData = fetchedDrinks.reduce(
                    (acc, drinkData) => {
                        if (!drinkData.uid) return acc;
                        acc[drinkData.uid] = drinkData;
                        return acc;
                    },
                    {} as IMenu
                );

                setDrinkData(formattedDrinkData);
            },
            (error) => {
                console.error("Error fetching user drinks:", error.message);
            }
        );

        return () => unsubscribe();
    }, [firestore, userUid]);

    return drinkData;
};
