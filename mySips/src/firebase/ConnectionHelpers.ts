import {
    collection,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
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
 * @param userAuid
 *  User A uid
 * @param userBuid
 *  User B uid
 */
export const userSetConnection = async (
    connectionStatus: ConnectionStatus,
    userAuid: string,
    userBuid: string
) => {
    if (doesUserExist(userAuid) && doesUserExist(userBuid)) {
        const pairUid = [userAuid, userBuid].sort().join("_");

        const userAConnectionRef = doc(
            firebaseDB,
            "users",
            userAuid,
            "userConnections",
            pairUid
        );
        const userBConnectionRef = doc(
            firebaseDB,
            "users",
            userBuid,
            "userConnections",
            pairUid
        );

        try {
            await runTransaction(firebaseDB, async (transaction) => {
                // Add connection to userA's subcollection
                transaction.set(userAConnectionRef, {
                    userAuid,
                    userBuid,
                    pairUid,
                    status: connectionStatus,
                });

                // Add connection to userB's subcollection
                transaction.set(userBConnectionRef, {
                    userAuid,
                    userBuid,
                    pairUid,
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
 * User search for existing connection; checks
 *  existence of User B relative to User A
 *
 * @param userAuid
 * @param userBuid
 * @returns
 */

export const doesConnectionExist = (
    userAuid: string,
    userBuid: string,
    callback
) => {
    const pairUid = [userAuid, userBuid].sort().join("_");

    // doc reference
    const userADocRef = doc(firebaseDB, "users", userAuid);

    // collection reference
    const userConnectionsCollectionRef = collection(
        userADocRef,
        "userConnections"
    );

    const equalityQuery = query(
        userConnectionsCollectionRef,
        where("pairUid", "==", pairUid)
    );

    // Set up a real-time listener
    const unsubscribe = onSnapshot(equalityQuery, (querySnapshot) => {
        if (!querySnapshot.empty) {
            const connection = querySnapshot.docs[0].data();
            callback({ connectionExists: true, connection });
        } else {
            callback({ connectionExists: false, connection: null });
        }
    });

    return unsubscribe;
};

const doesUserExist = (uid: string) => {
    return true;
};

export const userRemoveConnection = async (
    userAUid: string,
    userBUid: string
) => {};
