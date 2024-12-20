import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
import { firebaseDB } from "./FirebaseSetup";
import { Group, IGroupParams } from "@/classes/Group";
import { v4 as uidv4 } from "uuid";
import { IDrinkParams } from "@/classes/Drink";
import { Edit } from "lucide-react";

export interface GroupDrinkItem {
    drinkUid: string;
    userUid: string;
    pairUid: string;
    groupUid: string;
}

export enum AccessType {
    VIEW = "VIEW",
    EDIT = "EDIT",
}

/**
 * Sets user access to a group.
 *
 * @param userUid
 * @param groupUid
 */

export const allowGroupAccess = async (
    userUid: string,
    groupUid: string,
    accessType?: AccessType
) => {
    const groupDocRef = doc(firebaseDB, "groups", groupUid);

    try {
        const groupDocSnapshot = await getDoc(groupDocRef);

        if (groupDocSnapshot.exists()) {
            const groupData = groupDocSnapshot.data();

            const userGroupDocRef = doc(
                firebaseDB,
                "users",
                userUid,
                "userGroups",
                groupUid
            );

            await setDoc(userGroupDocRef, {
                groupUid,
                accessType: accessType ?? AccessType.EDIT,
            });

            if (!groupData.accessUids.includes(userUid)) {
                // Add  to userUids
                await setDoc(groupDocRef, {
                    ...groupData,
                    accessUids: [...groupData.accessUids, userUid],
                });
            } else {
                console.log("User already added");
            }
        } else {
            console.error(`Group with UID ${groupUid} does not exist.`);
        }
    } catch (error) {
        console.error("Error allowing group access:", error);
        throw error;
    }
};

export const revokeGroupAccess = async (userUid: string, groupUid: string) => {
    // delete from userGroups
    // delete from groups
    // delete from drinks -> groups

    const groupDocRef = doc(firebaseDB, "groups", groupUid);
    try {
        const groupDocSnapshot = await getDoc(groupDocRef);

        if (groupDocSnapshot.exists()) {
            const groupData = groupDocSnapshot.data();
            console.log({ groupData });

            if (groupData.ownerUid === userUid) {
                console.error("Cannot revoke owner");
                throw new Error();
            }

            // delete from userGroups
            const userGroupDocRef = doc(
                firebaseDB,
                "users",
                userUid,
                "userGroups",
                groupUid
            );
            await deleteDoc(userGroupDocRef);

            // Delete userUid from groups
            await setDoc(groupDocRef, {
                ...groupData,
                accessUids: groupData.accessUids.filter(
                    (uid: string) => uid != userUid
                ),
            });
        } else {
            console.error(`Group with UID ${groupUid} does not exist.`);
        }

        // must delete drinks associated w user as well
        const groupDrinksData = await getAllGroupEntries(groupUid);

        for (const groupEntry of groupDrinksData) {
            if (!Object.hasOwn(groupEntry, "placeholder")) {
                // only remove the drinks that have the same userUid
                if (groupEntry.userUid === userUid) {
                    await removeDrinkFromGroup(
                        groupEntry.userUid,
                        groupEntry.groupUid,
                        groupEntry.drinkUid
                    );
                    await removeGroupFromDrink(
                        groupEntry.userUid,
                        groupEntry.groupUid,
                        groupEntry.drinkUid
                    );
                }
            }
        }
    } catch (error) {
        console.error("Error allowing group access:", error);
        throw error;
    }
};

/**
 * Creates new group in /groups. Does not automatically add to userGroups.
 *
 * @param newGroupProperties
 */
export const createGroup = async (newGroupProperties: IGroupParams) => {
    const groupDocRef = doc(firebaseDB, "groups", newGroupProperties.uid);

    const newGroupObj = new Group(newGroupProperties);
    await setDoc(groupDocRef, newGroupObj.toFirestore());

    const groupDrinksCollectionRef = collection(groupDocRef, "groupDrinks");

    await addDoc(groupDrinksCollectionRef, { placeholder: true });

    // set group access for owner
    await allowGroupAccess(newGroupProperties.ownerUid, newGroupProperties.uid);
};

export const createEmptyGroup = (ownerUid: string): Group => {
    const uid = uidv4();

    const newGroupObj = new Group({
        groupName: "New Group",
        uid,
        ownerUid,
    });

    return newGroupObj;
};

// updates existing group fields (not collections)
export const updateGroup = async (
    groupUid: string,
    updatedGroupProperties: any
) => {
    console.log("SAVING:");
    console.log({ updatedGroupProperties });
    // Creates new Drink object then invokes toFirestore()
    //  perhaps create custom helper so we don't need to create new Drink each edit
    const newGroupObj = updatedGroupProperties;

    const groupDocRef = doc(firebaseDB, "groups", groupUid);

    await updateDoc(groupDocRef, newGroupObj);
};

// NEED UPDATE
export const deleteGroup = async (groupUid: string) => {
    // Check uids associated with group (including onwer uid)
    // For each groupDrinks, delete user->drink->groups->pairUid
    const groupDrinksData = await getAllGroupEntries(groupUid);

    for (const groupEntry of groupDrinksData) {
        if (!Object.hasOwn(groupEntry, "placeholder")) {
            await removeGroupFromDrink(
                groupEntry.userUid,
                groupEntry.groupUid,
                groupEntry.drinkUid
            );
        }
    }

    const groupUsersUids = await getAllGroupUserUids(groupUid);

    for (const userUid of groupUsersUids) {
        // delete group doc in userGroups
        const userGroupDocRef = doc(
            firebaseDB,
            "users",
            userUid,
            "userGroups",
            groupUid
        );

        await deleteDoc(userGroupDocRef);
    }

    // delete group doc in groups
    const groupDocRef = doc(firebaseDB, "groups", groupUid);
    await deleteDoc(groupDocRef);
};

