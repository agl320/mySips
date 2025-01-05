import { useState, useEffect } from "react";
import { doc, collection, onSnapshot } from "firebase/firestore";
import { Group } from "@/classes/Group";
import { Connection, ConnectionStatus } from "@/classes/Connection";

/**
 * Custom group onSnapShot hook for user groups
 *
 * @param firestore
 * @param userUid
 * @returns
 */
export const useUserConnections = (
    firestore: any,
    userUid: string | null,
    filterBy: ConnectionStatus
) => {
    const [userConnectionData, setUserConnectionData] = useState<any>({});

    useEffect(() => {
        if (!userUid) return;

        const userDocRef = doc(firestore, "users", userUid);
        const userConnectionsCollRef = collection(
            userDocRef,
            "userConnections"
        );

        const unsubscribe = onSnapshot(
            userConnectionsCollRef,
            (querySnapshot) => {
                const fetchedGroups = querySnapshot.docs.map((doc) =>
                    doc.data()
                );

                const formattedConnectionData = fetchedGroups.reduce(
                    (acc, connectionData) => {
                        if (
                            !connectionData.pairUid ||
                            connectionData.placeholder ||
                            connectionData.status !== filterBy
                        )
                            return acc;
                        acc[connectionData.pairUid] = connectionData;
                        return acc;
                    },
                    {} as IKeyGroup
                );

                setUserConnectionData(formattedConnectionData);
            },
            (error) => {
                console.error("Error fetching user groups:", error.message);
            }
        );

        return () => unsubscribe();
    }, [firestore, userUid]);

    return userConnectionData;
};
