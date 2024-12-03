import {
    collection,
    doc,
    getDocs,
    query,
    runTransaction,
    where,
} from "firebase/firestore";
import { firebaseDB } from "./FirebaseSetup";
import { ConnectionStatus } from "@/classes/Connection";

/**
 * Sets connection for user B, relative to user A
 *
 * @param connectionStatus
 *  PENDING, BLOCKED, or FRIEND
 * @param userAuuid
 *  User A uuid
 * @param userBuuid
 *  User B uuid
 */
export const userSetConnection = async (
    connectionStatus: ConnectionStatus,
    userAuuid: string,
    userBuuid: string
) => {
    if (doesUserExist(userAuuid) && doesUserExist(userBuuid)) {
        const pairUuid = [userAuuid, userBuuid].sort().join("_");

        const userAConnectionRef = doc(
            firebaseDB,
            "users",
            userAuuid,
            "userConnections",
            pairUuid
        );
        const userBConnectionRef = doc(
            firebaseDB,
            "users",
            userBuuid,
            "userConnections",
            pairUuid
        );

        try {
            await runTransaction(firebaseDB, async (transaction) => {
                // Add connection to userA's subcollection
                transaction.set(userAConnectionRef, {
                    userAuuid,
                    userBuuid,
                    pairUuid,
                    status: connectionStatus,
                });

                // Add connection to userB's subcollection
                transaction.set(userBConnectionRef, {
                    userAuuid,
                    userBuuid,
                    pairUuid,
                    status: connectionStatus,
                });
            });

            console.log("Connection created successfully!");
        } catch (error) {
            console.error("Error creating connection:", error.message);
        }
    }
};

/**
 * One user search for existing connection; checks
 *  existence of User B relative to User A
 *
 * @param userAuuid
 * @param userBuuid
 * @returns
 */
export const doesConnectionExist = async (
    userAuuid: string,
    userBuuid: string
) => {
    const pairUuid = [userAuuid, userBuuid].sort().join("_");

    // doc reference
    const userADocRef = doc(firebaseDB, "users", userAuuid);

    // collection reference
    const userConnectionsCollectionRef = collection(
        userADocRef,
        "userConnections"
    );

    const equalityQuery = query(
        userConnectionsCollectionRef,
        where("pairUuid", "==", pairUuid)
    );

    const querySnapshot = await getDocs(equalityQuery);

    return {
        connectionExists: !querySnapshot.empty,
        connection: querySnapshot,
    };
};

const doesUserExist = (userUuid: string) => {
    return true;
};