export const isDrinkInGroup = async (
    userUid: string,
    groupUid: string,
    drinkUid: string
): Promise<boolean> => {
    const pairUid = [drinkUid, groupUid].join("_");

    try {
        const groupDocRef = doc(
            firebaseDB,
            "groups",
            groupUid,
            "groupDrinks",
            pairUid
        );

        const groupDocSnapshot = await getDoc(groupDocRef);

        return groupDocSnapshot.exists();
    } catch (error) {
        console.error("Error checking if drink is in group:", error);
        return false;
    }
};

export const getAllGroupUserUids = async (groupUid: string) => {
    try {
        const groupDocRef = doc(firebaseDB, "groups", groupUid);

        const groupDocSnapshot = await getDoc(groupDocRef);

        if (groupDocSnapshot.exists()) {
            const groupData = groupDocSnapshot.data() as Group;
            return groupData.accessUids;
        } else {
            console.error("No group data found");
            return [];
        }
    } catch (error) {
        console.error("Error checking if drink is in group:", error);
        return [];
    }
};

export const getAllGroupEntries = async (groupUid: string) => {
    const groupDocRef = doc(firebaseDB, "groups", groupUid);

    const groupDrinksCollectionRef = collection(groupDocRef, "groupDrinks");

    try {
        const querySnapshot = await getDocs(groupDrinksCollectionRef);

        const groupDrinksData = querySnapshot.docs.map((doc) => doc.data());

        return groupDrinksData;
    } catch (error) {
        console.error("Error fetching group UIDs:", error);
        throw error;
    }
};

export const addDrinkToGroup = async (
    userUid: string,
    groupUid: string,
    drinkUid: string
) => {
    const pairUid = [drinkUid, groupUid].join("_");

    const groupDrinksRef = doc(
        firebaseDB,
        "groups",
        groupUid,
        "groupDrinks",
        pairUid
    );
    const drinkGroupRef = doc(
        firebaseDB,
        "users",
        userUid,
        "userDrinkData",
        drinkUid,
        "groups",
        pairUid
    );

    // Drink to group
    const groupEntry = {
        drinkUid,
        userUid,
        pairUid,
        groupUid,
    };
    await setDoc(groupDrinksRef, groupEntry);
    await setDoc(drinkGroupRef, groupEntry);
};

export const removeDrinkFromGroup = async (
    userUid: string,
    groupUid: string,
    drinkUid: string
) => {
    const pairUid = [drinkUid, groupUid].join("_");

    // References
    const groupDrinkRef = doc(
        firebaseDB,
        "groups",
        groupUid,
        "groupDrinks",
        pairUid
    );

    await deleteDoc(groupDrinkRef);
    // await deleteDoc(drinkGroupRef);
};

export const removeGroupFromDrink = async (
    userUid: string,
    groupUid: string,
    drinkUid: string
) => {
    const pairUid = [drinkUid, groupUid].join("_");

    const drinkGroupRef = doc(
        firebaseDB,
        "users",
        userUid,
        "userDrinkData",
        drinkUid,
        "groups",
        pairUid
    );

    await deleteDoc(drinkGroupRef);
};

export const removeGroupDrinkPair = async (
    userUid: string,
    groupUid: string,
    drinkUid: string
) => {
    await removeDrinkFromGroup(userUid, groupUid, drinkUid);
    await removeGroupFromDrink(userUid, groupUid, drinkUid);
};

// get all group docs associated with userGroup
export const getAllGroupDocData = async (
    userGroups: Record<string, { accessType: AccessType; groupUid: string }>
): Promise<Record<string, any>[]> => {
    try {
        // Fetch all group documents
        const groupDocDataPromises = Object.values(userGroups).map(
            async (group) => {
                const groupDocRef = doc(firebaseDB, "groups", group.groupUid);
                const groupDocSnapshot = await getDoc(groupDocRef);

                if (groupDocSnapshot.exists()) {
                    return {
                        groupUid: group.groupUid,
                        ...groupDocSnapshot.data(),
                    };
                } else {
                    console.warn(
                        `Group with UID ${group.groupUid} does not exist.`
                    );
                    return null; // Return null for non-existing groups
                }
            }
        );

        // Wait for all promises to resolve
        const groupDocData = await Promise.all(groupDocDataPromises);

        // Filter out any null values for non-existing groups
        return groupDocData.filter((data) => data !== null);
    } catch (error) {
        console.error("Error fetching group docs:", error);
        throw error;
    }
};

export const isUserInGroup = async (userUid: string, groupUid: string) => {
    console.log(`Checking if ${userUid} is in group ${groupUid}`);
    try {
        const groupDocRef = doc(firebaseDB, "groups", groupUid);

        const groupDocSnapshot = await getDoc(groupDocRef);

        if (groupDocSnapshot.exists()) {
            const groupData = groupDocSnapshot.data();
            return groupData.accessUids.includes(userUid);
        } else {
            console.error("Does not exist.");
        }
    } catch (error) {
        console.error("Error checking if drink is in group:", error);
    }
};
