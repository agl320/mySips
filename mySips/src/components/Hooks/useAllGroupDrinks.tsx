import { useState, useEffect } from "react";
import { doc, collection, onSnapshot, getDoc } from "firebase/firestore";
import { AccessType } from "@/firebase/GroupHelpers";

/**
 * Custom hook to fetch all drink documents with their user drink data from groupDrinks subcollections in real time.
 *
 * @param firestore
 * @param userGroups - Record of user group data
 * @returns Object containing enriched drink data for all groups
 */
export const useAllGroupDrinks = (
    firestore: any,
    userGroups: Record<string, { accessType: AccessType; groupUid: string }>
) => {
    console.log({ userGroups });
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
                    async (querySnapshot) => {
                        const groupDrinks = await Promise.all(
                            querySnapshot.docs
                                .filter(
                                    (docData) => !docData.data().placeholder
                                )
                                .map(async (docData) => {
                                    const drinkData = docData.data();

                                    // Fetch userDrinkData using userUid and drinkUid
                                    const userDrinkRef = doc(
                                        firestore,
                                        "users",
                                        drinkData.userUid,
                                        "userDrinkData",
                                        drinkData.drinkUid
                                    );

                                    const userDrinkSnapshot = await getDoc(
                                        userDrinkRef
                                    );

                                    if (userDrinkSnapshot.exists()) {
                                        return userDrinkSnapshot.data(); // Merge user drink data
                                    } else {
                                        console.warn(
                                            `Drink with UID ${drinkData.drinkUid} not found in user ${drinkData.userUid}.`
                                        );
                                        return null;
                                    }
                                })
                        );

                        const formattedgroupDrinks = groupDrinks
                            .filter((groupDrink) => groupDrink)
                            .reduce((acc, groupDrink) => {
                                acc[groupDrink.uid] = groupDrink;
                                return acc;
                            }, {} as any);

                        drinkDataAccumulator[group.groupUid] =
                            formattedgroupDrinks;

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
