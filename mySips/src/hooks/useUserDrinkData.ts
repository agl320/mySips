import { useState, useEffect, useRef } from "react";
import { doc, collection, onSnapshot } from "firebase/firestore";
import { Group } from "@/classes/Group";
import { IMenu } from "@/interfaces/IMenu";
import { Drink } from "@/classes/Drink";

export const useUserDrinkData = (firestore: any, userUid: string | null) => {
    const [drinkData, setDrinkData] = useState<IMenu>({});
    const isListenerSet = useRef(false); // Ref to track if listener is already set

    useEffect(() => {
        if (!userUid || isListenerSet.current) return;

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

                setDrinkData((prevData) => {
                    // Avoid unnecessary updates if data is unchanged
                    if (
                        JSON.stringify(prevData) ===
                        JSON.stringify(formattedDrinkData)
                    ) {
                        return prevData;
                    }
                    return formattedDrinkData;
                });
            },
            (error) => {
                console.error("Error fetching user drinks:", error.message);
            }
        );

        isListenerSet.current = true; // Mark listener as set

        return () => {
            isListenerSet.current = false; // Reset the flag on unmount
            unsubscribe();
        };
    }, [firestore, userUid]);

    return drinkData;
};
