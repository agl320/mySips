import { useState, useEffect } from "react";
import { doc, collection, onSnapshot } from "firebase/firestore";
import { Group } from "@/classes/Group";

export interface IKeyGroup {
    [key: string]: Group;
}

/**
 * Custom group onSnapShot hook for group data
 *
 * @param firestore
 * @param userUid
 * @returns
 */
export const useTargetGroup = (
    firestore: any,
    userUid: string,
    groupUid: string
) => {
    const [groupData, setGroupData] = useState<IKeyGroup>({});

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
                    (acc, fetchedGroupData) => {
                        if (
                            !fetchedGroupData.uid ||
                            fetchedGroupData.placeholder
                        )
                            return acc;
                        acc[fetchedGroupData.uid] = fetchedGroupData;
                        return acc;
                    },
                    {} as IKeyGroup
                );

                setGroupData(formattedGroupData);
            },
            (error) => {
                console.error("Error fetching user groups:", error.message);
            }
        );

        return () => unsubscribe();
    }, [firestore, userUid]);

    return groupData;
};
