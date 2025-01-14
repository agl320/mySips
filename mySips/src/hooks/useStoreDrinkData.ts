import { useState, useEffect, useRef } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { Drink } from "@/classes/Drink";
import { IMenu } from "@/interfaces/IMenu";

export const useStoreDrinkData = (firestore: any) => {
    const [storeDrinkData, setStoreDrinkData] = useState<IMenu>({});
    const isListenerSet = useRef(false); // Ref to track if listener is already set

    useEffect(() => {
        if (isListenerSet.current) return; // Skip if the listener is already set

        const storesCollectionRef = collection(firestore, "stores");

        const unsubscribe = onSnapshot(
            storesCollectionRef,
            (querySnapshot) => {
                const fetchedDrinks = querySnapshot.docs.flatMap((storeDoc) => {
                    const storeDrinkDataCollectionRef = collection(
                        storeDoc.ref,
                        "storeDrinkData"
                    );
                    // Fetch nested documents for storeDrinkData
                    const nestedDocs = storeDrinkDataCollectionRef.stream();
                    return nestedDocs.map((drinkDoc) =>
                        Drink.fromFirestore(drinkDoc.data())
                    );
                });

                const formattedDrinkData = fetchedDrinks.reduce(
                    (acc, drinkData) => {
                        if (!drinkData.uid) return acc;
                        acc[drinkData.uid] = drinkData;
                        return acc;
                    },
                    {} as IMenu
                );

                setStoreDrinkData((prevData) => {
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
                console.error("Error fetching store drinks:", error.message);
            }
        );

        isListenerSet.current = true; // Mark listener as set

        return () => {
            isListenerSet.current = false; // Reset the flag on unmount
            unsubscribe();
        };
    }, [firestore]);

    return storeDrinkData;
};
