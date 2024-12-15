import { useState, useEffect } from "react";
import { doc, collection, onSnapshot } from "firebase/firestore";
import { Group } from "@/classes/Group";

export interface KeyGroup {
    [key: string]: Group;
}

/**
 * Custom group onSnapShot hook for user groups
 *
 * @param firestore
 * @param userUid
 * @returns
 */
export const useUserGroups = (firestore: any, userUid: string | null) => {
    const [userGroupData, setUserGroupData] = useState<KeyGroup>({});

    useEffect(() => {
        if (!userUid) return;

        const userDocRef = doc(firestore, "users", userUid);
        const userGroupsCollectionRef = collection(userDocRef, "userGroups");

        const unsubscribe = onSnapshot(
            userGroupsCollectionRef,
            (querySnapshot) => {
                const fetchedGroups = querySnapshot.docs.map((doc) =>
                    Group.fromFirestore(doc.data())
                );

                const formattedGroupData = fetchedGroups.reduce(
                    (acc, groupData) => {
                        if (!groupData.uid || groupData.placeholder) return acc;
                        acc[groupData.uid] = groupData;
                        return acc;
                    },
                    {} as KeyGroup
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
