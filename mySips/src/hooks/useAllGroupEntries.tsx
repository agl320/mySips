import { useState, useEffect } from "react";
import { doc, collection, onSnapshot } from "firebase/firestore";
import { AccessType } from "@/firebase/GroupHelpers";

/**
 * Custom hook to fetch and listen to all drink documents from groupDrinks subcollections in real time.
 *
 * @param firestore
 * @param userGroups - Record of user group data
 * @returns Object containing drink data for all groups
 */
export const useAllGroupEntries = (
    firestore: any,
    userGroups: Record<string, { accessType: AccessType; groupUid: string }>
) => {
    const [groupDrinkData, setGroupDrinkData] = useState<Record<string, any>>(
        {}
    );

    useEffect(() => {
        if (!userGroups || Object.keys(userGroups).length === 0) {
            setGroupDrinkData({});
            return;
        }

        // Store an array of unsubscribe functions for all groupDrinks subscriptions
        const unsubscribes: (() => void)[] = [];

        const fetchGroupDrinks = async () => {
            const drinkDataAccumulator: Record<string, any> = {};

            Object.values(userGroups).forEach((group) => {
                const groupDocRef = doc(firestore, "groups", group.groupUid);
                const groupDrinksCollectionRef = collection(
                    groupDocRef,
                    "groupDrinks"
                );

                const unsubscribe = onSnapshot(
                    groupDrinksCollectionRef,
                    (querySnapshot) => {
                        const groupDrinks = querySnapshot.docs.map((doc) => ({
                            drinkUid: doc.id,
                            ...doc.data(),
                        }));

                        drinkDataAccumulator[group.groupUid] = groupDrinks
                            .filter((groupDrink) => !groupDrink.placeholder)
                            .reduce((acc, groupDrink) => {
                                acc[groupDrink.pairUid] = groupDrink;
                                return acc;
                            }, {} as any);

                        // Update the state whenever the subcollection changes
                        setGroupDrinkData({ ...drinkDataAccumulator });
                    },
                    (error) => {
                        console.error(
                            `Error listening to groupDrinks collection (${group.groupUid}):`,
                            error
                        );
                    }
                );

                unsubscribes.push(unsubscribe);
            });
        };

        fetchGroupDrinks();

        // Clean up subscriptions on unmount or dependency change
        return () => {
            unsubscribes.forEach((unsubscribe) => unsubscribe());
        };
    }, [firestore, userGroups]);

    return groupDrinkData;
};
