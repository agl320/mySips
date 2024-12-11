import { Drink } from "@/classes/Drink";
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { v4 as uidv4 } from "uuid";
import { firebaseDB } from "./FirebaseSetup";

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

    const newDrinkObj = new Drink(newDrinkProperties);
    await setDoc(drinkDocRef, newDrinkObj.toFirestore());
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
    const userDocRef = doc(firebaseDB, "users", userUid);
    await deleteDoc(doc(userDocRef, "userDrinkData", drinkUid));
};
