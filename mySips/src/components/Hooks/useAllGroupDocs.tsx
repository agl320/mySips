import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { AccessType } from "@/firebase/GroupHelpers";

/**
 * Custom hook to fetch and listen to all group documents associated with a user's groups in real time.
 *
 * @param firestore
 * @param userGroups - Record of user group data
 * @returns Array of group document data
 */
export const useAllGroupDocs = (
    firestore: any,
    userGroups: Record<string, { accessType: AccessType; groupUid: string }>
) => {
    const [groupDocData, setGroupDocData] = useState<any>({});

    useEffect(() => {
        if (!userGroups || Object.keys(userGroups).length === 0) {
            setGroupDocData([]);
            return;
        }

        // Store an array of unsubscribe functions for all group document subscriptions
        const unsubscribes: (() => void)[] = [];

        const fetchGroupDocs = async () => {
            const groupDataAccumulator: Record<string, any> = {};

            Object.values(userGroups).forEach((group) => {
                const groupDocRef = doc(firestore, "groups", group.groupUid);

                const unsubscribe = onSnapshot(
                    groupDocRef,
                    (groupDocSnapshot) => {
                        if (groupDocSnapshot.exists()) {
                            groupDataAccumulator[group.groupUid] = {
                                groupUid: group.groupUid,
                                ...groupDocSnapshot.data(),
                            };
                        } else {
                            delete groupDataAccumulator[group.groupUid];
                        }

                        // Update the state whenever a document changes
                        setGroupDocData({ ...groupDataAccumulator });
                    },
                    (error) => {
                        console.error(
                            `Error listening to group document (${group.groupUid}):`,
                            error
                        );
                    }
                );

                unsubscribes.push(unsubscribe);
            });
        };

        fetchGroupDocs();

        // Clean up subscriptions on unmount or dependency change
        return () => {
            unsubscribes.forEach((unsubscribe) => unsubscribe());
        };
    }, [firestore, userGroups]);

    return groupDocData;
};
