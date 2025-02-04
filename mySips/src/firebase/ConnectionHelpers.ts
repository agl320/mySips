import {
    collection,
    doc,
    getDoc,
    onSnapshot,
    query,
    runTransaction,
    where,
} from "firebase/firestore";
import { firebaseDB } from "./FirebaseSetup";
import { ConnectionStatus } from "@/classes/Connection";

/**
 * Sets connection A-B for both users, such that A is initator/requester
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
    userAUid: string,
    userBUid: string
) => {
    if (doesUserExist(userAUid) && doesUserExist(userBUid)) {
        const pairUid = [userAUid, userBUid].sort().join("_");

        const userAConnectionRef = doc(
            firebaseDB,
            "users",
            userAUid,
            "userConnections",
            pairUid
        );
        const userBConnectionRef = doc(
            firebaseDB,
            "users",
            userBUid,
            "userConnections",
            pairUid
        );

        try {
            await runTransaction(firebaseDB, async (transaction) => {
                // Add connection to userA's subcollection
                transaction.set(userAConnectionRef, {
                    userAUid,
                    userBUid,
                    pairUid,
                    status: connectionStatus,
                    requesterUid: userAUid,
                });

                // Add connection to userB's subcollection
                transaction.set(userBConnectionRef, {
                    userAUid,
                    userBUid,
                    pairUid,
                    status: connectionStatus,
                    requesterUid: userAUid,
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
    callback: (connectionData: {
        connectionExists: true;
        connection: ConnectionStatus;
    }) => void
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
) => {
    const pairUid = [userAUid, userBUid].sort().join("_");

    const userAConnectionRef = doc(
        firebaseDB,
        "users",
        userAUid,
        "userConnections",
        pairUid
    );
    const userBConnectionRef = doc(
        firebaseDB,
        "users",
        userBUid,
        "userConnections",
        pairUid
    );

    try {
        await runTransaction(firebaseDB, async (transaction) => {
            // Add connection to userA's subcollection
            transaction.delete(userAConnectionRef);

            // Add connection to userB's subcollection
            transaction.delete(userBConnectionRef);
        });

        console.log("Connection created successfully!");
    } catch (error) {
        console.error("Error creating connection:", error.message);
    }
};

export const getUserData = async (userUid: string) => {
    const userDoc = doc(firebaseDB, "users", userUid);

    const userData = await getDoc(userDoc);
    return userData.data();
};
