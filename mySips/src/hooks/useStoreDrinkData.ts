import { useState, useEffect } from "react";
import { doc, collection, onSnapshot } from "firebase/firestore";

/**
 * Custom hook for accessing store's storeDrinkData collection
 *
 * @param firestore
 * @param storeUid
 * @returns
 */
export const useStoreDrinkData = (firestore: any, storeUid: string | null) => {
    const [storeDrinkData, setStoreDrinkData] = useState<any>({});

    useEffect(() => {
        if (!storeUid) return;

        const storeDocRef = doc(firestore, "stores", storeUid);
        const storeDrinkDataCollectionRef = collection(
            storeDocRef,
            "storeDrinkData"
        );

        const unsubscribe = onSnapshot(
            storeDrinkDataCollectionRef,
            (querySnapshot) => {
                const fetchedDrinks = querySnapshot.docs.map((doc) =>
                    doc.data()
                );

                const formattedDrinkData = fetchedDrinks.reduce(
                    (acc, drinkData) => {
                        if (Object.hasOwn(drinkData, "placeholder")) return acc;
                        acc[drinkData.uid] = drinkData;
                        return acc;
                    },
                    {} as any
                );
                setStoreDrinkData(formattedDrinkData);
            },
            (error) => {
                console.error(
                    "Error fetching    store drink data:",
                    error.message
                );
            }
        );

        return () => unsubscribe();
    }, [firestore, storeUid]);

    return storeDrinkData;
};
