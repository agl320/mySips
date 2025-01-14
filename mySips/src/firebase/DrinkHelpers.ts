import { Drink } from "@/classes/Drink";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { v4 as uidv4 } from "uuid";
import { firebaseDB } from "./FirebaseSetup";
import { removeDrinkFromGroup } from "./GroupHelpers";
import { User } from "firebase/auth";

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
export const createDrink = async (userUid: string, newDrinkProperties: any) => {
    const drinkDocRef = doc(
        firebaseDB,
        "users",
        userUid,
        "userDrinkData",
        newDrinkProperties.uid
    );

    // create drink
    const newDrinkObj = new Drink(newDrinkProperties);
    await setDoc(drinkDocRef, newDrinkObj.toFirestore());

    // create group
    const groupDrinksCollectionRef = collection(drinkDocRef, "groups");
    await addDoc(groupDrinksCollectionRef, { placeholder: true });
};

export const createEmptyDrink = (): Drink => {
    const newDrinkObj = new Drink({
        name: "New Drink",
        uid: uidv4(),
        description: "",
    });

    return newDrinkObj;
};

// updates existing drink
export const updateDrink = async (
    userUid: string,
    drinkUid: string,
    updatedDrinkProperties: Drink
) => {
    console.log("SAVING");
    console.log({ userUid, drinkUid, updatedDrinkProperties });
    // Creates new Drink object then invokes toFirestore()
    //  perhaps create custom helper so we don't need to create new Drink each edit
    const newDrinkObj = new Drink(updatedDrinkProperties);

    const drinkDocRef = doc(
        firebaseDB,
        "users",
        userUid,
        "userDrinkData",
        drinkUid
    );

    await updateDoc(drinkDocRef, newDrinkObj.toFirestore());
};

export const deleteDrink = async (userUid: string, drinkUid: string) => {
    try {
        // del from user
        const userDocRef = doc(firebaseDB, "users", userUid);
        await deleteDoc(doc(userDocRef, "userDrinkData", drinkUid));

        // get all groups drink is in
        const allGroupUids = await getAllGroupUids(userUid, drinkUid);

        // del all from each group
        for (const groupItem of allGroupUids) {
            await removeDrinkFromGroup(userUid, groupItem.groupUid, drinkUid);
        }

        console.log("Drink deleted successfully!");
    } catch (error) {
        console.error("Error deleting drink:", error);
        throw error; // Optionally re-throw the error if you want to handle it elsewhere
    }
};

// Deletes drinks and sub collections
export const deleteDrinkAndSubCollections = async (
    user: User,
    userUid: string,
    drinkUid: string
) => {
    const idToken = await user.getIdToken();
    const response = await fetch(
        `http://127.0.0.1:5000/api/delete-drink?userUid=${userUid}&drinkUid=${drinkUid}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${idToken}`, // Add Bearer token here
                "Content-Type": "application/json",
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to delete drink");
    }

    // return response.json();
};

export const getDrink = async (userUid: string, drinkUid: string) => {
    const drinkDocRef = doc(
        firebaseDB,
        "users",
        userUid,
        "userDrinkData",
        drinkUid
    );
    const drinkData = await getDoc(drinkDocRef);
    return drinkData;
};

export const getAllGroupUids = async (userUid: string, drinkUid: string) => {
    const drinkDocRef = doc(
        firebaseDB,
        "users",
        userUid,
        "userDrinkData",
        drinkUid
    );
    const groupDrinksCollectionRef = collection(drinkDocRef, "groups");

    try {
        const querySnapshot = await getDocs(groupDrinksCollectionRef);

        const groupData = querySnapshot.docs.map((doc) => ({
            groupUid: doc.id,
            ...doc.data(),
        }));

        return groupData;
    } catch (error) {
        console.error("Error fetching group UIDs:", error);
        throw error;
    }
};
