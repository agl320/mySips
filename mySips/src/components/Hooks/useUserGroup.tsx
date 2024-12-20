import { useState, useEffect } from "react";
import { doc, collection, onSnapshot } from "firebase/firestore";
import { Group } from "@/classes/Group";

/**
 * Custom group onSnapShot hook for user groups
 *
 * @param firestore
 * @param userUid
 * @returns
 */
export const useUserGroups = (firestore: any, userUid: string | null) => {
    const [userGroupData, setUserGroupData] = useState<any>({});

    useEffect(() => {
        if (!userUid) return;

        const userDocRef = doc(firestore, "users", userUid);
        const userGroupsCollectionRef = collection(userDocRef, "userGroups");

        const unsubscribe = onSnapshot(
            userGroupsCollectionRef,
            (querySnapshot) => {
                const fetchedGroups = querySnapshot.docs.map((doc) =>
                    doc.data()
                );

                const formattedGroupData = fetchedGroups.reduce(
                    (acc, groupData) => {
                        if (groupData.placeholder) return acc;
                        acc[groupData.groupUid] = groupData;
                        return acc;
                    },
                    {} as any
                );
                setUserGroupData(formattedGroupData);
            },
            (error) => {
                console.error("Error fetching user groups:", error.message);
            }
        );

        return () => unsubscribe();
    }, [firestore, userUid]);

    return userGroupData;
};
