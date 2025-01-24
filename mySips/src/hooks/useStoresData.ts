import { useState, useEffect, useRef } from "react";
import { collection, Firestore, onSnapshot } from "firebase/firestore";

export const useStoresData = (firestore: Firestore) => {
    const [storesData, setStoresData] = useState<any[]>([]);

    // listener bool to ensure we don’t set listener multiple times
    const isListenerSet = useRef(false);

    useEffect(() => {
        if (isListenerSet.current) return;

        const storesCollectionRef = collection(firestore, "stores");

        const unsubscribe = onSnapshot(
            storesCollectionRef,
            (querySnapshot) => {
                const storeData = querySnapshot.docs.map((doc) => ({
                    storeUid: doc.id,
                    ...doc.data(),
                }));

                setStoresData((prevData) => {
                    if (
                        JSON.stringify(prevData) === JSON.stringify(storeData)
                    ) {
                        return prevData;
                    }
                    return storeData;
                });
            },
            (error) => {
                console.error("Error fetching store data:", error.message);
            }
        );

        isListenerSet.current = true;

        // must set false upon return
        return () => {
            isListenerSet.current = false;
            unsubscribe();
        };
    }, [firestore]);

    return storesData;
};
